import { Link } from 'react-router-dom'
import './NotFound.css'

/**
 * Halaman yang tampil jika URL tidak cocok dengan route mana pun.
 */
function NotFound() {
  return (
    <main className="container not-found">
      <p className="not-found__code">404</p>
      <h1>Halaman tidak ditemukan</h1>
      <p className="not-found__text">Halaman ini tidak ada di rak. Mungkin alamatnya salah ketik atau sudah dipindahkan.</p>
      <Link to="/" className="btn btn-primary">
        Kembali ke Beranda
      </Link>
    </main>
  )
}

NotFound.propTypes = {}

export default NotFound
