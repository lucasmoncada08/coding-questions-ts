import { rot13Shift } from './rot13';
import { describe, test, expect } from 'vitest';

describe('rot13Shift', () => {
test('should convert char to ROT13 version', () => {
  expect(rot13Shift('S')).toBe('F'); 
  expect(rot13Shift('z')).toBe('m');
  expect(rot13Shift('B')).toBe('O');
  expect(rot13Shift('X')).toBe('K');
  expect(rot13Shift('!')).toBe('!');
  expect(rot13Shift(' ')).toBe(' ');
  expect(rot13Shift('2')).toBe('2');
});

test('should convert string to ROT13 version', () => {
  expect(rot13Shift('abc')).toBe('nop');
  expect(rot13Shift('gS')).toBe('tF');
  expect(rot13Shift('FgS')).toBe('StF');
  expect(rot13Shift('gS')).toBe('tF');
  expect(rot13Shift('S')).toBe('F');
  expect(rot13Shift('')).toBe('');
  expect(rot13Shift('X78942 ue__/')).toBe('K78942 hr__/');
});

});
// "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
