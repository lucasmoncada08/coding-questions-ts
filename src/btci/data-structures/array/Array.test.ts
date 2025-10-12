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

test("array starts empty", () => {
    const arr = new MyArray();
    assert.equal(arr.length, 0);
})

if (anyFailure) {
    console.log("Errors Found!")
} else {
    console.log("All Tests Passed!")
}