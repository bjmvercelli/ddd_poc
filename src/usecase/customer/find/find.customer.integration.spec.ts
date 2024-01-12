import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Find Customer UseCase Integration", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    
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
});