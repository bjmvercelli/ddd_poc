import { Product } from "./product";

describe('Product test', () => {

  it('Should throw error when id is not provided', () => {
    expect(() => new Product('', 'product-name', 10))
      .toThrow('product: Id is required');
  });

  it('Should throw error when name is not provided', () => {
    expect(() => new Product('product-id', '', 10))
      .toThrow('product: Name is required');
  });

  it('Should throw error when id and name are not provided', () => {
    expect(() => new Product('', '', 100))
      .toThrow('product: Id is required, product: Name is required');
  });

  it('Should throw error when price is less than zero', () => {
    expect(() => new Product('product-id', 'product-name', -1))
      .toThrow('product: Price must be greater than zero');
  });

  it('Should be able to change name', () => {
    const product = new Product('product-id', 'product-name', 10);
    product.changeName('new-product-name');
    expect(product.name).toBe('new-product-name');
  });

  it('Should be able to change price', () => {
    const product = new Product('product-id', 'product-name', 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});