import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer Factory", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create('John Doe');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.constructor.name).toBe('Customer');
    expect(customer.Address).toBeUndefined();
  });

  it("Should create a customer with address", () => {
    const address = new Address('Rua 1', 123, '12345678', 'São Paulo');

    const customer = CustomerFactory.createWithAddress('John Doe', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.constructor.name).toBe('Customer');
    expect(customer.Address).toBe(address)
  });
});