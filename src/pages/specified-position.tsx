import axios from 'axios'
import { useState } from 'react'
import Geocode from 'react-geocode'
import Layout from '../components/Layout'
import weatherChange from '../lib/WeatherJapanesFormat'
import { SignResponseTypes } from '../types/SignResponse.'
import { WeatherResponseTypes } from '../types/WeatherResponse'

type GeocodeResponse = {
  results: [{ geometry: { location: { lat: number; lng: number } } }]
}

const SpecifiedPosition = () => {
  const [place, setPlace] = useState<string>('HAL名古屋')

  const [signRes, setSignRes] = useState<SignResponseTypes>()

  const [weatherRes, setWeatherRes] = useState<WeatherResponseTypes>()
  const [weatherJp, setWeatherJp] = useState<string>()

  const newDate = new Date()
  const date = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`
  const hour = newDate.getHours()
  const min = newDate.getMinutes()

  const GetInfo = (lat: number, lng: number) => {
    axios
      .get(
        `https://livlog.xyz/hoshimiru/constellation?lat=${lat}&lng=${lng}&date=${date}&hour=${hour}&min=${min}`
      )
      .then((response) => {
        setSignRes(response)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      )
      .then((response: WeatherResponseTypes) => {
        setWeatherRes(response)
        setWeatherJp(weatherChange(response))

        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const Geocoder = () => {
    Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY)
    Geocode.fromAddress(place).then(
      (response: GeocodeResponse) => {
        const { lat, lng } = response.results[0].geometry.location

        GetInfo(lat, lng)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  return (
    <Layout>
      <div className="flex justify-center items-center flex-col">
        <h2 className="my-8 text-xl font-serif text-white">
          どこから見える星座を表示しますか？
        </h2>

        <div className="flex justify-center items-center w-9/12 md:w-2/4 max-w-md mb-8">
          <input
            className="w-4/5 p-2 rounded-md"
            type="text"
            onChange={(e) => {
              setPlace(e.target.value)
            }}
          />

          <button
            className="w-1/5 ml-2 p-2  bg-gray-400 hover:bg-gray-200 rounded-md transition"
            type="button"
            onClick={Geocoder}
          >
            表示
          </button>
        </div>

        {weatherRes && (
          <div className="bg-gray-100 md:w-2/4 w-4/5 max-w-3xl p-4  rounded">
            <p className="text-xl pb-2">天候</p>
            <div className="flex">
              <div className="w-fit h-fit bg-gray-300 rounded">
                <img
                  className="w-16"
                  src={`http://openweathermap.org/img/wn/${
                    weatherRes?.data.current.weather[0].icon || ''
                  }@2x.png`}
                  alt="天気のアイコン"
                />
              </div>
              <div className="ml-4">
                <h2>天気：{weatherJp}</h2>
                <p>温度：{weatherRes?.data.current.temp}℃</p>
                <p>湿度：{weatherRes?.data.current.humidity}%</p>
                <p>空の曇り度：{weatherRes?.data.current.clouds}%</p>
                <p>平均視程：{weatherRes?.data.current.visibility}m</p>
                <p>風速：{weatherRes?.data.current.wind_speed}m/s</p>
              </div>
              <div />
            </div>
          </div>
        )}

        {signRes &&
          signRes.data.result.map((data) => (
            <div
              className="md:w-2/4 w-4/5 p-4 text-slate-800 my-6 bg-gray-100 max-w-3xl rounded"
              key={data.id}
            >
              <div className="flex">
                <p>見える高さ：{data.altitude}</p>｜
                <p>高度：{data.altitudeNum}度</p>
              </div>
              <div className="flex">
                <p>方角：{data.direction}</p>｜
                <p>方位角：{data.directionNum}°</p>
              </div>

              <figure className="flex flex-col items-center md:flex-row">
                <img
                  className="w-1/5 h-auto m-3"
                  src={data.starIcon}
                  alt={`${data.jpName}のアイコン`}
                />
                <figcaption className="flex items-start flex-col p-2">
                  <span className="text-2xl">
                    {data.jpName}
                    <span className="ml-3 text-base text-slate-400">
                      {data.enName}
                    </span>
                  </span>
                  <span>{data.content}</span>
                </figcaption>
              </figure>

              <p className="text-sm p-4">
                ストーリー
                <br />
                {data.origin}
              </p>

              <figure className="flex justify-center">
                <img
                  // className="w-full h-auto"
                  src={data.starImage}
                  alt={`${data.jpName}のアイコン`}
                />
              </figure>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export default SpecifiedPosition
