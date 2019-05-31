import * as model from './model';
import { Suit } from './suit';
import { Card } from './card';
import { parseGameBoard } from './parse-game-board';

describe('parseGameBoard', () => {
  it('is assignable to model.ParseGameBoard', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const typeCheck: model.ParseGameBoard = parseGameBoard;
  });

  it('parses the list of community cards', () => {
    const spadeKing = new Card(Suit.Spades, 13);
    const diamondAce = new Card(Suit.Diamonds, 1);
    const heartThree = new Card(Suit.Hearts, 3);
    const clubSeven = new Card(Suit.Clubs, 7);
    const diamondTen = new Card(Suit.Diamonds, 10);
    const board = parseGameBoard('KS AD 3H 7C TD');
    expect(board).toEqual({
      communityCards: [spadeKing, diamondAce, heartThree, clubSeven, diamondTen],
      playerHands: [],
    });
  
  });
});
