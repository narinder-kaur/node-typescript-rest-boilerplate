import HelloWorldModel from './../models/HelloWorld';
import { Request, Response } from "express";
import Controller from './Controller';
import ResponseFormatter from './../util/ResponseFormatter';
import CustomError from './../errors/CustomError';
import {isAuthenticated} from './../middlewares/Authentication';
import IRouteConfig from './../interfaces/IRouteConfig';

export default class HelloWorld extends Controller {
    public paths: IRouteConfig[] = [
        { 'method': 'GET', 'path': '/welcome', 'middlewares': [isAuthenticated], 'handler': this.getWelcomeMessage },
        { 'method': 'GET', 'path': '/welcomeerror', 'middlewares': [], 'handler': this.getWelcomeMessageError },
        { 'method': 'GET', 'path': '/', 'middlewares': [], 'handler': this.getWelcomeMessage },
    ];

    public getWelcomeMessage(req: Request, res: Response): void {
        var helloworld = new HelloWorldModel("Hello");
        helloworld.say().then(resp => {
            ResponseFormatter.success(resp, req, res);
        }).catch((error: CustomError) => {
            ResponseFormatter.error(error, req, res);
        });
    }

    public getWelcomeMessageError(req: Request, res: Response): void {
        var helloworld = new HelloWorldModel("Hello");
        helloworld.sayError().then(resp => {
            ResponseFormatter.success(resp, req, res);
        }).catch((error: CustomError) => {
            ResponseFormatter.error(error, req, res);
        });
    }

}