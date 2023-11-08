import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../../../../domain/product/entity/product";
import { ProductRepository } from "./product.repository";

describe("Product Repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(updatedProductModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 20,
    });
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();

    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    const foundProduct = await productRepository.find("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("Should throw an error when product not found", async () => {
    const productRepository = new ProductRepository();

    await expect(productRepository.find("1")).rejects.toThrow(
      "Product not found"
    );
  });

  it("Should find all products", async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    
    const createdProducts = [product1, product2];

    expect(foundProducts).toStrictEqual(createdProducts);
  });
});
