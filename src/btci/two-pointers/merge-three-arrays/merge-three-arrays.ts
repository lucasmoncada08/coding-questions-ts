export function mergeThreeArraysQuick(a: number[], b: number[], c: number[]): number[] {
    const result: number[] = [];
    const totalLength = a.length + b.length + c.length;

    let aIndex = 0;
    let bIndex = 0;
    let cIndex = 0;

    while (result.length < totalLength) {

        const aValue = aIndex < a.length ? a[aIndex] : Infinity;
        const bValue = bIndex < b.length ? b[bIndex] : Infinity;
        const cValue = cIndex < c.length ? c[cIndex] : Infinity;
        
        if (aValue < bValue && aValue < cValue) {
            result.push(aValue);
            aIndex++;
        } else if (bValue < cValue) {
            result.push(bValue);
            bIndex++;
        } else {
            result.push(cValue);
            cIndex++;
        }
    }

    return result;
}

export function mergeThreeArrays(a: number[], b: number[], c: number[]): number[] {
    // merge array a and b
    const mergeResultAB: number[] = [];

    mergeTwoArrays(a, b, mergeResultAB);

    const mergeResultAll: number[] = [];
    mergeTwoArrays(mergeResultAB, c, mergeResultAll);

    return mergeResultAll;
}

function mergeTwoArrays(a: number[], b: number[], mergeResult: number[]) {
    const { aIndex, bIndex } = mergeUntilEndOfEither(a, b, mergeResult);

    pushAnyRemainingElements(aIndex, a, mergeResult);
    pushAnyRemainingElements(bIndex, b, mergeResult);
}
function pushAnyRemainingElements(aIndex: number, a: number[], mergeResult: number[]) {
    while (aIndex < a.length) {
        mergeResult.push(a[aIndex++]);
    }
}

function mergeUntilEndOfEither(a: number[], b: number[], mergeResult: number[]) {
    let aIndex = 0;
    let bIndex = 0;
    
    while (aIndex < a.length && bIndex < b.length) {
        if (a[aIndex] < b[bIndex]) {
            mergeResult.push(a[aIndex++]); 
        }
        else {
            mergeResult.push(b[bIndex++]);
        }
            
    }
    return { aIndex, bIndex };
}

