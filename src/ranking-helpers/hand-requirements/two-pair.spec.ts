import { HandMatch } from '../../model';
import { twoPair } from './two-pair';
import { club, heart, diamond, spade } from '../fixtures/deck';

describe('twoPair', () => {
  it('does not match when there is no pair', () => {
    const match = twoPair([ club.two, heart.four, diamond.three, spade.seven, club.nine ]);
    expect(match).toEqual(false);
  });

  it('does not match when there is one pair', () => {
    const match = twoPair([ club.two, heart.seven, diamond.three, spade.seven, club.nine ]);
    expect(match).toEqual(false);
  });

  it('matches the first card of each pair as the scoring cards when there are two pairs', () => {
    const match = twoPair([ club.two, heart.seven, diamond.nine, spade.seven, club.nine ]);
    expect((match as HandMatch).scoringCards).toEqual([ diamond.nine, heart.seven ]);
  });

  it('matches the fifth card as the kicker when there are two pairs', () => {
    const match = twoPair([ club.two, heart.seven, diamond.nine, spade.seven, club.nine ]);
    expect((match as HandMatch).kicker).toEqual([ club.two ]);
  });
});
