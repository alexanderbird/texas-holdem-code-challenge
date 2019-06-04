import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { rankPokerHands } from '.';

describe('rankPokerHands', () => {
  const fixturePath = 'examples';
  const expectedFixtureSubdirectory = 'expected';
  const fixtures = readdirSync(fixturePath);
  fixtures.forEach(fixtureFileName => {
    const fixtureNameMatch = fixtureFileName.match(/(.*)\.txt$/);
    if(!fixtureNameMatch) return;
    const fixtureName = fixtureNameMatch[1];
    const input = readFileSync(join(fixturePath, fixtureFileName)).toString();
    const outputFilePath = join(fixturePath, expectedFixtureSubdirectory, fixtureFileName);
    it(`correctly scores the "${fixtureName.replace(/-/g, ' ')}" example game`, () => {
      const expectedOutputDefined = existsSync(outputFilePath);
      if(!expectedOutputDefined) {
        pending(`Expected output not defined (looked in ${outputFilePath})`);
      } else {
        const output = readFileSync(outputFilePath).toString();
        expect(rankPokerHands(input)).toEqual(output);
      }
    });
  });
});
