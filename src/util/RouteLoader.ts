import express from 'express';

import Routes from './../Routes';
import Controller from './../controllers/Controller';
export default class RouteLoader {

    private app: express.Application;
    private router: any;
    constructor(app: express.Application) {
        this.app = app;
    }

    public load(): void {
        let routes: { [index: string]: Controller; } = (new Routes).get();

        Object.keys(routes).forEach(route => {
            this.router = express.Router();
            routes[route].getRoutConfig().forEach(element => {
                let method: string = element.method;
                let path: string = element.path;
                let middlewares: object[] = element.middlewares;
                let handler: any = element.handler;
                path = (route+path).replace("//","/");
                switch (method) {
                    case 'GET':
                        this.router.get(path, middlewares, handler);
                        break;
                    case 'POST':
                        this.router.post(path, middlewares, handler);
                        break;
                    case 'PUT':
                        this.router.put(path, middlewares, handler);
                        break;
                    case 'DELETE':
                        this.router.delete(path, middlewares, handler);
                        break;
                    case 'HEAD':
                        this.router.head(path, middlewares, handler);
                        break;
                    case 'OPTIONS':
                        this.router.options(path, middlewares, handler);
                        break;
                }
                
            });
            
            this.app.use("/", this.router);
        });

    }
}