export function joinString(arr: string[], s: string): string {
    let result = '';
    for (let i=0; i<arr.length-1; i++) {
        result += (arr[i] + s);
    }
    return result + arr[arr.length-1];
}