import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()

  return (
    <header className="bg-gray-900 py-5 flex justify-between">
      <h1 className="ml-3  text-yellow-300 text-2xl ">Hoshimiru.</h1>
      <div className="flex text-yellow-200 mr-3">
        <button
          className="mr-3 px-3 hover:bg-gray-600 rounded transition"
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          TOP
        </button>
        <button
          className="mr-3 px-3 hover:bg-gray-600 rounded transition"
          type="button"
          onClick={() => {
            navigate('/current-location')
          }}
        >
          現在地
        </button>
        <button
          className="px-3 hover:bg-gray-600 rounded transition"
          type="button"
          onClick={() => {
            navigate('/specified-position')
          }}
        >
          指定位置
        </button>
      </div>
    </header>
  )
}

export default Header
