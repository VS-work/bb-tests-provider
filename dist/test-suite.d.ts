import { DataSuite } from './base/data-suite';
import { AbstractTestObject } from './base/abstract-test-object';
import { AbstractAssertPattern } from './base/abstract-assert-pattern';
export declare class TestSuite {
    title: string;
    fixture: string;
    fixturePath: string;
    inputData: any;
    assertPattern: any;
    dataSources: DataSuite[];
    postponed: (typeof AbstractTestObject)[];
    postponeReason: string;
    recordsCount: number;
    withTitle(title: string): this;
    withFixture(fixture: string): this;
    withFixturePath(fixturePath: string): this;
    withInputData(inputData: any): this;
    withAssertPattern(assertPattern: typeof AbstractAssertPattern): this;
    withRecordsCount(recordsCount: number): void;
    forDataSuite(dataSuite: DataSuite): this;
    postponeFor(postponeReason: string, ...testObject: (typeof AbstractTestObject)[]): this;
}
