function sortedKey(str: string): string {
  return str.split("").sort().join("");
}

function frequencyKey(str: string): string {
  const counts = new Array(26).fill(0);
  for (const char of str) {
    counts[char.charCodeAt(0) - 97]++;
  }
  return counts.join(",");
}

export function groupAnagrams(
  strs: string[],
  keyFn: (str: string) => string = sortedKey
): string[][] {
  const anagramMap: Record<string, string[]> = {};

  for (const str of strs) {
    const key = keyFn(str);
    if (!anagramMap[key]) {
      anagramMap[key] = [];
    }
    anagramMap[key].push(str);
  }

  const result: string[][] = [];
  for (const key of Object.keys(anagramMap)) {
    result.push(anagramMap[key]);
  }

  return result;
}

export { sortedKey, frequencyKey };
