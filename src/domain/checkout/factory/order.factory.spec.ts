import { OrderFactory } from "./order.factory";

describe("Order Factory", () => {
  it("Should create an order", () => {
    const orderProps = {
      customerId: "123",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
          productId: "222",
          quantity: 2,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items[0].id).toBe(orderProps.items[0].id);
  });
});
