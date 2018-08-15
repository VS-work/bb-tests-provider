import { TestSuite } from '../test-suite';

export abstract class AbstractAssertPattern {

  constructor(protected fixture, protected fixturePath: string) {
  }

  abstract processAssert(err, data, dataSuiteSuffix: string, testSuite: TestSuite, testIndex: number);
}
