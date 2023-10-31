export class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;

    this.validate();
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }

  validate(): void {
    if (!this._id) {
      throw new Error('Id is required');
    }

    if (!this._name) {
      throw new Error('Name is required');
    }

    if (this._price < 0) {
      throw new Error('Price must be greater than 0');
    }

    if (this._quantity < 1) {
      throw new Error('Quantity must be greater than 0');
    }
  }
}