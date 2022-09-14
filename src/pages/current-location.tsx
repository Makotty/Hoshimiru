import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const CurrentLocation = () => {
  const [getLat, setGetLat] = useState<number>()
  const [getLng, setGetLng] = useState<number>()

  if (!navigator.geolocation) {
    alert('あなたの端末では現在地を取得することができません')
  }

  const GetLocation = (position: GeolocationPosition) => {
    setGetLat(position.coords.latitude)
    setGetLng(position.coords.longitude)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      GetLocation,
      () => {
        console.log('error')
      },
      { enableHighAccuracy: true }
    )

    
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
