import { Link } from 'react-router-dom'

type BaseHeaderProps = {
  onClick: () => void
}
export const BaseHeader = (props: BaseHeaderProps) => {
  const { onClick } = props
  return (
    <header className="bg-gray-900 py-5 flex justify-between">
      <h1 className="ml-3  text-yellow-300 text-2xl ">Hoshimiru.</h1>
      <div className="flex text-yellow-200 mr-3">
        <Link
          className="mr-3 px-3 hover:bg-gray-600 rounded transition"
          to="/current-location/"
        >
          現在地
        </Link>
        <Link
          className="mr-3 px-3 hover:bg-gray-600 rounded transition"
          to="/specified-position/"
        >
          指定位置
        </Link>
      </div>
    </header>
  )
}

export default BaseHeader
