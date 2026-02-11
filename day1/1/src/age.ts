/**
 * Checks if a person is an adult based on their age.
 * @param age The age of the person.
 * @returns true if the person is 18 or older, false otherwise.
 */
export function isAdult(age: number): boolean {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
  return age >= 18;
}
