import { Suit } from './suit';
export interface Player {
  name: string;
}

export interface Card {
  value: number;
  suit: Suit;
  compareTo(other: Card): -1 | 0 | 1;
  valueString(): string;
}

export type Hand = Card[];

export interface PlayerHand {
  player: Player;
  hand: Hand;
}

export interface GameBoard {
  communityCards: Card[];
  playerHands: PlayerHand[];
}

export interface HandClassificationCardPart {
  scoringCards: Hand;
  kicker: Hand;
}

export type HandMatch = HandClassificationCardPart;
export type PossibleHandMatch = false | HandMatch;

export interface HandRequirement {
  (hand: Hand): PossibleHandMatch;
}

export interface HandComparisonResult {
  relationship: -1 | 0 | 1;
  kickersUsed: number;
}

export interface HandClassification {
  // to constructor:
  //   description: string;
  //   rank: number;
  //   cardPart: HandClassificationCardPart;

  // validate that all numbers are less than 1 hexit, base 16 encode in order:
  // rank, scoringCards, kicker
  serializeToSort(): string;

  // based on description and all of cardPart. 
  // numberOfKickerCards tells how much detail to add
  serializeForHumans(numberOfKickerCards: number): string;
}

export interface HandType {
  // to constructor:
  //   name: string;
  //   rank: number;
  //   requirement: HandRequirement;

  // If the hand matches the HandRequirement, augment the HandClassificationCardPart
  // with the rank and name. 
  // To generate the HandClassification description, HandType will need to use the name
  // property and possibly some combination of scoringCards' suits or values.
  matches(hand: Hand): false | HandClassification;
}

export interface PlayerScore {
  player: Player;
  score: HandClassification;
  // based on the player name and the score's string representation
  toString(): string;
}

export interface ParseGameBoard {
  (raw: string): GameBoard;
}

export interface SerializeGameResults {
  (results: PlayerScore[]): string;
}
