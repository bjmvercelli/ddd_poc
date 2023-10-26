import { Order } from "../entity/order";

export class OrderService {
  public static calculateTotalPrice(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }
}
