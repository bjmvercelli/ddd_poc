import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { CreateCustomerUseCase } from "./create.customer.usecase";

describe("Create Customer UseCase Integration", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const input = {
      name: "John",
      address: {
        street: "Rua 1",
        number: 123,
        city: "São Paulo",
        zip: "12345678",
      },
    };

    const response = await createCustomerUseCase.execute(input);

    expect(response).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
      },
    });
  });
});
