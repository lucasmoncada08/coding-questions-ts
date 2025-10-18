const DEFAULT_CAPACITY = 4;
const RESIZE_SMALLER_RATIO = 0.25;

export class MyArray<T> {
  private data: Partial<Record<number, T>> = {};
  private _capacity: number;
  private _length: number = 0;

  constructor(initialCapacity: number = DEFAULT_CAPACITY) {
    this._capacity = initialCapacity;
  }

  push(first: T, ...rest: T[]): void;
  push(...items: T[]): void {
    for (const item of items) {
      if (this._length === this._capacity) this.resize(this._capacity * 2);
      this.data[this._length++] = item;
    }
  }

  pop(): T {
    if (this._length === 0)
      throw new Error("No data to pop")

    this.checkReduceCapacity();

    const valuePopped = this.data[this._length-1];
    delete this.data[this._length-1];
    this._length--;
    return valuePopped as T;
  }

  remove(index: number): T {
    if (this.length === 0)
      throw new Error("No data to pop");

    this.checkReduceCapacity();

    const valuePopped = this.data[index];

    for (let i=index; i<this._length; i++) {
      this.data[i] = this.data[i+1];
    }

    this._length--;
    return valuePopped as T;
  }

  checkReduceCapacity() {
    if (
      this._capacity > DEFAULT_CAPACITY &&
      this._length <= this._capacity*RESIZE_SMALLER_RATIO
    )
      this.resize(this._capacity / 2)
  }

  resize(newCapacity: number): void {
    const newData: Partial<Record<number, T>> = {};
    for (let i = 0; i < this._length; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this._capacity = newCapacity;
  }

  private assertIndexInBounds(index: number) {
    if (index < 0 || index > this._length)
      throw new Error(`Index ${index} out of bounds`);
  }

  contains(value: T): boolean {
    for (const key in this.data) {
      if (value === this.data[key])
        return true;
    }
    return false;
  }

  get(index: number): T {
    this.assertIndexInBounds(index);
    return this.data[index]!;
  }

  set(index: number, value: T) {
    this.assertIndexInBounds(index);
    this.data[index] = value;
  }

  static of<T>(...initialItems: T[]): MyArray<T> {
    const arr = new MyArray<T>(Math.max(DEFAULT_CAPACITY, initialItems.length));
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
