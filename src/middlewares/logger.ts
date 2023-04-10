import { format } from "date-fns";
import { v4 } from "uuid";
import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

const fsPromises = fs.promises;

export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "yyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${v4()}\t{logFileName}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\t`, "reqLog.log");
  next();
};
