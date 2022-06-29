import { TemplateMessage } from "@line/bot-sdk";

export const ButtonMessageTemplate = (): TemplateMessage => {
  return {
    type: "template",
    altText: "This is a buttons template",
    template: {
      type: "buttons",
      text: "今日はどんな服装にしようかな",
      actions: [
        {
          type: "uri",
          label: "現在地を送る",
          uri: "https://line.me/R/nv/location/",
        },
      ],
    },
  };
};
