import { GameResults } from './model';
export function serializeGameResults(gameResults: GameResults): string {
  return gameResults
    .map(({ player, handClassification }, i) => {
      return `${i + 1} ${player.name} ${handClassification.serializeForHumans(0)}\n`;
    })
    .join('');
}
