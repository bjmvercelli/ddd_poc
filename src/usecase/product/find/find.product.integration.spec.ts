import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { Product } from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";

describe("Find Product UseCase Integration", () => {
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

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = await findProductUseCase.execute(input);

    expect(output).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 10,
    });
  });

  it("Should throw an error when product not found", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});