import EventInterface from "../../@shared/event/event.interface";

export class CustomerAddressChangedEvent implements EventInterface {
  public readonly dataTimeOccurred: Date = new Date();
  public readonly eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData;
  }
}