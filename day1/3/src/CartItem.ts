export class CartItem {
    constructor(
        private readonly _name: string,
        private readonly _price: number
    ) {}

    public price(): number {
        return this._price;
    }

    public name(): string {
        return this._name;
    }
}
