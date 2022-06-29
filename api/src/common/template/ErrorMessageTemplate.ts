import { TextMessage } from "@line/bot-sdk";

export const ErrorMessageTemplate = (): TextMessage => {
  return {
    type: "text",
    text: "このメッセージは対応していません。",
  };
};
