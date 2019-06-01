import { Hand, HandMatch } from '../model';
import { Card } from '../card';

export function three(hand: Hand): HandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  let keyCard;
  for(let i = 0; i < sortedHand.length - 2; i++) {
    const current = sortedHand[i];
    const next = sortedHand[i + 1];
    const afterNext = sortedHand[i + 2];
    if(current.value === next.value && current.value === afterNext.value) {
      if(!keyCard) {
        keyCard = current;
      } else {
        keyCard = current.compareTo(keyCard) ? keyCard : current;
      }
      // No need to check the next two, we already know it has the same value as
      // this one
      i += 2;
    }
  }
  if(!keyCard) return false;
  return {
    keyCards: [keyCard],
    kicker: sortedHand.filter(card => card.value !== keyCard.value),
  };
}
