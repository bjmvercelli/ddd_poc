import { Order } from "./order";
import OrderItem from "./order_item";

describe('Order', () => {

  it('Should throw error when id is not provided', () => {
    expect(() => new Order('', 'customer-id', []))
      .toThrowError('Id is required');
  });

  it('Should throw error when customeId is not provided', () => {
    expect(() => new Order('order-id', '', []))
      .toThrowError('CustomerId is required');
  });

  it('Should throw error when items is not provided', () => {
    expect(() => new Order('order-id', 'customer-id', []))
      .toThrowError('Items are required');
  });

  it('Should calculate total', () => {
    const item = new OrderItem('1', 'item-1', 10);
    const item2 = new OrderItem('2', 'item-2', 100);

    const order = new Order('order-id', 'customer-id', [item]);

    expect(order.total()).toBe(10);

    const order2 = new Order('order-id', 'customer-id', [item, item2]);

    expect(order2.total()).toBe(110);
  });
});