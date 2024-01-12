import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street 1", 1, "12345", "City 1")
);

const customer2 = CustomerFactory.createWithAddress(
  "Bob Doe",
  new Address("Street 2", 2, "1234567890", "City 2")
);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    find: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  }
}

describe("List Customers UseCase Unit", () => {
  it("Should list all customers", async () => {
    const customerRepository = MockRepository();
    const listCustomersUseCase = new ListCustomerUseCase(customerRepository);

    const output = await listCustomersUseCase.execute({});

    expect(output).toStrictEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.Address.street,
            number: customer1.Address.number,
            zip: customer1.Address.zip,
            city: customer1.Address.city,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.Address.street,
            number: customer2.Address.number,
            zip: customer2.Address.zip,
            city: customer2.Address.city,
          },
        },
      ],
    });
  });
});
