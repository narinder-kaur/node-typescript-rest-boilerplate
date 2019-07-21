import HelloWorldController from './controllers/HelloWorld';
import Controller from './controllers/Controller';
export default class Routes {
    /**
     * returns the map object of routes and their associated controller
     */

    constructor() {

    }
    readonly paths: { [index: string]: Controller; } = {
        '/helloworld': new HelloWorldController()
    }

    get(): any {
        return this.paths;

    }
}