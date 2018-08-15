import * as chai from 'chai';
import * as path from 'path';
import { AbstractAssertPattern } from '../base/abstract-assert-pattern';
import { writeUsefultTestInformation } from './utils';
import { TestSuite } from "../test-suite";

const expect = chai.expect;

function isEqual(a, b) {
  const keysA = Object.keys(a).sort();
  const keysB = Object.keys(b).sort();

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (keysA[i] !== keysB[i]) {
      return false;
    }
  }

  for (const key of keysA) {
    if (a[key] != b[key]) {
      return false;
    }
  }

  return true;
}

export class PreciseAssertPattern extends AbstractAssertPattern {
  processAssert(err, data, dataSuiteSuffix: string, testSuite: TestSuite, testIndex: number) {
    const fixturePath = path.resolve(this.fixturePath, this.fixture.replace(/#datasource#/, dataSuiteSuffix));
    const fixtureData = require(fixturePath);

    expect(!err).to.be.true;
    expect(data.length).to.equal(fixtureData.length);

    let diffRecord, diffPosition;

    for (let i = 0; i < data.length; i++) {
      if (!isEqual(data[i], fixtureData[i])) {
        diffRecord = data[i];
        diffPosition = i;
        break;
      }
    }

    try {
      expect(!!diffRecord, `line ${diffPosition}`).to.be.false;
    } catch (err) {
      writeUsefultTestInformation(testIndex, JSON.stringify(fixtureData, null, 2), JSON.stringify(diffRecord, null, 2));

      throw err;
    }

  }
}
