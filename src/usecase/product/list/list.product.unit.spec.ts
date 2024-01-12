import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ListProductUseCase } from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 10);
const product2 = ProductFactory.create("b", "Product 2", 20);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    find: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
  }
}

describe("List Product UseCase Unit", () => {
  it("Should list all products", async () => {
    const mockRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(mockRepository);

    const output = await listProductUseCase.execute({});

    expect(output).toStrictEqual({
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