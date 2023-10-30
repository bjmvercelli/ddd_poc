import { Product } from "../entity/product";

export class ProductService {
  public static increasePrice(products: Product[], percentage: number): void {
    products.forEach(product => {
      const newPrice = product.price * (1 + percentage / 100);
      product.changePrice(newPrice);
      return product;
    });
  }
}