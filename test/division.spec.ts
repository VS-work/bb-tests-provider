import * as path from 'path';
import { printSummaryTable, runTests, TestSuite, GenericAssertPattern } from '../src';
import { Arithmetic1 } from './src/test-objects/arithmetic1';
import { miscNumbers } from './src/definitions/data-suite-registry';
import { getTestObjectGroups } from './src/definitions/test-object-groups';

const fixturePath = path.resolve(__dirname, 'data/fixtures/result');

describe('Division supporting', () => {
  const aggregatedData = {};
  const testSuites = [
    new TestSuite()
      .forDataSuite(miscNumbers)
      .postponeFor('Error processing for div operation was NOT supported', Arithmetic1)
      .withTitle('div operation for different values')
      .withFixture('div-#datasource#.json')
      .withFixturePath(fixturePath)
      .withInputData('div')
      .withAssertPattern(GenericAssertPattern)
  ];

  after(() => {
    printSummaryTable(testSuites, aggregatedData);
  });

  runTests(getTestObjectGroups, testSuites, aggregatedData);
});
