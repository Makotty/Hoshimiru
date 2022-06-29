import { Client, WebhookEvent } from "@line/bot-sdk";

import { ButtonMessageTemplate } from "../template/ButtonMessageTemplate";
import { ErrorMessageTemplate } from "../template/ErrorMessageTemplate";

export const SendMessage = async (
  client: Client,
  event: WebhookEvent
): Promise<void> => {
  try {
    if (event.type !== "message" || event.message.type != "text") {
      return;
    }

    const { replyToken } = event;
    const { text } = event.message;

    if (text === "今日の洋服は？") {
      await client.replyMessage(replyToken, ButtonMessageTemplate());
    } else {
      await client.replyMessage(replyToken, ErrorMessageTemplate());
    }
  } catch (error) {
    console.log(error);
  }
};
