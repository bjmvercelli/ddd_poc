import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Rua 1", 123, "12345678", "São Paulo")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Rua 1 Updated",
    number: 1234,
    city: "São Paulo Updated",
    zip: "123456789",
  }
}

describe("Update Customer UseCase Unit", () => {
  it("Should update a customer", async () => {
    const repository = MockRepository();
    const updateCustomer = new UpdateCustomerUseCase(repository);
    const output = {
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      }
    }

    expect(await updateCustomer.execute(input)).toEqual(output);
  });

});
