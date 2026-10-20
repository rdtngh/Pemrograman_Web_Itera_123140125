import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Stats from './pages/Stats/Stats'
import NotFound from './pages/NotFound/NotFound'
import './App.css'

/**
 * Komponen utama: Navbar selalu tampil, isi halaman ditentukan oleh route.
 */
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        {/* Route wildcard: semua URL yang tidak dikenal diarahkan ke halaman 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

App.propTypes = {}

export default App
