import { CartItem } from './CartItem';

export class Cart {
    private items: Set<CartItem> | null = null;

    public total(): number {
        if (this.items === null) return 0;
        
        let total = 0;
        this.items.forEach(item => {
            total += item.price();
        });

        const deliveryFees = this.getDeliveryFees(total);
        if (total > 100) {
            total = total * 0.9;
        }
        
        return total + deliveryFees;
    }

    private getDeliveryFees(total: number): number {
        return total < 50 ? 10 : 0;
    }

    public addItem(item: CartItem): void {
        if (this.items === null) {
            this.items = new Set<CartItem>();
        }
        this.items.add(item);
    }
}
