export interface InputCreateCustomerDTO {
  name: string;
  address: { // não utilizar o value-object, o dto não precisa conhecer o domínio
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

export interface OutputCreateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}