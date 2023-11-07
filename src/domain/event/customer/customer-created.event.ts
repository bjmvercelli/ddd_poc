import EventInterface from "../@shared/event.interface";

export class CustomerCreatedEvent implements EventInterface {
  public readonly dataTimeOccurred: Date = new Date();
  public readonly eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData;
  }
}
