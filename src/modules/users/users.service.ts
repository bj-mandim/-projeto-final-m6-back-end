// import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { prisma } from '../../../prisma';
import {
  IUserAddressResponse,
  IUserCreateRequest,
  IUserUpdateRequest,
} from './dto/create-user.dto';
import {
  listUsersResponseSerializer,
  userAddressResponseSerializer,
} from 'src/serializer/userSerializer';

export const createUserService = async ({
  name,
  email,
  password,
  birth,
  cpf,
  image_url,
  is_announcer,
  phone,
  description,
  address,
}: IUserCreateRequest): Promise<IUserAddressResponse> => {
  const hashPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      birth,
      cpf,
      image_url,
      is_announcer,
      phone,
      description,
    },
  });

  const newAddress = await prisma.address.create({
    data: {
      city: address.city,
      number: address.number,
      state: address.state,
      street: address.state,
      cep: address.cep,
      complement: address.complement,
      user_id: newUser.id,
    },
  });

  const result = {
    ...newUser,
    address: newAddress,
  };

  const validatedData = userAddressResponseSerializer.validate(result, {
    stripUnknown: true,
  });

  return validatedData;
};

export const listUserService = async (): Promise<IUserAddressResponse[]> => {
  const getUser = await prisma.user.findMany({
    include: {
      cars: true,
      comments: true,
      address: true,
    },
  });

  const validatedData = await listUsersResponseSerializer.validate(getUser, {
    stripUnknown: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return validatedData!;
};

export const updateUserService = async (
  userId: string,
  data: IUserUpdateRequest,
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
