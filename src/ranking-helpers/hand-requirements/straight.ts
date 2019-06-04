import { Hand, PossibleHandMatch } from '../../model';
import { Card } from '../card';

function numbersStepDownByOne(numbers: number[]) {
  let eachStepsDownByOne = true;
  for(let i = 0; i < numbers.length - 1; i++) {
    const step = numbers[i] - numbers[i + 1];
    eachStepsDownByOne = eachStepsDownByOne && step === 1; 
  }
  return eachStepsDownByOne;
}

function straightWithAnAce(sortedHand: Hand): PossibleHandMatch {
  const [ ace, ...rest ] = sortedHand;
  if(!numbersStepDownByOne(rest.map(c => c.value))) return false;
  if(rest[0].value === 5) return {
    scoringCards: [ rest[0] ],
    kicker: [],
  };
  if(rest[0].value === 13) return {
    scoringCards: [ ace ],
    kicker: [],
  };
  return false;
}

function straightWithoutAnAce(sortedHand: Hand): PossibleHandMatch {
  if(!numbersStepDownByOne(sortedHand.map(c => c.value))) return false;
  return {
    scoringCards: [ sortedHand[0] ],
    kicker: [],
  };
}

export function straight(hand: Hand): PossibleHandMatch {
  const sortedHand = hand.sort(Card.sortByValue);
  if(sortedHand[0].value === 1) {
    return straightWithAnAce(sortedHand);
  } else {
    return straightWithoutAnAce(sortedHand);
  }
}
