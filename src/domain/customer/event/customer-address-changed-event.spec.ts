import { EventDispatcher } from "../../@shared/event/event-dispatcher";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { EnviaConsoleLogHandler } from "./handler/log-on-customer-address-changed.handler";

describe("Customer address changed", () => {
  it("Should notify event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    const event = new CustomerAddressChangedEvent({
      id: "1",
      name: "Customer 1",
      newAddress: "New Address",
    });

    eventDispatcher.notify(event);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
