export interface UserData {
  username: string;
  email: string;
  password: string;
  token: string;
  is_announcer: boolean;
  description: string;
  phone: string;
  cpf: string;
  birth: string;
}

export interface UserRegister {
  user: UserData;
}
