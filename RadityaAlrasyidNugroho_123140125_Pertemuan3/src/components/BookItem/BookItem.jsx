import PropTypes from 'prop-types'
import './BookItem.css'

const STATUS_LABELS = {
  milik: 'Dimiliki',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
}

/**
 * Menampilkan satu buku (satu baris di daftar) beserta status dan tombol aksi.
 */
function BookItem({ book, onEdit, onDelete }) {
  // Minta konfirmasi dulu agar buku tidak terhapus karena salah klik
  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      onDelete(book.id)
    }
  }

  return (
    <li className="book-item">
      <div className="book-item__info">
        <h3 className="book-item__title">{book.title}</h3>
        <p className="book-item__author">{book.author}</p>
      </div>
      {/* Class badge berbeda per status sehingga warnanya juga berbeda */}
      <span className={`badge badge--${book.status}`}>{STATUS_LABELS[book.status]}</span>
      <div className="book-item__actions">
        <button type="button" className="book-item__action" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="book-item__action book-item__action--danger" onClick={handleDelete}>
          Hapus
        </button>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BookItem
