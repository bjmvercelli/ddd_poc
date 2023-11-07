import EventHandlerInterface from "../../@shared/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export class EnviaConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, newAddress } = event.eventData;

    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${newAddress}`)
  }
}
