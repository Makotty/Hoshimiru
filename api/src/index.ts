// Load the package
import {
  Client,
  ClientConfig,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
} from "@line/bot-sdk";
import express from "express";
import dotenv from "dotenv";
require("dotenv").config();

import { SendMessage } from "./common/send/ButtonOrErrorMessage";
import { FlexMessage } from "./common/send/FlexMessage";

const PORT: string | 3000 = process.env.PORT || 3000;

const clinetConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.LINE_CHANNEL_SECRET || "",
};

const app: express.Express = express();
const client: Client = new Client(clinetConfig);

app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Hello World");
});

app.post(
  "/api/line/message",
  middleware(middlewareConfig),
  async (req: express.Request, res: express.Response): Promise<void> => {
    const events: WebhookEvent[] = req.body.events;

    events.map(async (event: WebhookEvent): Promise<void> => {
      try {
        await SendMessage(client, event);
        await FlexMessage(client, event);
      } catch (error) {
        console.log(error);
      }
    });
  }
);

app.listen(PORT, (): void => {
  console.log("http://localhost:3000");
});
