import { Cart } from '../src/Cart';
import { CartItem } from '../src/CartItem';

describe('CartTest', () => {

    test('givenEmptyCart_totalShouldBeZero', () => {
        const cart = new Cart();
        expect(cart.total()).toBe(0);
    });

    test('givenTotalHigherThan100_shouldHave10PercentDiscount', () => {
        const cart = new Cart();
        cart.addItem(new CartItem("item1", 50));
        cart.addItem(new CartItem("item2", 70));
        // subtotal 120 > 100 -> discount 10% -> 120 * 0.9 = 108
        // subtotal 120 > 50 -> delivery fees 0
        expect(cart.total()).toBe(120 * 0.9);
    });

    test('givenTotalLowerThan50_shouldHaveDeliveryFees', () => {
        const cart = new Cart();
        cart.addItem(new CartItem("item1", 30));
        // subtotal 30 < 50 -> delivery fees 10 -> total 40
        expect(cart.total()).toBe(40);
    });

    test('givenTotalBetween50And100_shouldHaveNoDiscountAndNoFees', () => {
        const cart = new Cart();
        cart.addItem(new CartItem("item1", 50));
        cart.addItem(new CartItem("item2", 30));
        // subtotal 80 -> no discount, no fees -> total 80
        expect(cart.total()).toBe(80);
    });
});
