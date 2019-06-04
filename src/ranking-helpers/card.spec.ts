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

  describe('greaterThan', () => {
    [
      { expected: 1  , left: 3  , right: 4 }  ,
      { expected: 0  , left: 3  , right: 3 }  ,
      { expected: -1 , left: 3  , right: 2 }  ,
      { expected: 0  , left: 1  , right: 1 }  ,
      { expected: -1 , left: 1  , right: 2 }  ,
      { expected: -1 , left: 1  , right: 13 } ,
      { expected: 1  , left: 13 , right: 1 }  ,
      { expected: 1  , left: 2  , right: 1 }  ,
    ].forEach(({ expected, left, right }) => it(`returns ${expected} when called on ${left} with argument ${right}`, () => {
      const leftCard = new Card(Suit.Clubs, left);
      const rightCard = new Card(Suit.Clubs, right);
      expect(leftCard.compareTo(rightCard)).toEqual(expected as -1 | 0 | 1);
    }));
  });
});
