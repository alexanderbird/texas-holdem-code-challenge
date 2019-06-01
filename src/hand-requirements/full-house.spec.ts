import { HandScoreCardPart } from '../model';
import { fullHouse } from './full-house';
import { club, heart, diamond, spade } from '../deck';

describe('fullHouse', () => {
  it('does not match two pairs', () => {
    const match = fullHouse([ club.two, heart.seven, diamond.nine, spade.seven, club.nine ]);
    expect(match).toEqual(false);
  }); 

  it('matches the top card of the three and the pair as the scoring cards', () => {
    const match = fullHouse([ heart.seven, diamond.king, spade.seven, club.seven, club.king ]);
    expect((match as HandScoreCardPart).scoringCards).toEqual([ heart.seven, diamond.king ]);
  });

  it('has no kicker when it matches', () => {
    const match = fullHouse([ heart.seven, diamond.king, spade.seven, club.seven, club.king ]);
    expect((match as HandScoreCardPart).kicker).toEqual([]);
  });
});
