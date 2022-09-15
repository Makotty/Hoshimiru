import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { SignResponseTypes } from '../types/SignResponse.'

const CurrentLocation = () => {
  const [getLat, setGetLat] = useState<number>(35.18028)
  const [getLng, setGetLng] = useState<number>(136.90667)

  const [signRes, setSignRes] = useState<SignResponseTypes>()

  if (!navigator.geolocation) {
    alert('あなたの端末では現在地を取得することができません')
  }

  const GetLocation = (position: GeolocationPosition) => {
    setGetLat(position.coords.latitude)
    setGetLng(position.coords.longitude)
  }

  useEffect(() => {
    const newDate = new Date()

    const date = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`

    const hour = newDate.getHours()
    const min = newDate.getMinutes()
    navigator.geolocation.getCurrentPosition(
      GetLocation,
      () => {
        console.log('error')
      },
      { enableHighAccuracy: true }
    )

    axios
      .get(
        `https://livlog.xyz/hoshimiru/constellation?lat=${getLat}&lng=${getLng}&date=${date}&hour=${hour}&min=${min}`
      )
      .then((response: SignResponseTypes) => {
        setSignRes(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Layout>
      <div className="text-center flex justify-center items-center flex-col">
        <h2 className="my-8 text-xl font-serif text-white">
          現在地から見える星座を表示します。
        </h2>
        <p className="text-white">緯度 : {getLat}</p>
        <p className="text-white">軽度 : {getLng}</p>

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
                  className="w-32 md:w-1/5 h-auto m-3"
                  src={data.starIcon}
                  alt={`${data.jpName}のアイコン`}
                />
                <figcaption className="flex items-start flex-col p-2">
                  <span className="text-2xl mb-1">
                    {data.jpName}
                    <span className="ml-3 text-base text-slate-400">
                      {data.enName}
                    </span>
                  </span>
                  <span className="text-left">{data.content}</span>
                </figcaption>
              </figure>

              <p className="text-sm text-left p-4">
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

export default CurrentLocation
