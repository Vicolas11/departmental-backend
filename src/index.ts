import express, { Application, Request, Response } from "express";
import { startApolloServer } from "./graphql/index.graphql";
import { envConfig } from "./configs/env.config";
import cookieParser from "cookie-parser";
import compression from "compression";
import xss from "xss-clean";
import helmet from "helmet";
import { join } from "path";
import cors from "cors";

(async () => {
  // Initialized Express Application
  const app: Application = express();

  // Prevent Cross-site Scripting Attack
  app.use(xss());

  // Enables Cross-Origin Resource Sharing for various methods(POST,GET,DELETE...)
  app.use(cors());

  // Parses incoming requests with JSON payloads
  app.use(express.json({ limit: "1MB" }));

  // Parses incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }));

  // Parse and display static path
  app.use(express.static(join(__dirname, "../public/upload/")));
  app.use("/diagrams", express.static(join(__dirname, "diagrams")));
  app.use("/avatar", express.static(join(__dirname, "avatar")));
  app.use("/chats", express.static(join(__dirname, "chats")));
  app.use("/blog", express.static(join(__dirname, "blog")));
  app.use("/logo", express.static(join(__dirname, "logo")));
  
  // Compress response bodies for every request
  app.use(compression());

  // Parse Cookies
  app.use(cookieParser());

  // Add secure HTTP headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: !envConfig.dev,
      contentSecurityPolicy: !envConfig.dev,
    })
  );

  app.get("/", (_req: Request, res: Response) => {
    res.send('<h1 style="text-align: center;">Server is Ready 👌!</h1>');
  });

  // Start Apollo Server
  startApolloServer(app);
})();
