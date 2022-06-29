import { WebhookEvent } from "@line/bot-sdk";
import axios, { AxiosResponse } from "axios";

export const getWeatherForecastData = async (
  event: WebhookEvent
): Promise<any> => {
  try {
    if (event.type !== "message" || event.message.type !== "location") {
      return;
    }

    const latitude: number = event.message.latitude;
    const longitude: number = event.message.longitude;

    const openWeatherAPI: string | undefined =
      process.env.OPENWEATHER_API_KEY || "";

    const openWeatherURL: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=ja&appid=${openWeatherAPI}`;

    const weatherData: AxiosResponse<any> = await axios.get(openWeatherURL);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};
