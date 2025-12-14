export function arrayIntersection(arrOne: number[], arrTwo: number[]): number[] {
    const combinedArr = [];

    let arrOneIndex = 0;
    let arrTwoIndex = 0;

    while (arrOneIndex < arrOne.length || arrTwoIndex < arrTwo.length) {
        const valOne = arrOne[arrOneIndex] ?? Infinity;
        const valTwo = arrTwo[arrTwoIndex] ?? Infinity;
        if (valOne <= valTwo) {
            combinedArr.push(valOne);
            arrOneIndex++;
        } else {
            combinedArr.push(valTwo);
            arrTwoIndex++;
        }
    }
    return combinedArr;
}