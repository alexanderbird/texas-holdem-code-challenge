import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { scorePokerHands } from './score-poker-hands';

describe('scorePokerHands', () => {
  const fixturePath = 'examples';
  const fixtures = readdirSync(fixturePath);
  fixtures.forEach(fixtureFileName => {
    const fixtureNameMatch = fixtureFileName.match(/(.*)\.txt$/);
    if(!fixtureNameMatch) return;
    const fixtureName = fixtureNameMatch[1];
    const fixture = readFileSync(join(fixturePath, fixtureFileName)).toString();
    it(`correctly scores the "${fixtureName.replace('-', ' ')}" example game`, () => {
      const [ input, output ] = fixture.split('\n\n---\n\n');
      expect(scorePokerHands(input)).toEqual(output);
    });
  });
});
