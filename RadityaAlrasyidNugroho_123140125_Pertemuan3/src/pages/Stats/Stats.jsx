import { Link } from 'react-router-dom'
import { useBooks } from '../../context/BookContext'
import useBookStats from '../../hooks/useBookStats'
import './Stats.css'

const STATUS_ROWS = [
  { key: 'milik', label: 'Dimiliki' },
  { key: 'baca', label: 'Sedang Dibaca' },
  { key: 'beli', label: 'Ingin Dibeli' },
]

/**
 * Halaman statistik: total buku, jumlah per status, dan persentasenya.
 */
function Stats() {
  const { books } = useBooks()
  const stats = useBookStats(books)

  // Belum ada data → ajak pengguna menambah buku terlebih dahulu
  if (stats.total === 0) {
    return (
      <main className="container stats">
        <p className="eyebrow">Ringkasan koleksi</p>
        <h1>Statistik</h1>
        <div className="stats__empty">
          <p>Rak masih kosong, jadi belum ada yang bisa dihitung.</p>
          <Link to="/" className="btn btn-primary">
            Tambah buku pertama
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container stats">
      <p className="eyebrow">Ringkasan koleksi</p>
      <h1>Statistik</h1>

      <section className="stats__total">
        <span className="stats__total-value">{stats.total}</span>
        <span className="stats__total-label">Total Buku</span>
      </section>

      {/* Bar gabungan: memperlihatkan perbandingan ketiga status dalam satu garis */}
      <div className="stats__distribution" aria-hidden="true">
        {STATUS_ROWS.map(({ key }) => (
          <span key={key} className={`stats__segment stats__segment--${key}`} style={{ flexGrow: stats[key] }} />
        ))}
      </div>

      <ul className="stats__rows">
        {STATUS_ROWS.map(({ key, label }) => (
          <li key={key} className={`stats__row stats__row--${key}`}>
            <span className="stats__label">{label}</span>
            <span className="stats__count">{stats[key]}</span>
            {/* Progress bar CSS: lebar isian mengikuti persentase */}
            <div
              className="stats__progress"
              role="progressbar"
              aria-label={`Persentase ${label}`}
              aria-valuenow={stats.persen[key]}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="stats__progress-fill" style={{ width: `${stats.persen[key]}%` }} />
            </div>
            <span className="stats__percent">{stats.persen[key]}%</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

// Halaman tidak menerima props; data diambil dari BookContext
Stats.propTypes = {}

export default Stats
