import IJson from "./../interfaces/IJson";
import { reject } from "bluebird";

export default class HelloWorld {
    constructor(message: string) {
        this.setMessage(message);
    }
    private state: HelloWorldJson = {}
    setMessage(message: string): void {
        this.state.message = message;
    }
    async say(): Promise<HelloWorldJson> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.state), 1000);
        });
    }
    async sayError(): Promise<HelloWorldJson> {
        return new Promise((resolve) => {
            // reject(new Error("test"));
        });
    }
}

class HelloWorldJson implements IJson {
    message?: string
}