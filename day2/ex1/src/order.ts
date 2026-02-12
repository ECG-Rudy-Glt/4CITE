export interface PaymentGateway {
    charge(user: User, total: number): void;
}

export interface InventoryService {
    isAvailable(itemId: string): boolean;
}

export interface EmailService {
    sendConfirmation(email: string): void;
}

export interface OrderRepository {
    save(order: { user: User; items: Item[]; total: number }): void;
}

export interface User {
    email: string;
}

export interface Item {
    id: string;
    price: number;
}

export class OrderService {
    private paymentGateway: PaymentGateway;
    private inventoryService: InventoryService;
    private emailService: EmailService;
    private orderRepository: OrderRepository;

    constructor(
        paymentGateway: PaymentGateway,
        inventoryService: InventoryService,
        emailService: EmailService,
        orderRepository: OrderRepository
    ) {
        this.paymentGateway = paymentGateway;
        this.inventoryService = inventoryService;
        this.emailService = emailService;
        this.orderRepository = orderRepository;
    }

    placeOrder(user: User, items: Item[]): number {
        const total = items.reduce((sum, item) => sum + item.price, 0);

        for (let item of items) {
            if (!this.inventoryService.isAvailable(item.id)) {
                throw new Error("Item not available");
            }
        }

        this.paymentGateway.charge(user, total);
        this.orderRepository.save({ user, items, total });
        this.emailService.sendConfirmation(user.email);

        return total;
    }
}
 