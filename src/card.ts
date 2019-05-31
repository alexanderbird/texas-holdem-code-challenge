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
  public valueString(): string { return ''; }
}
