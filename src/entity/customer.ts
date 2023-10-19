export class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;

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
}