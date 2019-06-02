import {
  Hand,
  HandClassification as HandClassificationInterface,
  HandClassificationCardPart,
  HandRequirement,
  HandType as HandTypeInterface,
} from './model';

class HandClassification implements HandClassificationInterface {
  private scoringCards: Hand;
  private kicker: Hand;
  constructor(
    private name: string,
    private rank: number,
    { scoringCards, kicker }: HandClassificationCardPart
  ) {
    this.scoringCards = scoringCards;
    this.kicker = kicker;
    this.checkValuesAreBelowLimit();
  }

  public serializeToSort(): string {
    const values = [
      this.rank,
      ...this.scoringCards.map(c => c.value),
      ...this.kicker.map(c => c.value),
    ];
    const hexValues = values.map(n => n.toString(16));
    return hexValues.join('');
  }

  public serializeForHumans(numberOfKickerCards: number): string {
    const scoringCardsString = this.scoringCards.map(c => c.valueString()).join(' ');
    const relevantKicker = this.kicker.slice(0, numberOfKickerCards);
    let kickerString = '';
    if(relevantKicker.length) {
      kickerString = ` (kicker ${relevantKicker.map(c => c.valueString()).join(' ')})`;
    }
    return `${this.name} ${scoringCardsString}${kickerString}`;
  }

  private checkValuesAreBelowLimit(): void {
    if(this.rank > 15) throw new Error(`Unsupported HandClassification: rank of ${this.rank} is greater than one hexit (15)`);
    [...this.scoringCards, ...this.kicker].forEach(card => {
      if(card.value > 13) throw new Error(`Impossible card: ${card}`);
    });
  }
}

export class HandType implements HandTypeInterface {
  constructor(
    private name: string,
    private rank: number,
    private requirement: HandRequirement,
  ) { }

  public matches(hand: Hand): false | HandClassification {
    const match = this.requirement(hand);
    if(!match) return false;
    return new HandClassification(this.name, this.rank, match);
  }
}

