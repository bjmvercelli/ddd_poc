import express from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import { ListCustomerUseCase } from "../../../usecase/customer/list/list.customer.usecase";
import { CustomerPresenter } from "../presenters/customer.presenter";

const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  const createCustomerUseCase = new CreateCustomerUseCase(
    new CustomerRepository()
  );

  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    };

    const customer = await createCustomerUseCase.execute(customerDTO);

    return res.status(201).json(customer);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

customerRoute.get("/", async (req, res) => {
  const listCustomerUseCase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const customers = await listCustomerUseCase.execute({});
    return res.format({
      json: () => res.status(200).json(customers),
      xml: () => res.status(200).send(CustomerPresenter.formatToXML(customers)),
    });
   
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

export { customerRoute };
