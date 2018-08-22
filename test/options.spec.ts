import * as path from 'path';
import { printSummaryTable, runTests, TestSuite, PreciseAssertPattern } from '../src';
import { oneDigit, twoDigits } from './src/definitions/data-suite-registry';
import { getTestObjectGroups } from './src/definitions/test-object-groups';

const fixturePath = path.resolve(__dirname, 'data/fixtures/result');

describe('Multiplication supporting with options', () => {
  const aggregatedData = {};
  const testSuites = [
    new TestSuite()
      .forDataSuite(oneDigit)
      .withTitle('mul operation for values LESS than 10')
      .withFixturePath(fixturePath)
      .withFixture('mul-#datasource#.json')
      .withInputData('mul')
      .withAssertPattern(PreciseAssertPattern),
    new TestSuite()
      .forDataSuite(twoDigits)
      .withTitle('mul operation for values MORE than 10')
      .withFixture('mul-#datasource#.json')
      .withFixturePath(fixturePath)
      .withInputData('mul')
      .withAssertPattern(PreciseAssertPattern)
  ];

  after(() => {
    printSummaryTable(testSuites, aggregatedData);
  });

  runTests(getTestObjectGroups, testSuites, aggregatedData, [{
    testObjectTitle: 'Arithmetic 1',
    dataSuiteTitle: 'One digit'
  }]);
});
