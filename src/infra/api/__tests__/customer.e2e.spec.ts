import { app, sequelize } from "../express";
import request from "supertest";

describe("Customer E2E tests", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Rua 12",
          number: 123,
          zip: "12345678",
          city: "São Paulo",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body).toHaveProperty("id");
  });

  it("should not create a customer with invalid data", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Rua 1",
          number: 123,
          zip: "12345678",
          city: "São Paulo",
        },
      });

    const response = await request(app).get("/customer");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(1);
  });

  it("should list all customers in XML format", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Rua 1",
          number: 123,
          zip: "12345678",
          city: "São Paulo",
        },
      });

    const response = await request(app).get("/customer").set("Accept", "application/xml");

    expect(response.status).toBe(200);
    expect(response.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
    expect(response.text).toContain("<id>");
    expect(response.text).toContain("<name>");
    expect(response.text).toContain("<street>");
    expect(response.text).toContain("<number>");
    expect(response.text).toContain("<zip>");
    expect(response.text).toContain("<city>");  
  });
});
