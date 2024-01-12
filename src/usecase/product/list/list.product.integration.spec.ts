import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../../infra/product/repository/sequelize/product.model";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductRepository } from "../../../infra/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";
import { Product } from "../../../domain/product/entity/product";

describe("List Product UseCase Integration", () => {
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

  it("Should list all products", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const product1 = ProductFactory.create("a", "Product 1", 10) as Product;
    const product2 = ProductFactory.create("b", "Product 2", 20) as Product;
    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ]);

    const products = await listProductUseCase.execute({});

    expect(products).toEqual({
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    });
  });
});
