export function mergeThreeArraysQuick(a: number[], b: number[], c: number[]): number[] {
let result: number[] = [];

// loop through all three arrays and get the min of them all
    let combinedArrayLength = a.length + b.length + c.length;
    
    let aIndex = 0;
    let bIndex = 0;
    let cIndex = 0;

    while (result.length < combinedArrayLength) {
        if (a[aIndex] < b[bIndex]) {
            if (b[bIndex] < c[cIndex]) 
                result.push(b[bIndex++]);
            else
                result.push(c[cIndex++]);
        } else {
            if (a[aIndex] < c[cIndex])
                result.push(a[aIndex++]);
            else
                result.push(c[cIndex++]);
        }
    }
}

export function mergeThreeArrays(a: number[], b: number[], c: number[]): number[] {
    // merge array a and b
    const mergeResultAB: number[] = [];

    let aIndex = 0;
    let bIndex = 0;
    while (aIndex < a.length && bIndex < a.length) {
        if (a[aIndex] < b[bIndex])
            mergeResultAB.push(a[aIndex++]);
        else
            mergeResultAB.push(b[bIndex++]);
    }
    console.log({mergeResultAB});

    // handle adding extras
    while (aIndex < a.length) {
        mergeResultAB.push(a[aIndex++]);
    }
    while (bIndex < b.length) {
        mergeResultAB.push(b[bIndex++]);
    }
    console.log({mergeResultAB});

    const mergeResultAll: number[] = [];
    let mergeABIndex = 0;
    let cIndex = 0; 
    while (mergeABIndex < mergeResultAB.length && cIndex < c.length) {
        if (mergeResultAB[mergeABIndex] < c[cIndex]) 
            mergeResultAll.push(mergeResultAB[mergeABIndex++]);
        else
            mergeResultAll.push(c[cIndex++]);
    }
    console.log({result: mergeResultAll});

    // handle adding extras
    while (mergeABIndex < mergeResultAB.length) {
        mergeResultAll.push(a[aIndex++]);
    }
    while (cIndex < c.length) {
        mergeResultAll.push(c[cIndex++]);
    }
    console.log({result: mergeResultAll});

    return mergeResultAll;
}