import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer", () => {
  it("Should throw an error when id is empty", () => {
    expect(() => {
      new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("Should throw an error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("Should change name", () => {
    // Triple A

    // Arrange
    const customer = new Customer("123", "John Doe");

    // Act
    customer.changeName("Jane Doe");

    // Assert
    expect(customer.name).toBe("Jane Doe");
  });

  it("Should throw an error when new name is empty", () => {
    const customer = new Customer("123", "John Doe");
    expect(() => {
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("Should activate customer", () => {
    const customer = new Customer("123", "John Doe");
    const address = new Address("Rua 1", 123, "12345678", "São Paulo",);

    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("Should deactivate customer", () => {
    const customer = new Customer("123", "John Doe");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("Should throw an error when activate customer without address", () => {
    const customer = new Customer("123", "John Doe");

    expect(() => {
      customer.activate();
    }).toThrowError("Address is required");
  });

  it("Should add reward points", () => {
    const customer = new Customer("123", "John Doe");

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});
