import { expect, test } from '@jest/globals';

function sum(num1: number, num2: number) {
  return num1 + num2;
}

test('adds 2 number', () => {
  expect(sum(1, 2)).toBe(3);
});
