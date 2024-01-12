import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { Product } from "../../../domain/product/entity/product";

describe("Update Product UseCase Integration", () => {
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

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const productToCreate = ProductFactory.create("a", "Product 1", 10) as Product;
    await productRepository.create(productToCreate);

    const input = {
      id: productToCreate.id,
      name: "Product 1 Updated",
      price: 20,
    };
    const output = {
      id: input.id,
      name: input.name,
      price: input.price,
    };

    expect(await updateProductUseCase.execute(input)).toEqual(output);
  });
});