import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 10,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
}

describe("Create Product UseCase Unit", () => {
  it("Should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    }

    expect(await createProductUseCase.execute(input)).toEqual(output);
  });

  it("Should throw an error when name is empty", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      name: "",
      price: 10,
    }

    await expect(createProductUseCase.execute(input)).rejects.toThrow("Name is required");
  });
});