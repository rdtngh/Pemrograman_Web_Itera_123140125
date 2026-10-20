import { createContext, useCallback, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

// Context global untuk data buku. Nilai default null dipakai untuk mendeteksi
// pemakaian useBooks() di luar BookProvider.
const BookContext = createContext(null)

/**
 * Provider yang menyimpan daftar buku dan menyediakan fungsi CRUD
 * ke seluruh komponen di bawahnya. Data otomatis tersimpan di localStorage.
 */
export function BookProvider({ children }) {
  // State buku disimpan di localStorage dengan key 'books' agar tetap ada setelah refresh
  const [books, setBooks] = useLocalStorage('books', [])

  // Menambah buku baru: id dari timestamp dan createdAt berformat ISO
  const addBook = useCallback(
    ({ title, author, status }) => {
      const newBook = {
        id: Date.now().toString(),
        title,
        author,
        status,
        createdAt: new Date().toISOString(),
      }
      // Buku terbaru diletakkan di urutan paling atas
      setBooks((prev) => [newBook, ...prev])
    },
    [setBooks],
  )

  // Memperbarui buku berdasarkan id; id dan createdAt tidak boleh berubah
  const updateBook = useCallback(
    (id, data) => {
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? { ...book, ...data, id: book.id, createdAt: book.createdAt } : book)),
      )
    },
    [setBooks],
  )

  // Menghapus buku berdasarkan id
  const deleteBook = useCallback(
    (id) => {
      setBooks((prev) => prev.filter((book) => book.id !== id))
    },
    [setBooks],
  )

  // useMemo agar objek value tidak dibuat ulang di setiap render (mencegah render ulang yang tidak perlu)
  const value = useMemo(
    () => ({ books, addBook, updateBook, deleteBook }),
    [books, addBook, updateBook, deleteBook],
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Hook untuk mengakses data dan fungsi buku dari BookContext.
 * Melempar error jika dipanggil di luar BookProvider supaya kesalahan mudah dilacak.
 */
// oxlint-disable-next-line react/only-export-components
export function useBooks() {
  const context = useContext(BookContext)
  if (context === null) {
    throw new Error('useBooks harus digunakan di dalam BookProvider')
  }
  return context
}
