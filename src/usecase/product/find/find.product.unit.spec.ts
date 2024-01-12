import { Product } from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("123", "Product 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(product),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Find Product UseCase Unit", () => {
  it("Should find a product", async () => {
    const productRepository = MockRepository();
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
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    await expect(findProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});
