import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use("/", express.static(path.join(__dirname, "..", "/public")));
app.use(compression());
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

app.all("*", (req: Request, res: Response) => {
  if (req.accepts("html")) {
    res.status(404);
    res.sendFile(path.join(__dirname, "./views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404);
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
