import { OrderService, PaymentGateway, InventoryService, EmailService, OrderRepository, User, Item } from '../src/order';

describe('OrderService', () => {
    let orderService: OrderService;
    let mockPaymentGateway: jest.Mocked<PaymentGateway>;
    let mockInventoryService: jest.Mocked<InventoryService>;
    let mockEmailService: jest.Mocked<EmailService>;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    const mockUser: User = { email: 'test@example.com' };
    const mockItems: Item[] = [
        { id: 'item1', price: 10 },
        { id: 'item2', price: 20 },
    ];

    beforeEach(() => {
        mockPaymentGateway = {
            charge: jest.fn(),
        };
        mockInventoryService = {
            isAvailable: jest.fn(),
        };
        mockEmailService = {
            sendConfirmation: jest.fn(),
        };
        mockOrderRepository = {
            save: jest.fn(),
        };

        orderService = new OrderService(
            mockPaymentGateway,
            mockInventoryService,
            mockEmailService,
            mockOrderRepository
        );
    });

    test('should place an order successfully when all items are available', () => {
        // Arrange
        mockInventoryService.isAvailable.mockReturnValue(true);
        const expectedTotal = 30;

        // Act
        const result = orderService.placeOrder(mockUser, mockItems);

        // Assert
        expect(result).toBe(expectedTotal);
        expect(mockInventoryService.isAvailable).toHaveBeenCalledTimes(mockItems.length);
        expect(mockPaymentGateway.charge).toHaveBeenCalledWith(mockUser, expectedTotal);
        expect(mockOrderRepository.save).toHaveBeenCalledWith({
            user: mockUser,
            items: mockItems,
            total: expectedTotal,
        });
        expect(mockEmailService.sendConfirmation).toHaveBeenCalledWith(mockUser.email);
    });

    test('should throw an error and not process payment if an item is not available', () => {
        // Arrange
        mockInventoryService.isAvailable.mockImplementation((id) => id === 'item1'); // item2 not available

        // Act & Assert
        expect(() => orderService.placeOrder(mockUser, mockItems)).toThrow("Item not available");

        // Verify side effects did not happen
        expect(mockPaymentGateway.charge).not.toHaveBeenCalled();
        expect(mockOrderRepository.save).not.toHaveBeenCalled();
        expect(mockEmailService.sendConfirmation).not.toHaveBeenCalled();
    });

    test('should calculate the total correctly for different items', () => {
        // Arrange
        mockInventoryService.isAvailable.mockReturnValue(true);
        const customItems: Item[] = [
            { id: 'A', price: 5.5 },
            { id: 'B', price: 4.5 },
        ];

        // Act
        const result = orderService.placeOrder(mockUser, customItems);

        // Assert
        expect(result).toBe(10);
        expect(mockPaymentGateway.charge).toHaveBeenCalledWith(mockUser, 10);
    });
});
