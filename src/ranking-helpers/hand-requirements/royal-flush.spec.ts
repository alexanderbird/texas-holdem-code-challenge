import { Hand } from '../../model';
import { club, heart, diamond, spade } from '../fixtures/deck';
import { royalFlush } from './royal-flush';
import * as straightFlushModule from './straight-flush';

describe('royalFlush', () => {
  let hand: Hand;
  let straightFlush: jasmine.Spy;

  beforeEach(() => {
    straightFlush = spyOn(straightFlushModule, 'straightFlush');
    hand = [ spade.six, heart.jack, club.two, club.ace, diamond.seven ];
  });

  it('returns false when straightFlush returns false', () => {
    straightFlush.and.returnValue(false);
    expect(royalFlush(hand)).toEqual(false);
  });

  it('returns false when straightFlush matches but the scoring card is not an ace', () => {
    straightFlush.and.returnValue({ scoringCards: [ club.king ] });
    expect(royalFlush(hand)).toEqual(false);
  });

  it('matches when the scoring card is an ace', () => {
    straightFlush.and.returnValue({ scoringCards: [ club.ace ] });
    expect(royalFlush(hand)).toBeTruthy();
  });

  it('matches with no scoring cards or kicker returns when it matches', () => {
    const straightFlushMatch = { scoringCards: [ spade.ace ], kicker: [] };
    straightFlush.and.returnValue(straightFlushMatch);
    expect(royalFlush(hand)).toEqual({ scoringCards: [], kicker: [] });
  });

  it('passes the hand to the straightFlush requirement', () => {
    royalFlush(hand);
    expect(straightFlush).toHaveBeenCalledTimes(1);
    expect(straightFlush).toHaveBeenCalledWith(hand);
  });

  it('matches club 10,J,K,Q,A', () => {
    straightFlush.and.callThrough();
    const match = royalFlush([ club.jack, club.king, club.ten, club.ace, club.queen ]);
    expect(match).toEqual({ scoringCards: [], kicker: [] });
  });

  it('matches spade 10,J,K,Q,A', () => {
    straightFlush.and.callThrough();
    const match = royalFlush([ spade.ace, spade.king, spade.ten, spade.queen, spade.jack ]);
    expect(match).toEqual({ scoringCards: [], kicker: [] });
  });

  it('does not match A,2,3,4,5', () => {
    straightFlush.and.callThrough();
    const match = royalFlush([ diamond.three, diamond.ace, diamond.four, diamond.five, diamond.two ]);
    expect(match).toEqual(false);
  });
});
