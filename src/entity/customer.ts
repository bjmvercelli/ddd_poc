import { Address } from "./address";

export class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  validate() {
    if (!this._name){
      throw new Error("Name is required");
    }

    if (!this._id){
      throw new Error("Id is required");
    }
  }

  activate(){
    if (!this._address){
      throw new Error("Address is required");
    }

    return this._active = true;
  }

  set Address(address: Address){
    this._address = address;
  }
}