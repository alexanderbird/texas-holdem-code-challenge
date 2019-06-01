import { Suit } from './Suit';
export class Card {
  public constructor(
    public readonly suit: Suit,
    public readonly value: number
  ) {
  }

  public compareTo(other: Card): -1 | 0 | 1 {
    if(this.value === other.value) return 0;
    if(this.value === 1) return -1;
    if(other.value === 1) return 1;
    if(this.value < other.value) return 1;
    if(this.value > other.value) return -1;
  }
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
