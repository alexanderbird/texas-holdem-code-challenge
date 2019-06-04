import { GameBoard, PlayerHand } from './model';
import { Card } from './card';
import { Suit } from './suit';

const acceptableWhitespaceDividers = /[ \t]/g;

function textToValue(character: string): number {
  return {
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 1,
  }[character] || parseInt(character);
}

function textToSuit(character: string): Suit {
  return {
    C: Suit.Clubs,
    H: Suit.Hearts,
    D: Suit.Diamonds,
    S: Suit.Spades,
  }[character];
}

function parseCardText(text: string): Card {
  const value = textToValue(text[0]);
  const suit = textToSuit(text[1]);
  return new Card(suit, value);
}

function parsePlayerRow(raw: string): PlayerHand {
  const [
    name,
    ...rawCards
  ] = raw.split(acceptableWhitespaceDividers);
  return {
    player: { name },
    hand: rawCards.map(parseCardText),
  };
}

export function parseGameBoard(raw: string): GameBoard {
  const [
    communityRow,
    ...playerRows
  ]= raw.split('\n');
  const communityCards = communityRow
    .split(acceptableWhitespaceDividers)
    .map(parseCardText);

  return {
    communityCards,
    playerHands: playerRows.map(parsePlayerRow),
  };
}

