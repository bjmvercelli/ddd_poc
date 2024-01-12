import { CreateCustomerUseCase } from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "Rua 1",
    number: 123,
    city: "São Paulo",
    zip: "12345678",
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  }
}

describe("Create Customer UseCase Unit", () => {
  it("Should create a customer", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      }
    }

    expect(await createCustomer.execute(input)).toEqual(output);
  });

  it("Should throw an error when name is empty", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const input = {
      name: "",
      address: {
        street: "Rua 1",
        number: 123,
        city: "São Paulo",
        zip: "12345678",
      }
    }

    await expect(createCustomer.execute(input)).rejects.toThrow("Name is required");
  });

  it("Should throw an error when street is empty", async () => {
    const repository = MockRepository();
    const createCustomer = new CreateCustomerUseCase(repository);

    const input = {
      name: "John",
      address: {
        street: "",
        number: 123,
        city: "São Paulo",
        zip: "12345678",
      }
    }

    await expect(createCustomer.execute(input)).rejects.toThrow("Street is required");
  });
});