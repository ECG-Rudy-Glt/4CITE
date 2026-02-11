import { calculateCart, Article } from '../src/cart';

describe('calculateCart', () => {
  test('should apply 10€ shipping for total < 50€', () => {
    const articles: Article[] = [
      { name: 'Book', price: 20 },
      { name: 'Pen', price: 10 }
    ];
    const result = calculateCart(articles);
    expect(result.subtotal).toBe(30);
    expect(result.shipping).toBe(10);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(40);
  });

  test('should have free shipping for total between 50€ and 100€', () => {
    const articles: Article[] = [
      { name: 'Shoes', price: 80 }
    ];
    const result = calculateCart(articles);
    expect(result.subtotal).toBe(80);
    expect(result.shipping).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(80);
  });

  test('should apply 10% discount for total > 100€ and have free shipping', () => {
    const articles: Article[] = [
      { name: 'Laptop', price: 1000 }
    ];
    const result = calculateCart(articles);
    expect(result.subtotal).toBe(1000);
    expect(result.discount).toBe(100);
    expect(result.shipping).toBe(0);
    expect(result.total).toBe(900);
  });

  test('should handle edge case: exactly 50€ (free shipping, no discount)', () => {
    const articles: Article[] = [{ name: 'Item', price: 50 }];
    const result = calculateCart(articles);
    expect(result.shipping).toBe(0);
    expect(result.total).toBe(50);
  });

  test('should handle edge case: exactly 100€ (free shipping, no discount)', () => {
    const articles: Article[] = [{ name: 'Item', price: 100 }];
    const result = calculateCart(articles);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(100);
  });
});
