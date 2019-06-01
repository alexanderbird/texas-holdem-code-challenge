import { HandScoreCardPart } from '../model';
import { highCard } from './high-card';
import { Deck } from '../deck';

const { club, heart, diamond, spade } = Deck;

describe('highCard', () => {
  it('matches the card with the highest value when they are all different', () => {
    const match = highCard([ club.two, heart.four, diamond.six, spade.three, club.five ]) as HandScoreCardPart;
    expect(match.keyCards).toEqual([ diamond.six ]);
  });

  it('matches the ace given 10, J, Q, K, A', () => {
    const match = highCard([ diamond.ten, spade.king, club.jack, heart.ace, diamond.queen ]) as HandScoreCardPart;
    expect(match.keyCards).toEqual([ heart.ace ]);
  });

  it('matches the rest of the cards in descending order as the kicker', () => {
    const match = highCard([ club.two, heart.four, diamond.six, spade.three, club.five ]) as HandScoreCardPart;
    expect(match.kicker).toEqual([ club.five, heart.four, spade.three, club.two ]);
  });
});
