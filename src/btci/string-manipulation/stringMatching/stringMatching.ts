export function indexOf(str: string, substring: string): number {
  const latestSubstringCharIndex = str.length - substring.length;
  for (let i = 0; i <= latestSubstringCharIndex; i++) {
    const match = checkMatchingStringFromStartPoint(str, substring, i);
    if (match) return match;
  }

  return -1;
}

export function indexOfWithRollingHashV1(
  str: string,
  substring: string,
): number {
  if (substring.length === 0) return 0;

  const base = 31; // low prime
  const mod = 1e6 + 3; // another prime
  let highestPower = 1;

  // compute substring hash and first window hash
  let patternHash = 0;
  let windowHash = 0;
  for (let i = 0; i < substring.length; i++) {
    patternHash = (patternHash * base + substring.charCodeAt(i)) % mod;
    windowHash = (windowHash * base + str.charCodeAt(i)) % mod;
    if (i > 0) highestPower = (highestPower * base) % mod;
  }

  if (windowHash === patternHash) {
    // handle collisions
    if (str.substring(0, substring.length) === substring) return 0;
  }

  // roll through remaining string windows
  const latestSubstringCharIndex = str.length - substring.length;
  for (let i = 1; i <= latestSubstringCharIndex; i++) {
    const outgoing = str.charCodeAt(i - 1);
    const incoming = str.charCodeAt(i + substring.length - 1);

    windowHash = (windowHash - ((outgoing * highestPower) % mod) + mod) % mod;
    windowHash = (windowHash * base + incoming) % mod;

    if (windowHash === patternHash) {
      // handle collisions
      if (str.substring(i, i + substring.length) === substring) return i;
    }
  }

  return -1;
}

const HASH_BASE = 31;
const HASH_MOD = 1e6 + 3;
function createRollingHasher(windowSize: number) {
  let leftMostCharWeight = 1;
  for (let i = 1; i < windowSize; i++) {
    leftMostCharWeight = (leftMostCharWeight * HASH_BASE) % HASH_MOD;
  }

  return {
    computeHash(str: string, start = 0, end = str.length) {
      let hash = 0;
      for (let i = start; i < end; i++) {
        hash = (hash * HASH_BASE + str.charCodeAt(i)) % HASH_MOD;
      }
      return hash;
    },
    rollHash(currentHash: number, outgoing: number, incoming: number): number {
      let newHash =
        (currentHash -
          ((outgoing * leftMostCharWeight) % HASH_MOD) +
          HASH_MOD) %
        HASH_MOD;
      newHash = (newHash * HASH_BASE + incoming) % HASH_MOD;
      return newHash;
    },
  };
}
function verifyMatch(
  str: string,
  pattern: string,
  strPosition: number,
): boolean {
  return str.substring(strPosition, strPosition + pattern.length) === pattern;
}

export function indexOfWithRollingHash(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return -1;

  const hasher = createRollingHasher(pattern.length);
  const patternHash = hasher.computeHash(pattern);
  let windowHash = hasher.computeHash(text, 0, pattern.length);

  // Check first window
  if (windowHash === patternHash && verifyMatch(text, pattern, 0)) {
    return 0;
  }

  // Slide window through text
  const lastValidPosition = text.length - pattern.length;
  for (let pos = 1; pos <= lastValidPosition; pos++) {
    const outgoingChar = text.charCodeAt(pos - 1);
    const incomingChar = text.charCodeAt(pos + pattern.length - 1);

    windowHash = hasher.rollHash(windowHash, outgoingChar, incomingChar);

    if (windowHash === patternHash && verifyMatch(text, pattern, pos)) {
      return pos;
    }
  }

  return -1;
}

// Initial version: O(n), where s=str and n=substring
function checkMatchingStringFromStartPoint(
  str: string,
  substring: string,
  i: number,
) {
  let j = 0;
  // O(n)
  while (j < str.length) {
    if (j === substring.length) return i;
    if (str[i + j] !== substring[j]) break;
    j++;
  }
}

// also O(n)?
function checkMatchingStringFromStartPointV2(
  str: string,
  substring: string,
  i: number,
) {
  return str.substring(i, i + substring.length) === substring ? i : null;
}
