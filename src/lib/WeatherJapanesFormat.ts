import { WeatherResponseTypes } from '../types/WeatherResponse'

const weatherChange = (response: WeatherResponseTypes) => {
  let weatherJp = ''
  const weather = response.data.current.weather[0]
  if (weather.main === 'Clear') {
    if (weather.description === 'clear sky') {
      weatherJp = '快晴'
    } else {
      weatherJp = '晴れ'
    }
  }

  if (weather.main === 'Clouds') {
    if (weather.description === 'few clouds') {
      weatherJp = '晴れ'
    } else if (weather.description === 'scattered clouds') {
      weatherJp = '所々曇り'
    } else if (weather.description === 'broken clouds') {
      weatherJp = 'だいたい曇り'
    } else if (weather.description === 'overcast clouds') {
      weatherJp = '曇り'
    }
  }

  if (weather.main === 'Rain') {
    if (weather.description === 'shower rain') {
      weatherJp = '小雨'
    } else if (weather.description === 'rain') {
      weatherJp = '雨'
    } else if (weather.description === 'thunderstorm') {
      weatherJp = '雷雨'
    } else {
      weatherJp = '雨'
    }
  }

  if (weather.main === 'Snow') {
    weatherJp = '雪'
  }

  if (weather.main === 'Mist') {
    weatherJp = '霧'
  }
  return weatherJp
}

export default weatherChange
