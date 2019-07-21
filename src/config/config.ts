'use strict';
import fs from 'fs';
export default class config {
    private data: { (index: string): any };
    constructor() {
        let path = require.resolve("./../config/config.json");
        this.data = JSON.parse(fs.readFileSync(path).toString());
    }
    get(name: string): any {
        return this.data.name
    }
}