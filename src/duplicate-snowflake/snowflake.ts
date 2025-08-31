export type SixNumbers = [number, number, number, number, number, number];

export class Snowflake {
  readonly points: SixNumbers;
  static readonly POINTS_PER_SNOWFLAKE: number = 6;

  constructor(points: SixNumbers) {
    this.points = points;
  }

  logPoints() {
    console.log(this.points);
  }
}
