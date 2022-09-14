import { ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'

type LayoutProps = {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const { children } = props
  return (
    <body className="bg-gray-800">
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  )
}

export default Layout
