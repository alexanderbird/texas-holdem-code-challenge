import { HandMatch, Hand } from '../../model';
import { club, heart, diamond, spade } from '../fixtures/deck';
import { straightFlush } from './straight-flush';
import * as straightModule from './straight';
import * as flushModule from './flush';

describe('straightFlush', () => {
  let hand: Hand;
  let straight: jasmine.Spy;
  let flush: jasmine.Spy;

  beforeEach(() => {
    straight = spyOn(straightModule, 'straight');
    flush = spyOn(flushModule, 'flush');
    hand = [ spade.six, heart.jack, club.two, club.ace, diamond.seven ];
  });

  it('passes a copy of the entire hand to the straight requirement', () => {
    const handSlice = jasmine.createSpy('hand.slice').and.returnValues(hand, []);
    straightFlush({ slice: handSlice } as any as Hand);
    expect(straight).toHaveBeenCalledTimes(1);
    expect(straight).toHaveBeenCalledWith(hand);
  });

  it('passes a copy of the entire hand to the flush requirement', () => {
    const handSlice = jasmine.createSpy('hand.slice').and.returnValues([], hand);
    straightFlush({ slice: handSlice } as any as Hand);
    expect(flush).toHaveBeenCalledTimes(1);
    expect(flush).toHaveBeenCalledWith(hand);
  });

  it('does not match if the straight requirement does not match but the flush requirement does', () => {
    straight.and.returnValue(false);
    flush.and.returnValue({});
    expect(straightFlush(hand)).toEqual(false);
  });

  it('does not match if the flush requirement does not match but the straight requirement does', () => {
    straight.and.returnValue({});
    flush.and.returnValue(false);
    expect(straightFlush(hand)).toEqual(false);
  });

  it('does not match if both the flush and straight requirements do not match', () => {
    straight.and.returnValue(false);
    flush.and.returnValue(false);
    expect(straightFlush(hand)).toEqual(false);
  });

  it('returns the match from the straight requirement if both requirements match', () => {
    const matchFromStraight = { whatever: true } as any as HandMatch;
    straight.and.returnValue(matchFromStraight);
    flush.and.returnValue({});
    expect(straightFlush(hand)).toBe(matchFromStraight);
  });

  it('matches club 6,7,8,9,10', () => {
    straight.and.callThrough();
    flush.and.callThrough();
    const match = straightFlush([ club.six, club.seven, club.ten, club.eight, club.nine ]);
    expect((match as HandMatch).scoringCards).toEqual([ club.ten ]);
  });

  it('does not match club 6,7,8,9,J', () => {
    straight.and.callThrough();
    flush.and.callThrough();
    const match = straightFlush([ club.six, club.seven, club.jack, club.eight, club.nine ]);
    expect(match).toEqual(false);
  });

  it('does not match C6,C7,S8,C9,C10', () => {
    straight.and.callThrough();
    flush.and.callThrough();
    const match = straightFlush([ club.six, club.seven, club.ten, spade.eight, club.nine ]);
    expect(match).toEqual(false);
  });
});
