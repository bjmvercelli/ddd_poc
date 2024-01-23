import * as yup from "yup";
import { Product } from "../entity/product";

export class ProductYupValidator {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().required("Price is required").min(0, "Price must be greater than zero")
      });

      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
          price: entity.price,
        },
        { abortEarly: false }
      );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "product",
        });
      });
    }
  }
}
