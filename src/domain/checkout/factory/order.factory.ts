import crypto from "crypto";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

interface OrderFactoryProps {
  customerId: string;
  items: {
    id: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}

export class OrderFactory {
  static create(props: OrderFactoryProps): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );

    const order = new Order(crypto.randomUUID(), props.customerId, items);

    return order;
  }
}
