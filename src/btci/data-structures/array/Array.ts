const DEFAULT_CAPACITY = 4;

export class MyArray<T> {
  private data: Partial<Record<number, T>> = {};
  private _capacity: number;
  private _length: number = 0;

  constructor(initialCapacity: number = DEFAULT_CAPACITY) {
    this._capacity = initialCapacity;
  }

  push(item: T): void {
    this.data[this._length++] = item;
  }

  static of<T>(...initialItems: T[]): MyArray<T> {
    const arr = new MyArray<T>(Math.max(DEFAULT_CAPACITY, initialItems.length))
    for (const item of initialItems) {
      arr.push(item);
    }
    return arr;
  }

  get length(): number { 
    return this._length;
  }

  get capacity(): number {
    return this._capacity;
  }
}
