import { Request, Response } from 'express';
import { AppError } from 'src/errors/appErro';
import { createUserService } from './users.service';
import { listUserService } from './users.service';
import { updateUserService } from './users.service';
import { deleteUserService } from './users.service';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    const newUser = await createUserService(data);
    return res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export const listUserController = async (req: Request, res: Response) => {
  try {
    const user = await listUserService();
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await updateUserService(id, data);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteUserService(id);
    return res.status(204).json({ message: 'User deleted ^-^' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};
