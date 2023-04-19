import { IAddressCreateRequest } from './create-adress.dto';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserCreateRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  description: string;
  birth: Date;
  image_url: string;
  is_announcer: boolean;
  address: IAddressCreateRequest;
}

export interface IUserUpdateRequest {
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  phone?: string;
  description?: string;
  birth?: Date;
  image_url?: string;
  is_announcer?: boolean;
}

export interface IUserAddressResponse {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  description: string;
  birth: Date;
  image_url: string;
  is_announcer: boolean;
  address: IAddressCreateRequest;
}

export interface IUserResponse {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  description: string;
  birth: Date;
  image_url: string;
  is_announcer: boolean;
}
