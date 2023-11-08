import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";

describe("Customer Repository", () => {
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

    const customer = new Customer("1", "Customer 1");
    const customerAddress = new Address("Rua 1", 123, "12345678", "São Paulo");

    customer.changeAddress(customerAddress);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customerAddress.street,
      number: customerAddress.number,
      zipcode: customerAddress.zip,
      city: customerAddress.city,
    });
  });

  it("Should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const customerAddress = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(customerAddress);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: "1" },
    });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customerAddress.street,
      number: customerAddress.number,
      zipcode: customerAddress.zip,
      city: customerAddress.city,
    });
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const customerAddress = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(customerAddress);
    await customerRepository.create(customer);

    const customerFound = await customerRepository.find("1");

    expect(customerFound).toStrictEqual(customer);
  });

  it("Should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find("ZZZ")).rejects.toThrow(
      "Customer not found"
    );
  });

  it("Should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    const customerAddress1 = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer1.changeAddress(customerAddress1);
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Customer 2");
    const customerAddress2 = new Address("Rua 2", 456, "87654321", "São Paulo");
    customer2.changeAddress(customerAddress2);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
