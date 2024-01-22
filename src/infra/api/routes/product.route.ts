import express from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";

const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
  const createProductUseCase = new CreateProductUseCase(
    new ProductRepository()
  );

  try {
    const productDTO = {
      name: req.body.name,
      price: req.body.price,
    };

    const product = await createProductUseCase.execute(productDTO);

    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

productRoute.get("/", async (req, res) => {
  const listProductUseCase = new ListProductUseCase(new ProductRepository());

  try {
    const products = await listProductUseCase.execute({});

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export { productRoute };
