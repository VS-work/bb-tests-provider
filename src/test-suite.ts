import { DataSuite } from './base/data-suite';
import { AbstractTestObject } from './base/abstract-test-object';
import { AbstractAssertPattern } from './base/abstract-assert-pattern';

export class TestSuite {
  title: string;
  fixture: string;
  fixturePath: string;
  inputData;
  assertPattern;
  dataSources: DataSuite[] = [];
  postponed: (typeof AbstractTestObject)[] = [];
  postponeReason: string;
  recordsCount: number;

  withTitle(title: string) {
    this.title = title;

    return this;
  }

  withFixture(fixture: string) {
    this.fixture = fixture;

    return this;
  }

  withFixturePath(fixturePath: string) {
    this.fixturePath = fixturePath;

    return this;
  }

  withInputData(inputData) {
    this.inputData = inputData;

    return this;
  }

  withAssertPattern(assertPattern: typeof AbstractAssertPattern) {
    this.assertPattern = assertPattern;

    return this;
  }

  withRecordsCount(recordsCount: number) {
    this.recordsCount = recordsCount;

    return this;
  }

  forDataSuite(dataSuite: DataSuite) {
    this.dataSources.push(dataSuite);

    return this;
  }

  postponeFor(postponeReason: string, ...testObject: (typeof AbstractTestObject)[]) {
    this.postponed.push(...testObject);
    this.postponeReason = postponeReason;

    return this;
  }
}
