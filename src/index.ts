import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import OrderItem from "./entity/order_item";

const customer = new Customer("123", "John Doe");
const address = new Address("123 Main St", "Anytown", "NY", "12345");
customer.Address = address;


const item1 = new OrderItem("123", "Item 1", 9.99);
const item2 = new OrderItem("456", "Item 2", 19.99);

const order = new Order("123", "123", [item1, item2]);