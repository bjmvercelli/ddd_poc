export interface InputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}

// mudam por razões diferentes, logo devemos mantê-los separados.

export interface OutputUpdateCustomerDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    zip: string;
  }
}