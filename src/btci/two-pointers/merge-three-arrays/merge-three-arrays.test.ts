import { describe, it, expect } from 'vitest';

import { mergeThreeArrays, mergeThreeArraysQuick } from './merge-three-arrays';
import { mergeThreeArraysMerger } from './merge-three-arrays-merger';

describe('merge three arrays - original', () => {
    it('basic merge', () => {
        const a = [1, 2, 3];
        const b = [2, 4, 5];
        const c = [3, 4, 6];

        expect(mergeThreeArrays(a, b, c)).toEqual([1, 2, 2, 3, 3, 4, 4, 5, 6]);
    })

    it('more cases of different orders', () => {
        const a = [5, 8, 9];
        const b = [6, 6, 7];
        const c = [2, 5, 6];

        expect(mergeThreeArrays(a, b, c)).toEqual([2, 5, 5, 6, 6, 6, 7, 8, 9]);
    })
})

describe('merge three arrays - optimal', () => {
    it('basic merge', () => {
        const a = [1, 2, 3];
        const b = [2, 4, 5];
        const c = [3, 4, 6];

        expect(mergeThreeArraysQuick(a, b, c)).toEqual([1, 2, 2, 3, 3, 4, 4, 5, 6]);
    })

    it('more cases of different orders', () => {
        const a = [5, 8, 9];
        const b = [6, 6, 7];
        const c = [2, 5, 6];

        expect(mergeThreeArraysQuick(a, b, c)).toEqual([2, 5, 5, 6, 6, 6, 7, 8, 9]);
    })
})
