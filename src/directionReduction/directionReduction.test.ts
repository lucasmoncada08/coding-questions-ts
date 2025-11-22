import { strict as assert } from "node:assert";

import { reduceDirections, Directions } from "./directionReduction";

let anyFailure = false;
function test(description: string, run: () => void) {
    try {
        run();
        console.log(`Test Passed: ${description}`);
    } catch(error) {
        console.log(`Test Failed: ${description}`);
        console.log({error});
        anyFailure = true;
    }
}

function containsDirectionNTimes(directions: Directions[], direction: Directions): number {
    let count = 0;
    for (let i=0; i<directions.length; i++) {
        if (directions[i] === direction)
            count++;
    }
    return count;
}

test("basic directions test", () => { 
    const reducedDirections = reduceDirections(["North"]);
    assert.equal(reducedDirections[0], "North");
    assert.equal(reducedDirections.length, 1);
    assert.equal(containsDirectionNTimes(reducedDirections, "North"), 1);
})

test("reverse directions", () => {
    const reducedDirections = reduceDirections(["North", "South"]);
    assert.equal(reducedDirections.length, 0);
})

test("overlapping but still direction", () => {
    const directions: Directions[] = ["North", "South", "South", "North", "North", "North", "North"];
    const reducedDirections = reduceDirections(directions);
    assert.equal(containsDirectionNTimes(reducedDirections, "North"), 3);
})

test("multiple directions overlapping", () => {
    const directions: Directions[] = ["North", "East", "South", "North", "East", "West", "East"];
    const reducedDirections = reduceDirections(directions);
    assert.equal(containsDirectionNTimes(reducedDirections, "North"), 1);
    assert.equal(containsDirectionNTimes(reducedDirections, "East"), 2);
})

test("multiple directions negative", () => {
    const directions: Directions[] = ["South", "West", "South", "North", "South", "West", "West", "East", "West"];
    const reducedDirections = reduceDirections(directions);
    assert.equal(containsDirectionNTimes(reducedDirections, "South"), 2);
    assert.equal(containsDirectionNTimes(reducedDirections, "West"), 3);
    assert.equal(reducedDirections.length, 5);
})

if (anyFailure)
    console.log("Found some failures");
else
    console.log("All tests passed!");