import { ProductFactory } from "./product.factory";

describe("Product Factory", () => {
  it("Should create a product of type A", () => {
    const product = ProductFactory.create("a", "Product A", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product")
  });

  it("Should create a product of type B", () => {
    const product = ProductFactory.create("b", "Product B", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(20);
    expect(product.constructor.name).toBe("ProductB")
  });

  it("Should throw an error when an invalid type is provided", () => {
    expect(() => {
      ProductFactory.create("c", "Product C", 10);
    }).toThrow("Invalid product type");
  });
});