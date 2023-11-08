import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order Service", () => {
  it("Should throw error when items are not provided", () => {
    expect(() => {
      OrderService.placeOrder(new Customer("123", "John Doe"), []);
    }).toThrowError("Items are required");
  });

  it("Should place an order", () => {
    const customer = new Customer("123", "John Doe");
    const item = new OrderItem("123", "Item 1", 9.99, "123", 1);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(4.995); // 9.99 / 2
    expect(order.total()).toBe(9.99);
  });

  it("Should calculate the total price of all orders", () => {
    const item1 = new OrderItem("123", "Item 1", 9.99, "123", 1);
    const item2 = new OrderItem("456", "Item 2", 19.99, "456", 2);

    const order1 = new Order("123", "123", [item1]);
    const order2 = new Order("456", "456", [item1, item2]);

    const total = OrderService.calculateTotalPrice([order1, order2]);

    expect(total).toEqual(59.96);
  });
});
