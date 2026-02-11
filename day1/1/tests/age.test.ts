import { isAdult } from '../src/age';

describe('isAdult', () => {
  test('should return true for age 18', () => {
    expect(isAdult(18)).toBe(true);
  });

  test('should return true for age 25', () => {
    expect(isAdult(25)).toBe(true);
  });

  test('should return false for age 17', () => {
    expect(isAdult(17)).toBe(false);
  });

  test('should return false for age 10', () => {
    expect(isAdult(10)).toBe(false);
  });

  test('should throw an error for negative age', () => {
    expect(() => isAdult(-1)).toThrow("Age cannot be negative");
  });
});
