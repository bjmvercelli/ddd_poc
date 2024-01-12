import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address("Rua 1", 123, "12345678", "São Paulo");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Find Customer UseCase Unity", () => {

  it("Should find a customer", async () => {
    const customerRepository = MockRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    
    const input = {
      id: "123"
    }

    const output = await findCustomerUseCase.execute(input);

    expect(output).toStrictEqual({
      id: "123",
      name: "Customer 1",
      address: {
        street: "Rua 1",
        number: 123,
        zip: "12345678",
        city: "São Paulo"
      }
    });
  });

  it("Should throw an error when customer not found", async () => {
    const customerRepository = MockRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    
    const input = {
      id: "123"
    }

    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    await expect(findCustomerUseCase.execute(input)).rejects.toThrow("Customer not found");
  });
});