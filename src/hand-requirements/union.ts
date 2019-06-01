import { Hand, HandMatch, HandRequirement } from '../model';

export function union(first: HandRequirement, second: HandRequirement): HandRequirement {
  return function(hand: Hand): HandMatch {
    const firstMatch = first(hand);
    if(!firstMatch) return false;
    const secondMatch = second(firstMatch.kicker);
    if(!secondMatch) return false;
    return {
      keyCards: [ ...firstMatch.keyCards, ...secondMatch.keyCards ],
      kicker: [ ...secondMatch.kicker ],
    };
  };
}
