import { EventDispatcher } from "../../@shared/event/event-dispatcher";
import { CustomerCreatedEvent } from "./customer-created.event";
import { EnviaConsoleLog1Handler } from "./handler/log-on-customer-created-1.handler";
import { EnviaConsoleLog2Handler } from "./handler/log-on-customer-created-2.handler";

describe("Customer created", () => {
  it("Should notify event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const firstEventHandler = new EnviaConsoleLog1Handler();
    const secondEventHandler = new EnviaConsoleLog2Handler();
    const spyFirstEventHandler = jest.spyOn(firstEventHandler, "handle");
    const spySecondEventHandler = jest.spyOn(secondEventHandler, "handle");
    eventDispatcher.register("CustomerCreatedEvent", firstEventHandler);
    eventDispatcher.register("CustomerCreatedEvent", secondEventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(firstEventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(secondEventHandler);

    const event = new CustomerCreatedEvent({
      name: "Customer 1",
      email: "customer@gmail.com",
    });

    eventDispatcher.notify(event);

    expect(spyFirstEventHandler).toHaveBeenCalledTimes(1);
    expect(spySecondEventHandler).toHaveBeenCalledTimes(1);
  });
});