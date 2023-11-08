import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import { ProductInterface } from "../entity/product.interface";

import crypto from "crypto";

export class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(crypto.randomUUID(), name, price);
      case "b":
        return new ProductB(crypto.randomUUID(), name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}
