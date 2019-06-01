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

export type HandMatch = false | HandClassificationCardPart;

export interface HandRequirement {
  (hand: Hand): HandMatch;
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

/*
Types of HandRequirements: 
    highCard(Hand)  { highest card in the set }
    pair(Hand)      { two cards same number }
    twoPair(Hand)   { !four(Hand) && UnionHandRequirement(pair, pair, 'Two Pair')(Hand) }
    three(Hand)     { three cards same number }

    // there is a three, and a pair in the kicker of the three
    fullHouse(Hand) { UnionHandRequirement(three, pair, 'Full House')(Hand) }
    four(Hand)      { four cards same number }
    flush(Hand)     { every card the same suit }
    straight(Hand)  {
      when sorted by number, increases in numerical sequence without gaps
    }
    straightFlush   { straight(Hand) && flush(Hand) }
    royalFlush      { straightFlush(Hand) && highCard(Hand).scoringCard === Ace }
*/
