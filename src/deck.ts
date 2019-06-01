import { Card } from './card';
import { Suit } from './suit';

const suits = {
  club: Suit.Clubs,
  heart: Suit.Hearts,
  diamond: Suit.Diamonds,
  spade: Suit.Spades,
};
const values = {
  ace: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  jack: 11,
  queen: 12,
  king: 13,
};
type Deck = {
  [suit in keyof typeof suits]: {
    [value in keyof typeof values]: Card
  }
}

function generateDeck(): Deck {
  const deck = {};
  Object.entries(suits).forEach(([suitName, suit]) => {
    const suitCards = {};
    Object.entries(values).forEach(([valueName, value]) => {
      suitCards[valueName] = new Card(suit, value);
    });
    deck[suitName] = suitCards;
  });
  return deck as any as Deck;
}

export const { club, heart, diamond, spade } = generateDeck();
