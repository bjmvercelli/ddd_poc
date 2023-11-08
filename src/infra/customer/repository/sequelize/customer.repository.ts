import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import { CustomerModel } from "./customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
    return;
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      }
    );
    return;
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (err) {
      throw new Error("Customer not found");
    }

    // O resultado deve respeitar o estado do cliente que foi criado para ser persistido!!!
    const customer = new Customer(id, customerModel.name);
    const customerAddress = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );

    customer.changeAddress(customerAddress);
    if (customerModel.active) {
      customer.activate();
    }
    customer.addRewardPoints(customerModel.rewardPoints);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((customer) => {
      const customerAddress = new Address(
        customer.street,
        customer.number,
        customer.zipcode,
        customer.city
      );
      const customerEntity = new Customer(customer.id, customer.name);
      // O resultado deve respeitar o estado do cliente que foi criado para ser persistido!!!
      customerEntity.changeAddress(customerAddress);
      if (customer.active) {
        customerEntity.activate();
      }
      customerEntity.addRewardPoints(customer.rewardPoints);
      return customerEntity;
    });
  }
}
