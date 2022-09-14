import axios from 'axios'
import { useState } from 'react'
import Geocode from 'react-geocode'
import Layout from '../components/Layout'

type GeocodeResponse = {
  results: [{ geometry: { location: { lat: number; lng: number } } }]
}

const SpecifiedPosition = () => {
  const [place, setPlace] = useState<string>('HAL名古屋')

  const newDate = new Date()
  const date = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`
  const hour = newDate.getHours()
  const min = newDate.getMinutes()

  const GetSign = (lat: number, lng: number) => {
    axios
      .get(
        `https://livlog.xyz/hoshimiru/constellation?lat=${lat}&lng=${lng}&date=${date}&hour=${hour}&min=${min}`
      )
      .then((res) => {
        console.log(res)
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

        GetSign(lat, lng)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  return (
    <Layout>
      <div className="text-center">
        <h2 className="my-8 text-xl font-serif text-white">
          どこから見える星座を表示しますか？
        </h2>

        <input
          className="w-3/5 md:w-1/5 p-2 rounded-md"
          type="text"
          onChange={(e) => {
            setPlace(e.target.value)
          }}
        />

        <button
          className="ml-4 px-4 py-2 bg-gray-400 hover:bg-gray-200 rounded-md transition"
          type="button"
          onClick={Geocoder}
        >
          表示
        </button>
      </div>
    </Layout>
  )
}

export default SpecifiedPosition
