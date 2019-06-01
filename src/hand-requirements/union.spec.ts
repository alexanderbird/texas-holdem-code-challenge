import { union } from './union';
import { HandRequirement, HandScoreCardPart } from '../model';
import { Deck } from '../deck';

const { club, heart, diamond, spade } = Deck;

describe('union', () => {
  let requirement: HandRequirement;
  let first: jasmine.Spy;
  let second: jasmine.Spy;
  let dummyHand: any;

  beforeEach(() => {
    first = jasmine.createSpy('first');
    second = jasmine.createSpy('second');
    requirement = union(first, second);
    dummyHand = [{ dummy: true}];
  });

  it('returns false if the first requirement fails', () => {
    first.and.returnValue(false);
    second.and.returnValue({});
    expect(requirement(dummyHand)).toEqual(false);
  });

  it('returns false if the second requirement fails', () => {
    first.and.returnValue({});
    second.and.returnValue(false);
    expect(requirement(dummyHand)).toEqual(false);
  });

  it('returns the keyCards of the first and second requirements in order', () => {
    first.and.returnValue({ keyCards: [ spade.king, heart.four ], kicker: [] });
    second.and.returnValue({ keyCards: [ diamond.ace ], kicker: [] });
    const match = requirement(dummyHand) as HandScoreCardPart;
    expect(match.keyCards).toEqual([ spade.king, heart.four, diamond.ace ]);
  });

  it('returns the kicker of the second requirement', () => {
    first.and.returnValue({ keyCards: [ ], kicker: [ club.two ] });
    second.and.returnValue({ keyCards: [ ], kicker: [ spade.jack, spade.queen ] });
    const match = requirement(dummyHand) as HandScoreCardPart;
    expect(match.kicker).toEqual([ spade.jack, spade.queen ]);
  });

  it('passes the hand to the first requirement', () => {
    requirement(dummyHand);
    expect(first).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledWith(dummyHand);
  });

  it('passes the kicker of the first requirement as the hand for the second requirement', () => {
    const firstKicker = [ diamond.nine, diamond.ace ];
    first.and.returnValue({ keyCards: [], kicker: firstKicker });
    requirement(dummyHand);
    expect(second).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledWith(firstKicker);
  });
});
