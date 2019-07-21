"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HelloWorld_1 = require("./../models/HelloWorld");
class HelloWorld {
    static say() {
        var helloworld = new HelloWorld_1.HelloWorld("Hello");
        return helloworld.say();
    }
}
exports.default = HelloWorld;
//# sourceMappingURL=HelloWorld.js.map