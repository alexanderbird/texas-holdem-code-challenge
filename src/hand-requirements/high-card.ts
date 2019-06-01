import { Hand, PossibleHandMatch } from '../model';
import { Card } from '../card';

export function highCard(hand: Hand): PossibleHandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  const [ high, ...kicker ] = sortedHand;
  return {
    scoringCards: [ high ],
    kicker,
  };
}
