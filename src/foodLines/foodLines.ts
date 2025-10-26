export class FoodLine {
  lines: number[];
  constructor(initialLines: number[]) {
    this.lines = initialLines;
  }

  getSmallestLineIndex(): number {
    let smallestLineIndex = 0;
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i] < this.lines[smallestLineIndex]) {
        smallestLineIndex = i;
      }
    }
    return smallestLineIndex;
  }

  receivePeople(newPeople: number): void {
    for (let i = 0; i < newPeople; i++) {
      const smallestLineIndex = this.getSmallestLineIndex();
      this.lines[smallestLineIndex]++;
    }
  }
}
