import { SendEmailOnProductCreatedHandler } from "../../product/event/handler/send-email-on-product-created.handler";
import { ProductCreatedEvent } from "../../product/event/product-created.event";
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

  it("Should notify event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const event = new ProductCreatedEvent({
      productId: "1",
      name: "Product 1",
      price: 100,
    });

    // Quando o método notify for chamado, o método handle do eventHandler deve ser chamado
    eventDispatcher.notify(event);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});
