import { Order } from "../../../../domain/checkout/entity/order";
import { OrderItem } from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    try {
      // Workaround to update order items
      const sequelize = OrderModel.sequelize;
      await sequelize!.transaction(async (transaction) => {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction,
        });
        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        }));
        await OrderItemModel.bulkCreate(items, { transaction });
        await OrderModel.update(
          {
            total: entity.total(),
          },
          { where: { id: entity.id }, transaction }
        );
      });
    } catch (err) {
      console.log(err)
    }
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );

    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: ["items"],
    });

    return orders.map((order) => {
      const orderItems = order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );

      return new Order(order.id, order.customer_id, orderItems);
    });
  }
}
