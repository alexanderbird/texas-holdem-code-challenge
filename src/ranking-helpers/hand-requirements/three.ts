import { Hand, PossibleHandMatch } from '../../model';
import { Card } from '../card';

export function three(hand: Hand): PossibleHandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  let scoringCard;
  for(let i = 0; i < sortedHand.length - 2; i++) {
    const current = sortedHand[i];
    const next = sortedHand[i + 1];
    const afterNext = sortedHand[i + 2];
    if(current.value === next.value && current.value === afterNext.value) {
      if(!scoringCard) {
        scoringCard = current;
      } else {
        scoringCard = current.compareTo(scoringCard) ? scoringCard : current;
      }
      // No need to check the next two, we already know it has the same value as
      // this one
      i += 2;
    }
  }
  if(!scoringCard) return false;
  return {
    scoringCards: [scoringCard],
    kicker: sortedHand.filter(card => card.value !== scoringCard.value),
  };
}
