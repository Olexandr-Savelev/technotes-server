import { NextFunction, Request, Response } from "express";
import { logEvents } from "./logger";

interface ErrorResponse {
  status: number;
  message: string;
}

interface IError extends Error {
  status?: number;
}

export const errorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}:${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\t`,
    "errLog.log"
  );

  console.log(err.stack);

  let statusCode = res.statusCode || 500;
  let message = err.message || "Internal server error";

  const errorResponse: ErrorResponse = { status: statusCode, message };
  res.status(statusCode).json(errorResponse);
};
