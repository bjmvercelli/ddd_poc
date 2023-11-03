import { SendEmailOnProductCreatedHandler } from "../product/handler/send-email-on-product-created.handler";
import { EventDispatcher } from "./event-dispatcher";

describe("EventDispatcher", () => {
  it("Should register event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("Should unregister event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(0);
  });

  it("Should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  });
});
