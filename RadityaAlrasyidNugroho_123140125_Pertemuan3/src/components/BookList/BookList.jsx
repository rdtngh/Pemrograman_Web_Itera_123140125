import PropTypes from 'prop-types'
import BookItem from '../BookItem/BookItem'
import './BookList.css'

/**
 * Menampilkan daftar buku, atau pesan kosong jika belum ada buku.
 */
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="book-list__empty">Belum ada buku</p>
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BookList
