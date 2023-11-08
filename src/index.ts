import { Address } from "./domain/customer/value-object/address";
import { Customer } from "./domain/customer/entity/customer";
import { Order } from "./domain/checkout/entity/order";
import { OrderItem } from "./domain/checkout/entity/order_item";

const customer = new Customer("123", "John Doe");
const address = new Address("123 Main St", 123, "12345", "Rio de Janeiro");
customer.changeAddress(address);

const item1 = new OrderItem("123", "Item 1", 9.99, "123", 1);
const item2 = new OrderItem("456", "Item 2", 19.99, "456", 2);

const order = new Order("123", "123", [item1, item2]);
