import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model";
import { OrderModel } from "./order.model";
import { OrderItemModel } from "./order-item.model";
import { ProductModel } from "../../../product/repository/sequelize/product.model";
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { ProductRepository } from "../../../product/repository/sequelize/product.repository";
import { Product } from "../../../../domain/product/entity/product";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderRepository } from "./order.repository";

const customLogger = (queryString: any, queryObject: any) => {
  console.log(queryString);
  console.log(queryObject);
};

describe("Order Repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      5
    );

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          order_id: order.id,
          product_id: orderItem.productId,
          quantity: 5,
        },
      ],
    });
  });

  it("Should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      5
    );

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          order_id: order.id,
          product_id: orderItem.productId,
          quantity: 5,
        },
      ],
    });

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      10
    );

    order.changeItems([orderItem2]);
    await orderRepository.update(order);

    const updatedOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(updatedOrderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          order_id: order.id,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity,
        },
      ],
    });
  });

  it("Should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      5
    );

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("Should throw an error when order not found", async () => {
    const orderRepository = new OrderRepository();

    await expect(orderRepository.find("ZZZ")).rejects.toThrow(
      "Order not found"
    );
  });

  it("Should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Rua 1", 123, "12345678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 10);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      5
    );
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      5
    );

    const order = new Order("1", customer.id, [orderItem]);
    const order2 = new Order("2", customer.id, [orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual([order, order2]);
  });
});
