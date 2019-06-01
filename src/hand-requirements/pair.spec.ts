import { HandClassificationCardPart } from '../model';
import { pair } from './pair';
import { club, heart, diamond, spade } from '../deck';

describe('pair', () => {
  it('does not match when there is no pair', () => {
    const match = pair([ club.two, heart.four, diamond.six, spade.three, club.five ]);
    expect(match).toEqual(false);
  });

  it('matches a pair of cards', () => {
    const match = pair([ club.two, heart.four, diamond.four, spade.three, club.five ]) as HandClassificationCardPart;
    expect(match.scoringCards).toEqual([heart.four]);
  });

  it('matches the highest valued pair of cards', () => {
    const match = pair([ club.two, heart.two, diamond.four, spade.three, club.three ]) as HandClassificationCardPart;
    expect(match.scoringCards).toEqual([spade.three]);
  });

  it('matches a pair of aces given aces and kings', () => {
    const match = pair([ club.ace, heart.two, diamond.ace, spade.king, club.king ]) as HandClassificationCardPart;
    expect(match.scoringCards).toEqual([club.ace]);
  });

  it('matches the non-pair cards in descending order as the kicker when there are two pairs', () => {
    const match = pair([ club.ace, heart.two, diamond.ace, spade.king, club.king ]) as HandClassificationCardPart;
    expect(match.kicker).toEqual([ spade.king, club.king, heart.two  ]);
  });

  it('matches the non-pair cards in descending order as the kicker when there is one pair', () => {
    const match = pair([ club.ace, heart.two, diamond.six, spade.king, club.king ]) as HandClassificationCardPart;
    expect(match.kicker).toEqual([ club.ace, diamond.six, heart.two  ]);
  });
});
