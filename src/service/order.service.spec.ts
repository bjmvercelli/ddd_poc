import { Order } from "../entity/order";
import OrderItem from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order Service", () => {
  it("Should calculate the total price of all orders", () => {
    const item1 = new OrderItem("123", "Item 1", 9.99, "123", 1);
    const item2 = new OrderItem("456", "Item 2", 19.99, "456", 2);

    const order1 = new Order("123", "123", [item1]);
    const order2 = new Order("456", "456", [item1, item2]);
  
    const total = OrderService.calculateTotalPrice([order1, order2]);

    expect(total).toEqual(59.96);
  });
});
