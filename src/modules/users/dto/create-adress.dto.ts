export interface IAddressCreateRequest {
  city: string;
  state: string;
  street: string;
  number: number;
  complement?: string;
  cep: string;
}
