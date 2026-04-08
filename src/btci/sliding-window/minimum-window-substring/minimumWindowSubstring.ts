function buildNeedMap(t: string): Record<string, number> {
  const nM: Record<string, number> = {};
  for (const char of t) {
    nM[char] = (nM[char] || 0) + 1;
  }
  return nM;
}

export function minimumWindowSubstring(s: string, t: string): string {
  const nM = buildNeedMap(t);
  let need = t.length;
  let l = 0;
  let r = 0;
  let min = Infinity;
  let minStart = 0;

  function adjustToRightPtr(): void {
    if (s[r] in nM) {
      if (nM[s[r]]-- > 0) need--;
    }
  }

  function adjustToLeftPtr(): void {
    if (s[l] in nM) {
      if (++nM[s[l]] >= 1) need++;
    }
  }

  function considerNewMin(): void {
    if (r - l + 1 < min) {
      min = r - l + 1;
      minStart = l;
    }
  }

  while (r < s.length) {
    adjustToRightPtr();

    while (need === 0) {
      considerNewMin();
      adjustToLeftPtr();
      l++;
    }

    r++;
  }

  return min === Infinity ? "" : s.slice(minStart, minStart + min);
}
