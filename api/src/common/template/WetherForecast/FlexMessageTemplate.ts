import { WebhookEvent, FlexMessage } from "@line/bot-sdk";
import e from "express";
import { formatWeatherForecastData } from "./FormatWeatherForecast";

export const FlexMessageTemplate = async (event: WebhookEvent) => {
  const data = await formatWeatherForecastData(event);

  return {
    type: "flex",
    altText: "天気予報です",
    contents: {
      type: "bubble",
      header: {
        type: "box",
        layuot: "vertical",
        contents: [
          {
            type: "text",
            text: data.today,
            color: "#FFFFFF",
            align: "center",
            weight: "bold",
          },
        ],
      },
      hero: {
        type: Image,
        url: data.imageURL,
        size: "full",
      },
      body: {
        type: "box",
        kayout: "vertical",
        contents: [
          {
            type: "text",
            text: `天気は「${data.weatherForecast}」です`,
            weight: "bold",
            align: "center",
          },
          {
            type: "text",
            text: `○体感気温`,
            margin: "lg",
          },
          {
            type: "text",
            text: `朝：${data.mornTemperature}℃`,
            margin: "sm",
            size: "sm",
            color: "#C8BD16",
          },
          {
            type: "text",
            text: `日中：${data.dayTemperature}℃`,
            margin: "sm",
            size: "sm",
            color: "#789BC0",
          },
          {
            type: "text",
            text: `夕方：${data.eveTemperature}℃`,
            margin: "sm",
            size: "sm",
            color: "#091C43",
          },
          {
            type: "text",
            text: `夜：${data.nightTemperature}℃`,
            margin: "sm",
            size: "sm",
            color: "#004032",
          },
          {
            type: "separator",
            margin: "xl",
          },
          {
            type: "text",
            text: "■洋服アドバイス",
            margin: "xl",
          },
          {
            type: "text",
            text: data.fashionAdvice,
            margin: "sm",
            wrap: true,
            size: "xs",
          },
        ],
      },
      styles: {
        header: {
          backgroundColor: "#00B900",
        },
        hero: {
          separator: false,
        },
      },
    },
  };
};
