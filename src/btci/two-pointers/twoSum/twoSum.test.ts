import { describe, it, expect } from 'vitest';

import { twoSum } from './twoSum';

type testCase = {
    input: number[], 
    answer: boolean,
}

describe('testing two sum', () => {
    it('basic tests provided in question', () => {
        const tests: testCase[] = [
            {
                input: [-5, -2, -1, 1, 1, 10], 
                answer: true,
            },
            {
                input: [-3, 0, 0, 1, 2], 
                answer: true,
            },
            {
                input: [-5, -3, -1, 0, 2, 4, 6], 
                answer: false,
            },
        ];

        for (const test of tests) {
            expect(twoSum(test.input)).toBe(test.answer);
        }
    })
})