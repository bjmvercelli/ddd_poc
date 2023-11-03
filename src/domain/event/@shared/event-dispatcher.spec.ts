import { SendEmailOnProductCreatedHandler } from "../product/handler/send-email-on-product-created.handler";
import { EventDispatcher } from "./event-dispatcher";

describe("EventDispatcher", () => {
  it("Should register event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
  });
});
