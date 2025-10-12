# Hand-Built Arrays

## Why Build One Yourself?
Reimplementing an array from first principles makes the trade-offs of constant-time indexing, contiguous storage, and dynamic resizing concrete. This is an exercise to tour through the invariants that the real JavaScript `Array` keeps hidden: a backing store, a `length` tracker, and guard rails that protect against out-of-bounds access.

## Core Invariants to Maintain
- A contiguous storage container (object or `Record<number, T>`) that maps numeric indices to values.
- A `length` property that always reflects the number of accessible elements.
- Capacity and resizing rules so `push`/`unshift` remain efficient (doubling strategy works well).
- Defensive bounds checking for any read/write operation.

## Implementation Roadmap
1. **Construction & Length**: create an empty `MyArray`, confirm `length === 0`, optionally accept initial elements.
2. **Indexed Accessors**: add `get(index)` and `set(index, value)` with bounds validation and overwriting semantics.
3. **Tail Operations**: implement `push(...items)` and `pop()`; verify growth, shrink, and returned values.
4. **Head Operations**: add `unshift(...items)` and `shift()` to practice element shifting and empty-structure guards.
5. **Indexed Insert/Remove**: support `insert(index, value)` and `remove(index)` (or `deleteAt`) to consolidate shifting logic.
6. **Iteration Helpers**: implement `forEach`, followed by `map` (and optionally `reduce`) to exercise traversal over the internal buffer.
7. **Search Utilities**: provide `indexOf`, `includes`, or `find` to rehearse linear scans and early exit behavior.
8. **Slice & Splice**: once comfortable, tackle `slice` (non-mutating copy) and `splice` (mutating removal/insertion) to solidify copying vs. in-place edits.
9. **Stretch Goals**: consider `reverse`, `sort` (simple algorithms first), or making the structure iterable via `[Symbol.iterator]`.

## Testing & Feedback Loop
- Start every step with focused tests that capture expected behavior and edge cases (empty array, single element, invalid index).
- After each green test run, inspect the internal state (buffer + `length`) to reinforce intuition.
- Document insights as you go—small notes per milestone will make the full journey easier to review later.
