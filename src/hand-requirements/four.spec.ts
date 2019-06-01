import { HandScoreCardPart } from '../model';
import { four } from './four';
import { club, heart, diamond, spade } from '../deck';

describe('four', () => {
  it('does not match when there is a pair of cards', () => {
    const match = four([ club.two, heart.four, diamond.two, spade.two, club.five ]);
    expect(match).toEqual(false);
  });

  it('matches four cards with the same value', () => {
    const match = four([ club.two, heart.four, diamond.two, spade.two, heart.two ]) as HandScoreCardPart;
    expect(match.keyCards).toEqual([ club.two ]);
  });

  it('matches the extra cards in descending order as the kicker', () => {
    const match = four([ club.two, heart.four, diamond.two, spade.two, heart.two ]) as HandScoreCardPart;
    expect(match.kicker).toEqual([ heart.four ]);
  });
});
