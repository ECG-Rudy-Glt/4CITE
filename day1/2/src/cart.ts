export interface Article {
  name: string;
  price: number;
}

export interface CartResult {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

/**
 * Calculates the total for a shopping cart based on specific rules:
 * - Total is the sum of prices.
 * - 10% discount if total > 100€.
 * - Shipping: 10€ if total < 50€, 0€ otherwise.
 */
export function calculateCart(articles: Article[]): CartResult {
  const subtotal = articles.reduce((sum, article) => sum + article.price, 0);
  
  let discount = 0;
  if (subtotal > 100) {
    discount = subtotal * 0.1;
  }
  
  const totalAfterDiscount = subtotal - discount;
  
  let shipping = 0;
  if (subtotal < 50) {
    shipping = 10;
  }
  
  return {
    subtotal,
    discount,
    shipping,
    total: totalAfterDiscount + shipping
  };
}
