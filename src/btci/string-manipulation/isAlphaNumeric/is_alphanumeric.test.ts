import { describe, it, expect } from 'vitest';
import { isAlphaNumeric, isAlphaNumericV2 } from './is_alphanumeric';

describe('is_alphanumeric test', () => {
    it('test alphanumeric fxn', () => {
        // lowercase
        expect(isAlphaNumeric("a")).toBe(true);
        expect(isAlphaNumeric("d")).toBe(true);
        expect(isAlphaNumeric("z")).toBe(true);
        
        // uppercase
        expect(isAlphaNumeric("A")).toBe(true);
        expect(isAlphaNumeric("Q")).toBe(true);
        expect(isAlphaNumeric("Z")).toBe(true);
        
        // numbers
        expect(isAlphaNumeric("0")).toBe(true);
        expect(isAlphaNumeric("1")).toBe(true);
        expect(isAlphaNumeric("9")).toBe(true);
        
        // false 
        expect(isAlphaNumeric(":")).toBe(false);
        expect(isAlphaNumeric("`")).toBe(false);
        expect(isAlphaNumeric("?")).toBe(false);
    })
})


describe('is_alphanumeric v2 test', () => {
    it('test alphanumeric v2 fxn', () => {
        // lowercase
        expect(isAlphaNumericV2("a")).toBe(true);
        expect(isAlphaNumericV2("d")).toBe(true);
        expect(isAlphaNumericV2("z")).toBe(true);
        
        // uppercase
        expect(isAlphaNumericV2("A")).toBe(true);
        expect(isAlphaNumericV2("Q")).toBe(true);
        expect(isAlphaNumericV2("Z")).toBe(true);
        
        // numbers
        expect(isAlphaNumericV2("0")).toBe(true);
        expect(isAlphaNumericV2("1")).toBe(true);
        expect(isAlphaNumericV2("9")).toBe(true);
        
        // false 
        expect(isAlphaNumericV2(":")).toBe(false);
        expect(isAlphaNumericV2("`")).toBe(false);
        expect(isAlphaNumericV2("?")).toBe(false);
    })
})