export abstract class AbstractAssertPattern {

  constructor(protected fixture, protected fixturePath: string) {
  }

  abstract processAssert(err, data, dataSuiteSuffix: string, testIndex: number);
}
