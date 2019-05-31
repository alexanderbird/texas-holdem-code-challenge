import { Card } from './card';
import { Suit } from './suit';

describe('Card', () => {
  [
    [ new Card(Suit.Clubs, 1), 'Ace', 'Ace of Clubs' ],
    [ new Card(Suit.Hearts, 2), '2', '2 of Hearts' ],
    [ new Card(Suit.Diamonds, 11), 'Jack', 'Jack of Diamonds' ],
    [ new Card(Suit.Spades, 12), 'Queen', 'Queen of Spades' ],
    [ new Card(Suit.Clubs, 13), 'King', 'King of Clubs' ],
  ].forEach(([ card, valueString, name ]: [Card, string, string]) => {
    it(`has a value string of ${valueString} for new Card(${card.suit}, ${card.value})`, () => {
      expect(card.valueString()).toEqual(valueString);
    });

    it(`serializes new Card(${card.suit}, ${card.value}) as '${name}'`, () => {
      expect(card.toString()).toEqual(name);
    });
  });
});
