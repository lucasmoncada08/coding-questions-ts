export class MyArray<T> {
  private readonly items: T[] = [];

  get length(): number {
    return this.items.length;
  }
}
