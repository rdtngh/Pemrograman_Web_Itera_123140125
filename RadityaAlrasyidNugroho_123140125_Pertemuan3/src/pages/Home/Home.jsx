import { useEffect, useMemo, useState } from 'react'
import { useBooks } from '../../context/BookContext'
import BookForm from '../../components/BookForm/BookForm'
import BookFilter from '../../components/BookFilter/BookFilter'
import SearchBar from '../../components/SearchBar/SearchBar'
import BookList from '../../components/BookList/BookList'
import './Home.css'

// Lama notifikasi tampil (milidetik)
const NOTIFICATION_DURATION = 2500

/**
 * Halaman utama: form tambah/edit, pencarian, filter, dan daftar buku.
 */
function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks()

  const [filter, setFilter] = useState('semua')
  const [search, setSearch] = useState('')
  const [editingBook, setEditingBook] = useState(null)
  const [notification, setNotification] = useState(null)

  // Notifikasi otomatis hilang setelah beberapa detik.
  // Cleanup clearTimeout mencegah timer lama menghapus notifikasi baru.
  useEffect(() => {
    if (!notification) return undefined
    const timer = setTimeout(() => setNotification(null), NOTIFICATION_DURATION)
    return () => clearTimeout(timer)
  }, [notification])

  // Logika filter + pencarian:
  // 1) saring berdasarkan status (kecuali 'semua')
  // 2) cocokkan kata kunci dengan judul ATAU penulis tanpa membedakan huruf besar/kecil
  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return books
      .filter((book) => filter === 'semua' || book.status === filter)
      .filter(
        (book) =>
          keyword === '' ||
          book.title.toLowerCase().includes(keyword) ||
          book.author.toLowerCase().includes(keyword),
      )
  }, [books, filter, search])

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data)
      setEditingBook(null)
      setNotification({ type: 'success', message: 'Buku berhasil diperbarui' })
    } else {
      addBook(data)
      setNotification({ type: 'success', message: 'Buku berhasil ditambahkan' })
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    // Gulir ke atas supaya form edit langsung terlihat (terutama di layar HP)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    deleteBook(id)
    // Jika buku yang sedang diedit ikut dihapus, keluar dari mode edit
    if (editingBook?.id === id) setEditingBook(null)
    setNotification({ type: 'danger', message: 'Buku berhasil dihapus' })
  }

  return (
    <main className="container home">
      <header className="home__header">
        <p className="eyebrow">Koleksi pribadi</p>
        <h1>Rak Buku Saya</h1>
        <p>Catat buku yang kamu miliki, sedang dibaca, atau ingin dibeli.</p>
      </header>

      {notification && (
        <div className={`home__notification home__notification--${notification.type}`} role="status">
          {notification.message}
        </div>
      )}

      <div className="home__layout">
        <section className="home__form">
          <BookForm onSubmit={handleSubmit} initialData={editingBook} onCancel={() => setEditingBook(null)} />
        </section>

        <section className="home__list">
          <div className="home__toolbar">
            <SearchBar value={search} onChange={setSearch} />
            <BookFilter currentFilter={filter} onFilterChange={setFilter} />
          </div>

          <p className="home__count">
            Menampilkan {filteredBooks.length} dari {books.length} buku
          </p>

          {books.length > 0 && filteredBooks.length === 0 ? (
            <p className="home__no-result">Tidak ada buku yang cocok dengan pencarian atau filter ini.</p>
          ) : (
            <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </main>
  )
}

// Halaman tidak menerima props; data diambil dari BookContext
Home.propTypes = {}

export default Home
