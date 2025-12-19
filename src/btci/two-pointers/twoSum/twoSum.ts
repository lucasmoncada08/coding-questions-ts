export function twoSum(arr: number[]): boolean {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    const sumOfElements = arr[start] + arr[end];
    if (sumOfElements == 0) return true;
    else if (sumOfElements < 0) start++;
    else if (sumOfElements > 0) end--;
  }

  return false;
}
