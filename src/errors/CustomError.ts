'use strict';
import ErrorCodeWrapper from './ErrorCodeReader';
export default abstract class CustomError extends Error {
    /**
         * Every error would have a code representing a deep detail about it,
         * So it is mandatory for every error to implement it.
        */
    public code: string;
    /**
      * StatusCode will tell the http status for the given error
      * @example:
      * 400 - Bad Request
      * 401 - Unauthorized
      * 403 - Forbidden
      * 404 - Not Found
      * 500 - internal server error
      * 
      * @reference 
      * https://www.restapitutorial.com/httpstatuscodes.html
      */
    public abstract statusCode: string;
    constructor(code: string, message?: string) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        this.code = code;
    }

    /**
     * Set the name to the Error class to get the debugging correct
     */
    public abstract setName(): void;

    /**
     * returns a error message
     */
    public getMessage(): string {
        let message = this.getMessageFromCode() + this.message;
        this.code = this.statusCode + this.code;
        return message;
    }
    /**
     * this method read the errorcode file
     * and return the appropriate message string from the json
     */
    private getMessageFromCode(): string {
        let errors = (new ErrorCodeWrapper()
            .getInstance()
            .get());
        console.log(errors);

        return '';
    }
    public getCode(): string {
        return this.code;
    }

    public getStatusCode(): number {
        return (<number><unknown>this.statusCode)*1;
    }
}