import { ProductModel } from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("Product E2E tests", () => {
  beforeAll(() => {
    sequelize.addModels([ProductModel]);
  });

  beforeEach(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body).toHaveProperty("id");
  });

  it("should not create a product with invalid data", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });

    await request(app).post("/product").send({
      name: "Product 2",
      price: 200,
    });

    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
  });
});
