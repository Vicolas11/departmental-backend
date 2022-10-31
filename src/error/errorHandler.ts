import { config } from "dotenv";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { envConfig } from "../configs/env.config";
config();

const handleDevError: ErrorRequestHandler = (err, _: Request, res: Response) => {
    return res.json({ 
        
    });
}

const errorHandler: ErrorRequestHandler = (err, _: Request, res: Response, next: NextFunction) => {
    const { dev, prod } = envConfig;
    if (dev) {

    }
}

export default errorHandler;