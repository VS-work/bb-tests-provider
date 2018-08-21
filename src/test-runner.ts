import * as path from 'path';
import * as rimraf from 'rimraf';
import * as colors from 'colors';
import { table } from 'table';
import { head, keys, isEmpty, split, nth, noop } from 'lodash';
import { TestSuite } from './test-suite';
import { AbstractTestObject } from './base/abstract-test-object';
import { performance } from 'perf_hooks';

const POSTPONE_LABEL = '***';

function* indexMaker() {
  let index = 1;

  while (true) {
    yield index++;
  }
}

const testIndex = indexMaker();

const dir = path.resolve(__dirname, '..', 'test', 'result');

rimraf.sync(dir);

function postponeReasonExplanation(testSuites: TestSuite[]) {
  const reasons = testSuites
    .filter(testSuite => !isEmpty(testSuite.postponed) && !isEmpty(testSuite.postponeReason))
    .map(testSuite => [testSuite.title, testSuite.postponeReason]);

  if (isEmpty(reasons)) {
    return '';
  }

  return colors.blue('Postpone details:') + '\n' +
    colors.white(table([['Test', 'Reason'], ...reasons]));
}

export function printSummaryTable(testCases: TestSuite[], aggregatedData) {
  const testTitles = keys(aggregatedData);
  const testObjectTitles = keys(aggregatedData[head(testTitles)]);

  const tableData = [
    ['Test', ...(testObjectTitles.map(title => `${title}, ms`))]
  ];

  for (const testTitle of testTitles) {
    const rowData = [testTitle];

    for (const testObjectTitle of testObjectTitles) {
      let cellData = '';

      if (aggregatedData[testTitle][testObjectTitle]) {
        cellData = aggregatedData[testTitle][testObjectTitle].executionTime;
      }

      if (aggregatedData[testTitle][testObjectTitle].hasError) {
        cellData = colors.red(cellData)
      }

      if (cellData === POSTPONE_LABEL) {
        cellData = colors.blue(cellData)
      }

      rowData.push(cellData);
    }

    tableData.push(rowData);
  }

  const output = `${colors.yellow(table(tableData))}${postponeReasonExplanation(testCases)}`;

  console.log(output);
}

function isTestCaseShouldBeOmitted(testSuite: TestSuite, testObject: AbstractTestObject) {
  if (!isEmpty(testSuite.postponed)) {
    for (const postponedTestObject of testSuite.postponed) {
      const getClassName = classDetails => nth(split(classDetails.valueOf(), ' '), 1);

      if (getClassName(postponedTestObject) === testObject.constructor.name) {
        return true;
      }
    }
  }

  return false;
}

export function runTests(getTestObjectsGroups: Function, testSuites: TestSuite[], aggregatedData = {}) {
  const testObjects = getTestObjectsGroups();

  do {
    let testObject = testObjects.shift();

    for (const testSuite of testSuites) {
      for (const dataset of testSuite.dataSources) {
        const testSuiteTitleWithDataset = `${testSuite.title} on "${dataset.name}"`;

        if (!aggregatedData[testSuiteTitleWithDataset]) {
          aggregatedData[testSuiteTitleWithDataset] = {};
        }

        if (dataset === testObject.dataSuite) {
          aggregatedData[testSuiteTitleWithDataset][testObject.getTitle()] = {
            executionTime: null
          };

          const aggregatedRecord = aggregatedData[testSuiteTitleWithDataset][testObject.getTitle()];
          const title = `"${testObject.getTitle()}" on "${testObject.dataSuite.title} (${testObject.dataSuite.name})": ${testSuite.title}`;
          const flow = new testSuite.assertPattern(testSuite.fixture, testSuite.fixturePath);

          if (isTestCaseShouldBeOmitted(testSuite, testObject)) {
            aggregatedRecord.executionTime = POSTPONE_LABEL;

            xit(`${title}`, noop);
          } else {
            const currentTestIndex = testIndex.next().value;

            it(`${title} [#${currentTestIndex}]`, done => {
              const timeStart = performance.now();

              testObject.run(testSuite.inputData, (err, data) => {
                const timeFinish = performance.now();

                aggregatedRecord.executionTime = Number((timeFinish - timeStart).toFixed(3));

                try {
                  flow.processAssert(err, data, testObject.dataSuite.name, testSuite, currentTestIndex);

                  done();
                } catch (err) {
                  aggregatedRecord.hasError = true;
                  done(err);
                } finally {
                  testObject = null;
                }
              });
            });
          }
        }
      }
    }
  } while (!isEmpty(testObjects));
}
