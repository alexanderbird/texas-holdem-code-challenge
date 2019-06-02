import {
  Hand,
  HandClassification as HandClassificationInterface,
  HandClassificationCardPart,
  HandRequirement,
  HandType as HandTypeInterface,
} from './model';

class HandClassification implements HandClassificationInterface {
  private values: number[];
  constructor(rank: number, { scoringCards, kicker }: HandClassificationCardPart) {
    if(rank > 15) throw new Error(`Unsupported HandClassification: rank of ${rank} is greater than one hexit (15)`);
    [...scoringCards, ...kicker].forEach(card => {
      if(card.value > 13) throw new Error(`Impossible card: ${card}`);
    });
    this.values = [
      rank,
      ...scoringCards.map(c => c.value),
      ...kicker.map(c => c.value),
    ];
  }

  public serializeToSort(): string {
    return this.values.map(n => n.toString(16)).join('');
  }

  public serializeForHumans(numberOfKickerCards: number): string {
    return '';
  }
}

export class HandType implements HandTypeInterface {
  private requirement: HandRequirement;
  private rank: number;

  constructor(name: string, rank: number, requirement: HandRequirement) {
    this.rank = rank;
    this.requirement = requirement;
  }

  public matches(hand: Hand): false | HandClassification {
    const match = this.requirement(hand);
    if(!match) return false;
    return new HandClassification(this.rank, match);
  }
}

