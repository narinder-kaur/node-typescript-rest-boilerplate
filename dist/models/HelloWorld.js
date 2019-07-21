"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelloWorld {
    constructor(message) {
        this.state = {};
        this.setMessage(message);
    }
    setMessage(message) {
        this.state.message = message;
    }
    say() {
        return this.state;
    }
}
exports.HelloWorld = HelloWorld;
//# sourceMappingURL=HelloWorld.js.map