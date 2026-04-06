# Project Conventions

## Stack
- **Language:** TypeScript (strict mode, ESNext target)
- **Testing:** Vitest 3.2.4
- **Linting:** ESLint + Prettier

## Structure
Problems live under `src/btci/{topic}/{problem-name}/` with two files per problem:
- `{problemName}.ts` — solution (named exports only, camelCase function names)
- `{problemName}.test.ts` — tests

Topic folders are kebab-case (e.g., `two-pointers`, `string-manipulation`). Problem folders are kebab-case. File names match the exported function name in camelCase.

Create new topic folders as needed under `src/btci/`.

## Test Pattern
Follow the `it.each` pattern with a typed tuple:
```typescript
import { describe, it, expect } from "vitest";
import { problemName } from "./problemName";

type TestCase = [input: InputType, expected: ExpectedType];

describe("problemName", () => {
  const cases: TestCase[] = [
    // [input, expected]
  ];

  it.each(cases)("problemName(%j) should return %s", (input, expected) => {
    expect(problemName(input)).toEqual(expected);
  });
});
```
Adapt the `TestCase` tuple to match the problem's function signature (multiple params, different types, etc.).

## Commands
- `npm test` — run all tests
- `npx vitest run src/btci/{topic}/{problem}/` — run a single problem's tests
- `npm run lint` — eslint
- `npm run format` — prettier

---

# Voice LeetCode Workflow

When the user says "new problem", "voice mode", "leetcode", or starts describing a coding problem, follow this workflow.

## 1. Scaffold
When the user names a problem and category, create the problem folder and stub files:
- `src/btci/{topic}/{problem-name}/{problemName}.ts` with an empty exported function
- `src/btci/{topic}/{problem-name}/{problemName}.test.ts` with the vitest boilerplate above

If the topic folder doesn't exist, create it.

## 2. BTCI Steps
Guide the user through these phases. Do not force the order — if they jump ahead, follow.

1. **Understand** — Restate the problem. Clarify inputs, outputs, constraints, edge cases.
2. **Test cases** — Add test cases to the test file first, before writing implementation.
3. **Brute force** — Discuss the approach, then code it together.
4. **Optimize** — Analyze time/space complexity, identify a better approach, refactor.

## 3. Voice Interaction Rules

**After every code change**, show the current state of the function body so the user always knows where they are.

**Keep responses short.** 1-3 sentences of prose max, then code.

**Accept mixed input:**
- Intent: "check if the array is empty return negative one" → `if (arr.length === 0) return -1;`
- Exact dictation: "left plus plus" → `left++;`
- Use context to decide which mode the user is in.

**Handle transcription noise.** If a spoken variable name is close to an existing one (e.g., "some of elements" when `sumOfElements` exists), use the existing name.

**Voice commands:**
- "run tests" / "run it" → `npx vitest run` on the current problem
- "add a test case" → prompt for input and expected output, add to cases array
- "undo" / "remove that line" → remove the last added line
- "show me the code" → display the full current file
- "next step" → move to the next BTCI phase

**Bias toward action.** Don't over-clarify. If the intent is reasonably clear, write the code.

## 4. Running Tests
Run only the current problem's tests: `npx vitest run src/btci/{topic}/{problem}/`

Show pass/fail concisely. On failure, show the failing case and diff, then wait for the user's instruction — do not auto-fix unless asked.
