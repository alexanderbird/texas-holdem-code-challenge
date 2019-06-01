import { Hand, PossibleHandMatch, HandRequirement } from '../model';

export function union(first: HandRequirement, second: HandRequirement): HandRequirement {
  return function(hand: Hand): PossibleHandMatch {
    const firstMatch = first(hand);
    if(!firstMatch) return false;
    const secondMatch = second(firstMatch.kicker);
    if(!secondMatch) return false;
    return {
      scoringCards: [ ...firstMatch.scoringCards, ...secondMatch.scoringCards ],
      kicker: [ ...secondMatch.kicker ],
    };
  };
}
