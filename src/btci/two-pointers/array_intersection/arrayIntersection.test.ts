import { describe, expect, it } from 'vitest';
import { arrayIntersection } from './arrayIntersection';

describe('testing array intersection', () => {
    it('testing basic positive scenarios', () => {
        const basicTest: [number[], number[]] = [
            [1, 2, 4, 5],
            [3, 4, 6, 7]
        ];
        const expectedResult = [1, 2, 3, 4, 4, 5, 6, 7];
        
        expect(arrayIntersection(...basicTest)).toStrictEqual(expectedResult)
    })
})