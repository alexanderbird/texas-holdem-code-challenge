import { HandScoreCardPart } from '../model';
import { three } from './three';
import { Deck } from '../deck';

const { club, heart, diamond, spade } = Deck;

describe('three', () => {
  it('does not match when there is a pair of cards', () => {
    const match = three([ club.two, heart.four, diamond.two, spade.three, club.five ]);
    expect(match).toEqual(false);
  });

  it('matches three cards with the same value', () => {
    const match = three([ club.two, heart.four, diamond.two, spade.two, club.five ]) as HandScoreCardPart;
    expect(match.keyCards).toEqual([ club.two ]);
  });

  it('matches the extra cards in descending order as the kicker', () => {
    const match = three([ club.two, heart.four, diamond.two, spade.two, club.five ]) as HandScoreCardPart;
    expect(match.kicker).toEqual([ club.five, heart.four ]);
  });
});
