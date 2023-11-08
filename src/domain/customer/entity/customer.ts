import { EventDispatcher } from "../../@shared/event/event-dispatcher";
import { CustomerAddressChangedEvent } from "../event/customer-address-changed.event";
import { CustomerCreatedEvent } from "../event/customer-created.event";
import { EnviaConsoleLogHandler } from "../event/handler/log-on-customer-address-changed.handler";
import { EnviaConsoleLog1Handler } from "../event/handler/log-on-customer-created-1.handler";
import { EnviaConsoleLog2Handler } from "../event/handler/log-on-customer-created-2.handler";
import { Address } from "../value-object/address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher = new EventDispatcher();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
    this.notifyOnCustomerCreated();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;

    this.notifyOnCustomerAddressChanged(address);
  }

  validate() {
    if (!this._name) {
      throw new Error("Name is required");
    }

    if (!this._id) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is required");
    }

    return (this._active = true);
  }

  deactivate() {
    return (this._active = false);
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  notifyOnCustomerCreated() {
    const firstCustomerCreatedEventHandler = new EnviaConsoleLog1Handler();
    const secondCustomerCreatedEventHandler = new EnviaConsoleLog2Handler();

    this._eventDispatcher.register("CustomerCreatedEvent", firstCustomerCreatedEventHandler);
    this._eventDispatcher.register("CustomerCreatedEvent", secondCustomerCreatedEventHandler);

    const event = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
    });

    this._eventDispatcher.notify(event);

    this._eventDispatcher.unregister("CustomerCreatedEvent", firstCustomerCreatedEventHandler);
    this._eventDispatcher.unregister("CustomerCreatedEvent", secondCustomerCreatedEventHandler);
  }

  notifyOnCustomerAddressChanged(newAddress: Address) {
    const addressChangedEventHandler = new EnviaConsoleLogHandler();

    this._eventDispatcher.register("CustomerAddressChangedEvent", addressChangedEventHandler);

    const event = new CustomerAddressChangedEvent({
      id: this._id,
      name: this._name,
      newAddress,
    });

    this._eventDispatcher.notify(event);

    this._eventDispatcher.unregister("CustomerAddressChangedEvent", addressChangedEventHandler);
  }
}
