import { HandMatch } from '../../model';
import { flush } from './flush';
import { club, heart, diamond, spade } from '../fixtures/deck';

describe('flush', () => {
  it('does not match one card is of a different suit', () => {
    const match = flush([ club.two, club.four, club.three, diamond.two, club.five ]);
    expect(match).toEqual(false);
  });

  it('matches the highest card as the scoring card when all cards have the same suit and the first card is the highest', () => {
    const match = flush([ club.king, club.four, club.three, club.two, club.five ]);
    expect((match as HandMatch).scoringCards).toEqual([ club.king ]);
  });

  it('matches the highest card as the scoring card when all cards have the same suit and the high card is in the middle', () => {
    const match = flush([ spade.four, spade.three, spade.two, spade.king, spade.five ]);
    expect((match as HandMatch).scoringCards).toEqual([ spade.king ]);
  });

  it('returns an empty kicker when it matches', () => {
    const match = flush([ heart.four, heart.three, heart.two, heart.king, heart.five ]);
    expect((match as HandMatch).kicker).toEqual([]);
  });
});
