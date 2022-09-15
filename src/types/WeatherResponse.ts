export type WeatherResponseTypes = {
  data: {
    current: {
      clouds: number
      humidity: number
      temp: number
      visibility: number
      weather: [
        {
          id: number
          main: string
          description: string
          icon: string
        }
      ]
      wind_speed: number
    }
  }
}
