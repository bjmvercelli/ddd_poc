import express from "express";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { customerRoute } from "./routes/customer.route";

const app = express();
app.use(express.json());
app.use("/customer", customerRoute);

let sequelize: Sequelize;

(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });
  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
})();

export { app, sequelize };
