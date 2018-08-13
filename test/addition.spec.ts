import * as path from 'path';
import { printSummaryTable, runTests, TestSuite, GenericAssertPattern } from '../src';
import { oneDigit, twoDigits } from './src/definitions/data-suite-registry';
import { getTestObjectGroups } from './src/definitions/test-object-groups';

const fixturePath = path.resolve(__dirname, 'data/fixtures/result');

describe('Addition supporting', () => {
  const aggregatedData = {};
  const testSuites = [
    new TestSuite()
      .forDataSuite(oneDigit)
      .withTitle('add operation for values LESS than 10')
      .withFixturePath(fixturePath)
      .withFixture('add-#datasource#.json')
      .withInputData('add')
      .withAssertPattern(GenericAssertPattern),
    new TestSuite()
      .forDataSuite(twoDigits)
      .withTitle('add operation for values MORE than 10')
      .withFixturePath(fixturePath)
      .withFixture('add-#datasource#.json')
      .withInputData('add')
      .withAssertPattern(GenericAssertPattern)
  ];

  after(() => {
    printSummaryTable(testSuites, aggregatedData);
  });

  runTests(getTestObjectGroups, testSuites, aggregatedData);
});
