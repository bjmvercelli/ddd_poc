import { toXML } from "jstoxml";
import { OutputListCustomerDTO } from "../../../usecase/customer/list/list.customer.dto";

export class CustomerPresenter {
  static formatToXML(data: OutputListCustomerDTO): string {
    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              city: customer.address.city,
              number: customer.address.number,
              zip: customer.address.zip,
            },
          })),
        },
      },
      { header: true, indent: "  " }
    );
  }
}
