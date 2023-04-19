import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {
  IUserCreateRequest,
  IUserResponse,
  IUserAddressResponse,
} from '../modules/users/dto/create-user.dto';

export const userCreateRequestSerializer: SchemaOf<IUserCreateRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().required(),
    password: yup.string().required(),
    birth: yup.date().required(),
    phone: yup.string().required(),
    description: yup.string().required(),
    image_url: yup.string().required(),
    is_announcer: yup.boolean().required(),
    address: yup.object().shape({
      street: yup.string().required(),
      number: yup.string().required(),
      complement: yup.string().required(),
      cep: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
    }),
  });

export const userAddressResponseSerializer: SchemaOf<IUserAddressResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().required(),
    birth: yup.date().required(),
    phone: yup.string().required(),
    description: yup.string(),
    image_url: yup.string().required(),
    is_announcer: yup.boolean().required(),
    address: yup.object().shape({
      id: yup.string().required(),
      street: yup.string().required(),
      number: yup.string().required(),
      complement: yup.string().required(),
      cep: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
    }),
  });

export const listUsersResponseSerializer: SchemaOf<IUserAddressResponse[]> =
  yup.array(userAddressResponseSerializer);

export const userResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().required(),
    password: yup.string().required(),
    birth: yup.date().required(),
    phone: yup.string().required(),
    description: yup.string(),
    image_url: yup.string().required(),
    is_announcer: yup.boolean().required(),
  });
