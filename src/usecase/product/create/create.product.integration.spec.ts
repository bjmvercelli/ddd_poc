import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";

describe("Create Product UseCase Integration", () => {
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
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 10,
    };

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    expect(await createProductUseCase.execute(input)).toEqual(output);
  });
});