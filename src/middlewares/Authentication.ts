'use strict';
import { Request, Response, NextFunction } from "express";
import BadRequest from "./../errors/BadRequest";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    let isAuthenticated = false;
    if (isAuthenticated) {
        return next();
    }
    next(new BadRequest("01"));
}