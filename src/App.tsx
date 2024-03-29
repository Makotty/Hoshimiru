import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import CurrentLocation from './pages/current-location'
import SpecifiedPosition from './pages/specified-position'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current-location" element={<CurrentLocation />} />
        <Route path="/specified-position" element={<SpecifiedPosition />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
