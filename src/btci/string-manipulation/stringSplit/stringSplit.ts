export function stringSplit(s: string, splitChar: string): string[] {
  const splitString: string[] = [];
  let currentStr = "";

  for (let i = 0; i < s.length; i++) {
    if (s[i] === splitChar) {
      // edge case for first char split
      splitString.push(currentStr);
      currentStr = "";
    } else currentStr += s[i];
  }
  splitString.push(currentStr);

  return splitString;
}
