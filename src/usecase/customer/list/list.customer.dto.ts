export interface InputListCustomerDTO {}

type TCustomer = {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
};

export interface OutputListCustomerDTO {
  customers: TCustomer[];
}
