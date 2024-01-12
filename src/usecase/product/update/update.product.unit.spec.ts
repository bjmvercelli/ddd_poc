import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10);

const MockRepository = () => {
  return {
    update: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
  };
};

describe("Update Product UseCase Unit", () => {
  it("Should update a product", async () => {
    const repository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(repository);

    const input = {
      id: product.id,
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

  it("Should throw an error if name is empty", async () => {
    const repository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(repository);

    const input = {
      id: product.id,
      name: "",
      price: 20,
    };

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
});
