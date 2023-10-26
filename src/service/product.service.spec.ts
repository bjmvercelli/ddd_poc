import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product Service", () => {
  it ("Should change the price of all products", () => {

    const product1 = new Product("123", "Item 1", 9.99);
    const product2 = new Product("456", "Item 2", 19.99);
    const product3 = new Product("789", "Item 3", 29.99);

    const products = [product1, product2, product3];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toEqual(19.98);
    expect(product2.price).toEqual(39.98);
  });
});