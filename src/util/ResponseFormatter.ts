"use strict";
import IJson from './../interfaces/IJson';
import { Request, Response } from 'express';
import CustomError from './../errors/CustomError';

export default class ResponseFormatter {
    private response: IJson;
    constructor(response: IJson) {
        this.response = response;
    }

    public static success(response: IJson, req: Request, res: Response): void {
        res.send({
            "success": "true",
            "data": response
        });
    }
    public static error(error: CustomError, req: Request, res: Response): void {
        res.send({
            "success": "false",
            "message": error.getMessage(),
            "errorCode": error.getCode()
        });
    }
}