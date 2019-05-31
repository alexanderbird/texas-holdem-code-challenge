export interface Player {
  name: string;
}

export enum Suit {
  Hearts = 'Hearts',
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Spades = 'Spades',
}

export interface Card {
  value: number;
  suit: Suit;
  // 2 is greater than 1, etc., 1 (Ace) is greater than 13 (King)
  greaterThan(other: Card): boolean;
  // e.g. 12 => Queen
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

export interface GeneratePossibleHands {
  // Returns all the possible hands for that player for the given game board
  (gameBoard: GameBoard, player: Player): Hand[];
}

export interface HandScoreCardPart {
  keyCards: Hand;
  kicker: Hand;
}

export interface HandRequirement {
  (hand: Hand): false | HandScoreCardPart;
}

export interface HandScore {
  cardPart: HandScoreCardPart;
  rank: number;
  description: string;

  // result must be compatible with Array#sort
  compareTo(other: HandScore): -1 | 0 | 1;

  // based on description and all of cardPart
  toString(): string;
}

export interface HandType {
  name: string;
  rank: number;
  requirement: HandRequirement;
  // If the hand matches the HandRequirement, augment the HandScoreCardPart
  // with the rank and name. 
  // To generate the HandScore description, HandType will need to use the name
  // property and possibly some combination of keyCards' suits or values.
  matches(hand: Hand): false | HandScore;
}

export interface PlayerScore {
  player: Player;
  score: HandScore;
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
    royalFlush      { straightFlush(Hand) && highCard(Hand).keyCard === Ace }

UnionHandRequirement(first: HandRequirement, second: HandRequirement, name: string): HandRequirement {
  1. get HandRequirementResult from first
  2. if false, return false
  3. get HandRequirementResult from second, passing the kicker in as the Hand
  4. if false, return false
  5. return a new HandSummary {
    handTypeName: name
    keyCards: keyCards from first and second
    kicker: kicker from second
  }
}
*/
