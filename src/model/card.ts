import { Suit } from './suit';

export interface Card {
  value: number;
  name: string;
  suit: Suit;
}
