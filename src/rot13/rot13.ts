const UPPER_UNICODE = 65;
const LOWER_UNICODE = 97;
const ALPHA_LENGTH = 26;
const ROT13_SHIFT = 13;

enum CharType {
  Capitals = UPPER_UNICODE,
  Lowercase = LOWER_UNICODE,
}

export function rot13Shift(s: string): string {
  let rot13String: string = "";
  for (const character of s) {
    const charCode: number = character.charCodeAt(0);

    let rot13Num: number;
    if (withinUpperOrLowerCaseRange(charCode, CharType.Capitals)) {
      rot13Num = convertCharCodeToRot13(charCode, CharType.Capitals);
    } else if (withinUpperOrLowerCaseRange(charCode, CharType.Lowercase)) {
      rot13Num = convertCharCodeToRot13(charCode, CharType.Lowercase);
    } else {
      rot13Num = charCode; // Non-alphabetic characters remain unchanged
    }

    rot13String += String.fromCharCode(rot13Num);
  }

  return rot13String;
}

function withinUpperOrLowerCaseRange(
  charCode: number,
  base: CharType,
): boolean {
  if (base === CharType.Capitals) {
    return charCode >= UPPER_UNICODE && charCode < UPPER_UNICODE + ALPHA_LENGTH;
  } else if (base === CharType.Lowercase) {
    return charCode >= LOWER_UNICODE && charCode < LOWER_UNICODE + ALPHA_LENGTH;
  } else {
    // This branch should never be hit since base is always CharType
    throw new Error(`Invalid CharType: ${base}`);
  }
}

function convertCharCodeToRot13(charCode: number, base: CharType): number {
  const zeroBasedCharCode = charCode - base;
  const shiftedCharCode = zeroBasedCharCode + ROT13_SHIFT;
  const wrappedAround = shiftedCharCode % ALPHA_LENGTH;
  const result = wrappedAround + base;
  return result;
}
