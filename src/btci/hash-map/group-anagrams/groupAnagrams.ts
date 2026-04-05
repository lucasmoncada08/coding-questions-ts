export function groupAnagrams(strs: string[]): string[][] {
  const anagramMap: Record<string, string[]> = {};

  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (!anagramMap[sorted]) {
      anagramMap[sorted] = [];
    }
    anagramMap[sorted].push(str);
  }

  const result: string[][] = [];
  for (const key of Object.keys(anagramMap)) {
    result.push(anagramMap[key]);
  }

  return result;
}
