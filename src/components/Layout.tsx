import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <div className="bg-gray-800">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
