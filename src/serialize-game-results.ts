import { GameResults, PlayerHandClassification } from './model';

function serializeOneLine(
  { player, handClassification }: PlayerHandClassification,
  rankString: string,
  numberOfRelevantKickers: number
): string {
  return `${rankString} ${player.name} ${handClassification.serializeForHumans(numberOfRelevantKickers)}\n`;
}

interface KickerSummary {
  numberOfRelevantKickers: number;
  isTiedWithNext: boolean;
}

function compareWithSiblings(gameResults: GameResults, i: number): KickerSummary {
  const thisOne = gameResults[i];
  const before = gameResults[i - 1];
  const after = gameResults[i + 1];
  let numberOfKickersVSBefore = 0;
  let numberOfKickersVSAfter = 0;
  if(before) {
    numberOfKickersVSBefore = thisOne.handClassification.howManyKickerCardsAreRelevant(
      before.handClassification
    );
  }
  if(after) {
    numberOfKickersVSAfter = thisOne.handClassification.howManyKickerCardsAreRelevant(
      after.handClassification
    );
  }
  return {
    numberOfRelevantKickers: Math.max(numberOfKickersVSBefore, numberOfKickersVSAfter),
    isTiedWithNext: numberOfKickersVSAfter === Infinity,
  };
}

export function serializeGameResults(gameResults: GameResults): string {
  let result = '';
  const unresolvedRankings: ((rankString: string) => string)[] = [];
  for(let i = 0; i < gameResults.length; i++) {
    const { isTiedWithNext, numberOfRelevantKickers } = compareWithSiblings(gameResults, i);
    unresolvedRankings.push((rankString: string) => serializeOneLine(gameResults[i], rankString, numberOfRelevantKickers));
    if(!isTiedWithNext) {
      const rankString = (i + 1).toString();
      unresolvedRankings.forEach(method => {
        result += method(rankString);
      });
      unresolvedRankings.length = 0;
    }
  }
  return result;
}
