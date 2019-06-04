import { HandMatch } from '../../model';
import { highCard } from './high-card';
import { club, heart, diamond, spade } from '../fixtures/deck';

describe('highCard', () => {
  it('matches the card with the highest value when they are all different', () => {
    const match = highCard([ club.two, heart.four, diamond.six, spade.three, club.five ]);
    expect((match as HandMatch).scoringCards).toEqual([ diamond.six ]);
  });

  it('matches the ace given 10, J, Q, K, A', () => {
    const match = highCard([ diamond.ten, spade.king, club.jack, heart.ace, diamond.queen ]);
    expect((match as HandMatch).scoringCards).toEqual([ heart.ace ]);
  });

  it('matches the rest of the cards in descending order as the kicker', () => {
    const match = highCard([ club.two, heart.four, diamond.six, spade.three, club.five ]);
    expect((match as HandMatch).kicker).toEqual([ club.five, heart.four, spade.three, club.two ]);
  });
});
