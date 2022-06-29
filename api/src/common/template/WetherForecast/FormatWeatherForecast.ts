import { WebhookEvent } from "@line/bot-sdk";
import { AxiosResponse } from "axios";

import { getWeatherForecastData } from "./GetWeatherForecast";

import type { WeatherType } from "./types/weather.type";
import type { WeatherArrayType } from "./types/weatherArray.type";

export const formatWeatherForecastData = async (
  event: WebhookEvent
): Promise<WeatherArrayType> => {
  const weathers: AxiosResponse<any> = await getWeatherForecastData(event);

  const weather: WeatherType = weathers.data.daily[0];

  const UNIXToday: number = weather.dt;
  const convertUNIXToday: Date = new Date(UNIXToday * 1000);
  const today: string = convertUNIXToday.toLocaleDateString("ja-JP");

  const weatherForecast: string = weather.weather[0].description;

  const mornTemperature: number = weather.feels_like.morn;
  const dayTemperature: number = weather.feels_like.day;
  const eveTemperature: number = weather.feels_like.eve;
  const nightTemperature: number = weather.feels_like.night;

  const maximumTemperature: number = Math.max(
    mornTemperature,
    dayTemperature,
    eveTemperature,
    nightTemperature
  );

  let fashionAdvice: string = "";

  let imageURL: string = "";

  if (maximumTemperature >= 26) {
    fashionAdvice =
      "暑い！半袖が活躍する時期です。少し歩くだけで汗ばむ気温なので半袖1枚で大丈夫です。ハットや日焼け止めなどの対策もしましょう";
    imageURL =
      "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/60aa3c44153071e6df530eb7_71.png";
  } else if (maximumTemperature >= 21) {
    fashionAdvice =
      "半袖と長袖の分かれ目の気温です。日差しのある日は半袖を、曇りや雨で日差しがない日は長袖がおすすめです。この気温では、半袖の上にライトアウターなどを着ていつでも脱げるようにしておくといいですね！";
    imageURL =
      "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6056e58a5923ad81f73ac747_10.png";
  } else if (maximumTemperature >= 16) {
    fashionAdvice =
      "レイヤードスタイルが楽しめる気温です。ちょっと肌寒いかな？というくらいの過ごしやすい時期なので目一杯ファッションを楽しみましょう！日中と朝晩で気温差が激しいので羽織ものを持つことを前提としたコーディネートがおすすめです。";
    imageURL =
      "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6087da411a3ce013f3ddcd42_66.png";
  } else if (maximumTemperature >= 12) {
    fashionAdvice =
      "じわじわと寒さを感じる気温です。ライトアウターやニットやパーカーなどが活躍します。この時期は急に暑さをぶり返すことも多いのでこのLINEで毎日天気を確認してくださいね！";
    imageURL =
      "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6056e498e7d26507413fd853_4.png";
  } else if (maximumTemperature >= 7) {
    fashionAdvice =
      "そろそろ冬本番です。冬服の上にアウターを羽織ってちょうどいいくらいです。ただし室内は暖房が効いていることが多いので脱ぎ着しやすいコーディネートがおすすめです！";
    imageURL =
      "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6056e4de7156326ff560b1a1_6.png";
  } else {
    fashionAdvice =
      "凍えるほどの寒さです。しっかり厚着して、マフラーや手袋、ニット帽などの冬小物もうまく使って防寒対策をしましょう！";
    imageURL =
      "https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6056ebd3ea0ff76dfc900633_48.png";
  }

  const weatherArray: WeatherArrayType = {
    today,
    imageURL,
    weatherForecast,
    mornTemperature,
    dayTemperature,
    eveTemperature,
    nightTemperature,
    fashionAdvice,
  };

  return weatherArray;
};
