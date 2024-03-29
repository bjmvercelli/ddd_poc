import { Entity } from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import { CustomerValidatorFactory } from "../factory/customer.validator.factory";
import { Address } from "../value-object/address";

export class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
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
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
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
}
