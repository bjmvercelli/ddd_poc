import * as yup from "yup";
import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          { abortEarly: false }
        );
    } catch (error) {
      const e = error as yup.ValidationError;
      console.log(e)
      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "customer",
        });
      });
    }
  }
}
