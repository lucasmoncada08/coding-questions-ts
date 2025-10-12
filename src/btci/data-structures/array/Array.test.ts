import { strict as assert } from 'node:assert';

import { MyArray } from "./Array";

let anyFailure = false;

function test(description: string, run: () => void) {
    try {
        run();
        console.log(`PASS: ${description}`);
    } catch (error) {
        console.error(`FAIL: ${description}`);
        console.error({error});
        anyFailure = true;
    }
}

function createSimpleArray(): MyArray<number> {
    return MyArray.of(1, 2, 3);
}

test("array starts empty", () => {
    const arr = new MyArray();
    assert.equal(arr.length, 0);
})

test("initialize the capacity of the array", () => {
    const arr = new MyArray(8);
    assert.equal(arr.capacity, 8);
})

test("push an element into the array", () => {
    const arr = new MyArray();
    arr.push(1);
    assert.equal(arr.length, 1);
})

test("initialize array with preset values with of", () => {
    const arr = createSimpleArray();
    assert.equal(arr.length, 3);
})

test("get the value of a given index", () => {
    const arr = createSimpleArray();
    assert.equal(arr.get(0), 1);
    assert.equal(arr.get(1), 2);
    assert.equal(arr.get(2), 3);
})

if (anyFailure) {
    console.log("Errors Found!")
} else {
    console.log("All Tests Passed!")
}