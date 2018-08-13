export declare abstract class AbstractAssertPattern {
    protected fixture: any;
    protected fixturePath: string;
    constructor(fixture: any, fixturePath: string);
    abstract processAssert(err: any, data: any, dataSuiteSuffix: string, testIndex: number): any;
}
