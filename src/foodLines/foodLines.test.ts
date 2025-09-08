import { describe, it, expect } from 'vitest';
// import { receivePeopleIntoLines, getSmallestLineIndex } from './foodLines';
import { FoodLine } from './foodLines';

describe('example test suite', () => {
  it('should test food lines function', () => {
    const foodLine = new FoodLine([1, 2, 3]);
    foodLine.receivePeople(3);
    expect(foodLine.lines).toEqual([3, 3, 3]);
  });

  it.only('should return the index of the smallest line', () => {
    let foodLine = new FoodLine([5, 3, 8, 1, 4]);
    expect(foodLine.getSmallestLineIndex()).toBe(3);
    foodLine = new FoodLine([10, 20, 5, 15]);
    expect(foodLine.getSmallestLineIndex()).toBe(2);
    foodLine = new FoodLine([7, 7, 7, 7]);
    expect(foodLine.getSmallestLineIndex()).toBe(0);
    foodLine = new FoodLine([1]);
    expect(foodLine.getSmallestLineIndex()).toBe(0);
  });
});