import { Sequelize } from "sequelize-typescript";

describe("Product Repository", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      sync: { force: true },
    });
  });

  afterEach(async () => {
    await sequelize.close();
  });

});