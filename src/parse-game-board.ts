import { GameBoard } from './model';
import { Card } from './card';
import { Suit } from './suit';

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

function textToCard(text: string): Card {
  const value = textToValue(text[0]);
  const suit = textToSuit(text[1]);
  return new Card(suit, value);
}

export function parseGameBoard(raw: string): GameBoard {
  const communityCards = raw.split(' ').map(textToCard);
  return {
    communityCards,
    playerHands: [],
  };
}

