import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../infra/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infra/customer/repository/sequelize/customer.repository";
import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/value-object/address";

describe("List Customers UseCase Integration", () => {
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

  it("Should list all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("Street 1", 1, "12345", "City 1")
    );
    const customer2 = CustomerFactory.createWithAddress(
      "Bob Doe",
      new Address("Street 2", 2, "1234567890", "City 2")
    );
    await Promise.all([
      customerRepository.create(customer1),
      customerRepository.create(customer2),
    ]);
    const customers = await customerRepository.findAll();
    expect(customers).toStrictEqual([customer1, customer2]);
  });
});