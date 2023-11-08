import crypto from "crypto";

import { Customer } from "../../customer/entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

export class OrderService {
  public static calculateTotalPrice(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error("Items are required");

    const order = new Order(crypto.randomUUID(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
