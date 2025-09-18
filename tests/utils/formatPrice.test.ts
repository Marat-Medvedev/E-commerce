import { formatPrice, calculateTotal } from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(19.99)).toBe('$19.99');
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(1000)).toBe('$1,000.00');
  });
});

describe('calculateTotal', () => {
  it('should calculate total correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35);
  });

  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
