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

export interface HandClassification {
  cardPart: HandClassificationCardPart;
  rank: number;
  description: string;

  // result must be compatible with Array#sort
  compareTo(other: HandClassification): -1 | 0 | 1;

  // based on description and all of cardPart
  toString(): string;
}

export interface HandType {
  name: string;
  rank: number;
  requirement: HandRequirement;
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
