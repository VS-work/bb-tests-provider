import { AbstractAssertPattern } from '../base/abstract-assert-pattern';
export declare class GenericAssertPattern extends AbstractAssertPattern {
    processAssert(err: any, data: any, dataSuiteSuffix: string, testIndex: number): void;
    private equals(firstObject, secondObject);
}
