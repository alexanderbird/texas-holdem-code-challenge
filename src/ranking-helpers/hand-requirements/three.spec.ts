import { HandMatch } from '../../model';
import { three } from './three';
import { club, heart, diamond, spade } from '../fixtures/deck';

describe('three', () => {
  it('does not match when there is a pair of cards', () => {
    const match = three([ club.two, heart.four, diamond.two, spade.three, club.five ]);
    expect(match).toEqual(false);
  });

  it('matches three cards with the same value', () => {
    const match = three([ club.two, heart.four, diamond.two, spade.two, club.five ]);
    expect((match as HandMatch).scoringCards).toEqual([ club.two ]);
  });

  it('matches the extra cards in descending order as the kicker', () => {
    const match = three([ club.two, heart.four, diamond.two, spade.two, club.five ]);
    expect((match as HandMatch).kicker).toEqual([ club.five, heart.four ]);
  });
});
