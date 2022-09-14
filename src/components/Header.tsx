type HeaderProps = {
  onClick: React.MouseEvent<HTMLInputElement>
}
export const Header = (props: HeaderProps) => {
  const { onClick } = props
  return (
    <header className="bg-gray-900 py-5 justify-between">
      <h1 className="ml-6  text-yellow-200 text-2xl ">Hoshimiru.</h1>
      <div>
        <button type="button" onClick={onClick}>
          現在地
        </button>
        <button type="button" onClick={onClick}>
          指定位置
        </button>
        <button type="button" onClick={onClick}>
          星座一覧
        </button>
      </div>
    </header>
  )
}

export default Header
