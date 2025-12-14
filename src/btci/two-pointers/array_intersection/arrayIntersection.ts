export function arrayIntersection(arrOne: number[], arrTwo: number[]): number[] {
    const combinedArr = [];

    let arrOneIndex = 0;
    let arrTwoIndex = 0;

    while (arrOneIndex < arrOne.length && arrTwoIndex < arrTwo.length) {
        if (arrOne[arrOneIndex] <= arrTwo[arrTwoIndex]) {
            combinedArr.push(arrOne[arrOneIndex]);
            arrOneIndex++;
        } else {
            combinedArr.push(arrTwo[arrTwoIndex]);
            arrTwoIndex++;
        }
    }
    
    for (let i=arrOneIndex; i<arrOne.length; i++) {
        combinedArr.push(arrOne[i]);
    }

    for (let i=arrTwoIndex; i<arrTwo.length; i++) {
        combinedArr.push(arrTwo[i]);
    }

    return combinedArr;
}