import type { Client, WebhookEvent } from "@line/bot-sdk";

import { FlexMessageTemplate } from "../template/WetherForecast/FlexMessageTemplate";

export const FlexMessage = async (
  client: Client,
  event: WebhookEvent
): Promise<void> => {
  try {
    if (event.type !== "message" || event.message.type !== "location") {
      return;
    }

    const { replyToken } = event;
    const message = await FlexMessageTemplate(event);

    await client.replyMessage(replyToken, message);
  } catch (error) {
    console.log(error);
  }
};
