import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { scorePokerHands } from './score-poker-hands';

describe('scorePokerHands', () => {
  const fixturePath = 'examples';
  const expectedFixtureSubdirectory = 'expected';
  const fixtures = readdirSync(fixturePath);
  fixtures.forEach(fixtureFileName => {
    const fixtureNameMatch = fixtureFileName.match(/(.*)\.txt$/);
    if(!fixtureNameMatch) return;
    const fixtureName = fixtureNameMatch[1];
    const input = readFileSync(join(fixturePath, fixtureFileName)).toString();
    const output = readFileSync(join(fixturePath, expectedFixtureSubdirectory, fixtureFileName)).toString();
    it(`correctly scores the "${fixtureName.replace('-', ' ')}" example game`, () => {
      expect(scorePokerHands(input)).toEqual(output);
    });
  });
});
