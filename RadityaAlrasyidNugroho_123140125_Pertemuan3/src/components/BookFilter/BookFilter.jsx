import PropTypes from 'prop-types'
import './BookFilter.css'

const FILTER_OPTIONS = [
  { value: 'semua', label: 'Semua' },
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
]

/**
 * Kumpulan tombol untuk memfilter buku berdasarkan status.
 */
function BookFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="book-filter" role="group" aria-label="Filter status buku">
      {FILTER_OPTIONS.map((option) => {
        const isActive = option.value === currentFilter
        return (
          <button
            key={option.value}
            type="button"
            // Tombol yang sedang aktif diberi class tambahan agar tampil berbeda
            className={`book-filter__button${isActive ? ' book-filter__button--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

BookFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default BookFilter
