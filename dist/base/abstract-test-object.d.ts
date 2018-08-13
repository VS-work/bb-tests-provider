import { DataSuite } from './data-suite';
export declare abstract class AbstractTestObject {
    dataSuite: DataSuite;
    private initData;
    private object;
    abstract getTitle(): string;
    abstract getObject(): any;
    abstract getRootMethod(): string;
    abstract getInitMethod(): string;
    forDataSuite(dataSuite: DataSuite): this;
    init(initData?: any): this;
    run(request: any, onRead: any): void;
}
