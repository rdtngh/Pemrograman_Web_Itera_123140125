import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

// NavLink memberi tahu apakah link sedang aktif, sehingga class aktif bisa ditambahkan
const getLinkClass = ({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`

/**
 * Navigasi utama aplikasi.
 */
function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__inner">
        <Link to="/" className="navbar__brand">
          RakBuku
          <span className="navbar__tagline">catatan buku pribadi</span>
        </Link>
        <div className="navbar__links">
          {/* end: link "/" hanya aktif tepat di halaman Beranda, bukan di semua sub-path */}
          <NavLink to="/" end className={getLinkClass}>
            Beranda
          </NavLink>
          <NavLink to="/stats" className={getLinkClass}>
            Statistik
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

// Navbar tidak menerima props apa pun
Navbar.propTypes = {}

export default Navbar
