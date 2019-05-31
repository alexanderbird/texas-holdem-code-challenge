import { Suit } from './Suit';
export class Card {
  public constructor(
    public readonly suit: Suit,
    public readonly value: number
  ) {
  }
  // 2 is greater than 1, etc., 1 (Ace) is greater than 13 (King)
  public greaterThan(): boolean { return false; }
  // e.g. 12 => Queen
  public valueString(): string {
    return {
      1: 'Ace',
      11: 'Jack',
      12: 'Queen',
      13: 'King',
    }[this.value] || this.value.toString();
  }

  public toString() {
    return `${this.valueString()} of ${this.suit}`;
  }
}
