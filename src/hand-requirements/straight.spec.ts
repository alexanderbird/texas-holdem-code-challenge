import { HandMatch } from '../model';
import { straight } from './straight';
import { club, heart, diamond, spade } from '../deck';

describe('straight', () => {
  it('does not match when there are duplicate numbers', () => {
    const match = straight([ club.four, spade.four, heart.five, diamond.six, club.seven ]);
    expect(match).toEqual(false);
  });

  it('does not match when there is a gap between numbers', () => {
    const match = straight([ club.two, spade.three, heart.five, diamond.six, club.seven ]);
    expect(match).toEqual(false);
  });

  it('matches 2,3,4,5,6 when it starts in decreasing order', () => {
    const match = straight([ club.six, diamond.five, heart.four, spade.three, club.two ]);
    expect((match as HandMatch).scoringCards).toEqual([ club.six ]);
  });

  it('matches 9,T,J,Q,K when it is an haphazard order', () => {
    const match = straight([ club.jack, diamond.nine, heart.queen, spade.ten, club.king ]);
    expect((match as HandMatch).scoringCards).toEqual([ club.king ]);
  });

  it('matches A,2,3,4,5 with the 5 as the scoring card', () => {
    const match = straight([ club.three, diamond.five, heart.ace, spade.two, club.four ]);
    expect((match as HandMatch).scoringCards).toEqual([ diamond.five ]);
  });

  it('does not match A,3,4,5,6', () => {
    const match = straight([ club.three, diamond.five, heart.ace, spade.six, club.four ]);
    expect(match).toEqual(false);
  });

  it('matches T,J,Q,K,A with the ace as the scoring card', () => {
    const match = straight([ club.queen, spade.ace, diamond.king, club.ten, heart.jack ]);
    expect((match as HandMatch).scoringCards).toEqual([ spade.ace ]);
  });

  it('does not match 9,T,J,Q,A', () => {
    const match = straight([ club.queen, spade.ace, diamond.nine, club.ten, heart.jack ]);
    expect(match).toEqual(false);
  });

  it('returns an empty kicker when it matches', () => {
    const match = straight([ heart.four, heart.three, heart.two, heart.six, heart.five ]);
    expect((match as HandMatch).kicker).toEqual([]);
  });
});
