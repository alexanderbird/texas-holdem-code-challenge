import { Hand, HandClassification } from './model';
import { HandType } from './hand-type';
import { Card } from './card';
import { Suit } from './suit';
import { club, heart, diamond, spade } from './deck';

describe('HandType', () => {
  let requirement: jasmine.Spy;
  let hand: Hand;

  beforeEach(() => {
    hand = [ club.two, heart.three, spade.nine, diamond.three, diamond.king ];
    requirement = jasmine.createSpy('requirement');
  });

  describe('matches', () => {
    it('returns false if the hand does not match the requirement', () => {
      requirement.and.returnValue(false);
      const handType = new HandType('Foo', 3, requirement);
      expect(handType.matches(hand)).toEqual(false);
    });

    it('returns a truthy value if the hand matches the requirement', () => {
      requirement.and.returnValue({ scoringCards: [], kicker: [] });
      const handType = new HandType('Foo', 3, requirement);
      expect(handType.matches(hand)).toBeTruthy();
    });

    it('passes the hand to the requirement', () => {
      requirement.and.returnValue({ scoringCards: [], kicker: [] });
      const handType = new HandType('Foo', 3, requirement);
      handType.matches(hand);
      expect(requirement).toHaveBeenCalledTimes(1);
      expect(requirement).toHaveBeenCalledWith(hand);
    });

    describe('returns HandClassification', () => {
      describe('serializeForHumans', () => {
        it('includes the name and scoring cards\' names when the precision is 0');
        it('includes the name and scoring cards\' names when the precision is 1 and there are no kickers');
        it('includes the name, scoring cards\' names, and the first kicker name when the precision is 1 and there are many kickers');
        it('includes the name, scoring cards\' names, and the first kicker name when the precision is 2 and there is one kicker');
        it('includes the name, scoring cards\' names, and the first two kickers\' names when the precision is 2 and ther are many kickers');
      });

      describe('serializeToSort', () => {
        [
          { expected: '111111' ,  rank: 1  ,  scoringCards: [1,1]  ,  kicker: [1,1,1] },
          { expected: '999999' ,  rank: 9  ,  scoringCards: [9,9]  ,  kicker: [9,9,9] },
          { expected: '123456' ,  rank: 1  ,  scoringCards: [2,3]  ,  kicker: [4,5,6] },
          { expected: '1'      ,  rank: 1  ,  scoringCards: []     ,  kicker: [] },
          { expected: 'f9b9ac' ,  rank: 15 ,  scoringCards: [9,11] ,  kicker: [9,10,12] },
        ].forEach(({ expected, rank, scoringCards, kicker }) => {
          it(`returns '${expected}' given ${JSON.stringify({ rank, scoringCards, kicker })}`, () => {
            const handType = new HandType('', rank, requirement);
            requirement.and.returnValue({
              scoringCards: scoringCards.map(value => ({ value })),
              kicker: kicker.map(value => ({ value })),
            });
            const classification = handType.matches([]) as HandClassification;
            expect(classification.serializeToSort()).toEqual(expected);
          });
        });

        describe('ensures numbers within one base-16 hexit', () => {
          it('throws if the rank is more than 15', () => {
            const handType = new HandType('', 16, requirement);
            requirement.and.returnValue({ scoringCards: [13], kicker: [13] });
            const expected = /Unsupported HandClassification: rank of 16 is greater than one hexit \(15\)/;
            expect(() => handType.matches([])).toThrowError(expected);
          });

          it('throws if one of the scoring cards has a value greater than 15', () => {
            const handType = new HandType('', 15, requirement);
            const impossible = new Card(Suit.Clubs, 14);
            requirement.and.returnValue({ scoringCards: [club.two, impossible], kicker: [club.three] });
            const expected = /Impossible card: 14 of Clubs/;
            expect(() => handType.matches([])).toThrowError(expected);
          });

          it('throws if one of the kicker cards has a value greater than 15', () => {
            const handType = new HandType('', 15, requirement);
            const impossible = new Card(Suit.Spades, 14);
            requirement.and.returnValue({ scoringCards: [club.two], kicker: [club.three, impossible] });
            const expected = /Impossible card: 14 of Spades/;
            expect(() => handType.matches([])).toThrowError(expected);
          });
        });
      });
    });
  });
});

