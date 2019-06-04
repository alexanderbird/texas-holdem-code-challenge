import { Hand, PossibleHandMatch } from '../../model';
import { Card } from '../card';

export function pair(hand: Hand): PossibleHandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  let scoringCard;
  for(let i = 0; i < sortedHand.length - 1; i++) {
    const current = sortedHand[i];
    const next = sortedHand[i + 1];
    if(current.value === next.value) {
      if(!scoringCard) {
        scoringCard = current;
      } else {
        scoringCard = current.compareTo(scoringCard) ? scoringCard : current;
      }
      // No need to check the next one, we already know it has the same value as
      // this one
      i++;
    }
  }
  if(!scoringCard) return false;
  return {
    scoringCards: [scoringCard],
    kicker: sortedHand.filter(card => card.value !== scoringCard.value),
  };
}
