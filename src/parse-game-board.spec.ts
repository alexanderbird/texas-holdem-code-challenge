import * as model from './model';
import { club, heart, diamond, spade } from './deck';
import { parseGameBoard } from './parse-game-board';

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

  it('parses the first player name and hole cards', () => {
    const board = parseGameBoard('AC AH AD AS 2C\nJohn 9H 7S');
    expect(board).toEqual({
      communityCards: jasmine.any(Array) as any,
      playerHands: [{
        player: { name: 'John' },
        hand: [ heart.nine, spade.seven ],
      }]
    });
  });

  it('parses multiple players', () => {
    const board = parseGameBoard('AC AH AD AS 2C\nPeter 4D 7D\nSusan 4S 4C\nLucy QH KC\nEdmund 2D AS');
    expect(board).toEqual({
      communityCards: jasmine.any(Array) as any,
      playerHands: [
        {
          player: { name: 'Peter' },
          hand: [ diamond.four, diamond.seven ],
        },
        {
          player: { name: 'Susan' },
          hand: [ spade.four, club.four ],
        },
        {
          player: { name: 'Lucy' },
          hand: [ heart.queen, club.king ],
        },
        {
          player: { name: 'Edmund' },
          hand: [ diamond.two, spade.ace ],
        },
      ]
    });
  });

  it(`parses the game board correctly when tabs are used instead of spaces`, () => {
    const board = parseGameBoard('2C	2H	2D	2S	3C\nCordell	3H	3D');
    expect(board).toEqual({
      communityCards: [ club.two, heart.two, diamond.two, spade.two, club.three ],
      playerHands: [
        {
          player: { name: 'Cordell' },
          hand: [ heart.three, diamond.three ],
        },
      ]
    });
  });

});
