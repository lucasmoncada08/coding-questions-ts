import { describe, it, expect } from 'vitest';

import { mergeThreeArrays } from './merge-three-arrays';

describe('merge three arrays testing', () => {
    it('basic test cases', () => {
        const a = [1, 2, 3];
        const b = [2, 4, 5];
        const c = [3, 4, 6];

        expect(mergeThreeArrays(a, b, c)).toEqual([1, 2, 2, 3, 3, 4, 4, 5, 6]);
    })
})