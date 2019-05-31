import * as model from './model';
import { Deck } from './deck';
import { parseGameBoard } from './parse-game-board';

const { club, heart, diamond, spade } = Deck;

describe('parseGameBoard', () => {
  it('is assignable to model.ParseGameBoard', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const typeCheck: model.ParseGameBoard = parseGameBoard;
  });

  [
    {
      raw: 'KS AD 3H 7C TD',
      communityCards: [ spade.king, diamond.ace, heart.three, club.seven, diamond.ten ],
    },
    {
      raw: '2D JH QS TD KC',
      communityCards: [ diamond.two, heart.jack, spade.queen, diamond.ten, club.king ],
    },
    {
      raw: '4C 5C 6S 8D 9H',
      communityCards: [ club.four, club.five, spade.six, diamond.eight, heart.nine ],
    },
  ].forEach(({ raw, communityCards }) => {
    it(`parses the community cards '${raw}' as: ${communityCards.join(', ')}`, () => {
      const board = parseGameBoard(raw);
      expect(board).toEqual({
        communityCards,
        playerHands: [],
      });
    });
  });
});
