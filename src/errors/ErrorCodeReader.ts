'use strict';
import fs from 'fs';
class ErrorCodeReader {
    private data: { (index: string): string };
    constructor() {
        let path = require.resolve("./ErrorCode.json");
        this.data = JSON.parse(fs.readFileSync(path).toString());
    }

    get(): { (index: string): string } {
        return this.data;
    }
}


export default class ErrorCodeWrapper {
    private static instance: ErrorCodeReader;
    constructor() {
        if (!ErrorCodeWrapper.instance) {
            ErrorCodeWrapper.instance = new ErrorCodeReader();
        }
    }

    getInstance() {
        return ErrorCodeWrapper.instance;
    }

}