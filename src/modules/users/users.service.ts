// import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import createUserSerializer from 'src/serializer/userSerializer';
import { hash } from 'bcryptjs';
import { AppError } from 'src/errors/appErro';

const prisma = new PrismaClient();

export const createUserService = async (data: CreateUserDto) => {
  const serializerUser = await createUserSerializer.validate(data, {
    stripUnknown: true,
    abortEarly: false,
  });

  const {
    name,
    email,
    cpf,
    phone,
    description,
    is_announcer,
    password,
    birth,
  } = serializerUser;

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const cpfAlreadyExists = await prisma.user.findUnique({
    where: {
      cpf,
    },
  });

  if (userAlreadyExists) {
    throw new AppError('User already exists!', 403);
  }
  if (cpfAlreadyExists) {
    throw new AppError('Cpf already exists!', 403);
  }

  const hashedPassword = await hash(password, 10);

  const createData = await prisma.user.create({
    data: {
      name,
      email,
      cpf,
      phone,
      description,
      is_announcer,
      password: hashedPassword,
      birth,
    },
    include: {
      cars: true,
    },
  });
  await createUserSerializer.validate(createData, {
    stripUnknown: true,
  });

  const userWithoutPassword = exclude(createData, ['password']);

  return userWithoutPassword;
};

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

export const listUserService = async () => {
  const getUser = await prisma.user.findMany({
    include: {
      cars: true,
      comments: true,
    },
  });

  return getUser;
};

export const updateUserService = async (
  userId: string,
  data: UpdateUserDto,
) => {
  const updateUser = await prisma.user.update({
    where: { id: userId },
    data: data,
  });
  return updateUser;
};

export const deleteUserService = (userId: string) => {
  const deleteUser = prisma.user.delete({
    where: { id: userId },
  });

  return deleteUser;
};
