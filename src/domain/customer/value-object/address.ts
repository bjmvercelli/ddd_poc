export class Address {
  _street: string;
  _number: number;
  _city: string;
  _zip: string;

  constructor(street: string, number: number, zip: string, city: string,) {
    this._street = street;
    this._city = city;
    this._number = number;
    this._zip = zip;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  validate() {
    if (!this._street){
      throw new Error("Street is required");
    }

    if (!this._city){
      throw new Error("City is required");
    }

    if (!this._number){
      throw new Error("Number is required");
    }

    if (!this._zip){
      throw new Error("Zip is required");
    }
  }

  toString(){
    return `${this._street} ${this._number}, ${this._city} ${this._zip}`;
  }
}