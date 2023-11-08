import { Product } from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import { ProductModel } from "./product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });

    return;
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    return;
  }

  async find(id: string): Promise<Product> {
    let productModel;
    try {
      productModel = await ProductModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (err) {
      throw new Error("Product not found");
    }

    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map((product) => {
      return new Product(product.id, product.name, product.price);
    });
  }
}
