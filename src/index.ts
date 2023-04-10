import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import router from "./routes";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { corsOptions } from "./config/corsOptions";

dotenv.config();

const port = process.env.PORT || 8000;
const app: Express = express();

app.use(logger);

app.use("/", express.static(path.join(__dirname, "..", "public")));
app.use(compression());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
