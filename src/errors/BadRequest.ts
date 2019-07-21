'use strict';

import CustomError from "./CustomError";

export default class BadRequest extends CustomError {
    public statusCode = "500";
    public setName() {
        this.name = "BadRequest";
    }

}