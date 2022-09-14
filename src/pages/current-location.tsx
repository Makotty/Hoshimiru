import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'

const CurrentLocation = () => {
  const [getLat, setGetLat] = useState<number>(35.18028)
  const [getLng, setGetLng] = useState<number>(136.90667)

  if (!navigator.geolocation) {
    alert('あなたの端末では現在地を取得することができません')
  }

  const GetLocation = (position: GeolocationPosition) => {
    setGetLat(position.coords.latitude)
    setGetLng(position.coords.longitude)
  }

  useEffect(() => {
    const newDate = new Date()
    // console.log(newDate)

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
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-serif text-white">
          現在地から見える星を表示します。
        </h1>
        <p className="text-white">{getLat}</p>
        <p className="text-white">{getLng}</p>
      </div>
    </Layout>
  )
}

export default CurrentLocation
