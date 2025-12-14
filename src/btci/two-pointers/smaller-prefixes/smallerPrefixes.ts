export function smallerPrefixes(items: number[]): boolean {
  let prefixIndex = 0;
  let doubleIndex = 0;

  let prefixSum = 0;
  let doubleSum = items[0];
  while (doubleIndex < items.length) {
    prefixSum += items[prefixIndex];
    prefixIndex += 1;

    doubleSum += items[doubleIndex] + items[doubleIndex + 1];
    doubleIndex += 2;

    if (prefixSum >= doubleSum) return false;
  }

  return true;
}
