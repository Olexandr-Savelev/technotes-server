import { ErrorRequestHandler } from "express";
import { logEvents } from "./logger";

interface ErrorResponse {
  status: number;
  message: string;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}:${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\t`,
    "errLog.log"
  );

  console.log(err.stack);

  let statusCode = 500;
  let message = "Internal server error";

  if (err.status) {
    statusCode = err.status;
    message = err.message;
  }

  const errorResponse: ErrorResponse = { status: statusCode, message };
  res.status(statusCode).json(errorResponse);
};
