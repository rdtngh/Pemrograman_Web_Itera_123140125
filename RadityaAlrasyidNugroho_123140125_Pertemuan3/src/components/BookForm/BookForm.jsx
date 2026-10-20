import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './BookForm.css'

const STATUS_OPTIONS = [
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
]

/**
 * Form untuk menambah buku baru sekaligus mengedit buku yang sudah ada.
 * Mode edit aktif ketika prop initialData berisi data buku.
 */
function BookForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('milik')
  const [errors, setErrors] = useState({})

  const isEditMode = Boolean(initialData)

  // Isi form ketika masuk mode edit, dan kosongkan kembali ketika initialData menjadi null.
  // (Sinkronisasi state form dari props memakai useEffect sesuai ketentuan tugas.)
  // oxlint-disable react/set-state-in-effect
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setAuthor(initialData.author)
      setStatus(initialData.status)
    } else {
      setTitle('')
      setAuthor('')
      setStatus('milik')
    }
    setErrors({})
  }, [initialData])
  // oxlint-enable react/set-state-in-effect

  // Validasi kolom wajib: nilai yang hanya berisi spasi dianggap kosong
  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Judul wajib diisi'
    if (!author.trim()) newErrors.author = 'Penulis wajib diisi'
    return newErrors
  }

  // Hapus pesan error sebuah field begitu pengguna mulai mengetik di field tersebut
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      // Ada error → tampilkan pesan dan jangan kirim data
      setErrors(validationErrors)
      return
    }

    onSubmit({ title: title.trim(), author: author.trim(), status })

    // Setelah berhasil menambah, kosongkan form. Pada mode edit,
    // form dikosongkan oleh useEffect saat parent mengubah initialData menjadi null.
    if (!isEditMode) {
      setTitle('')
      setAuthor('')
      setStatus('milik')
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="book-form__title">{isEditMode ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <div className="book-form__field">
        <label htmlFor="book-title">Judul</label>
        <input
          id="book-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            clearError('title')
          }}
          className={errors.title ? 'input-error' : ''}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'book-title-error' : undefined}
          placeholder="Contoh: Laskar Pelangi"
        />
        {errors.title && (
          <p id="book-title-error" className="error-message">
            {errors.title}
          </p>
        )}
      </div>

      <div className="book-form__field">
        <label htmlFor="book-author">Penulis</label>
        <input
          id="book-author"
          type="text"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
            clearError('author')
          }}
          className={errors.author ? 'input-error' : ''}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'book-author-error' : undefined}
          placeholder="Contoh: Andrea Hirata"
        />
        {errors.author && (
          <p id="book-author-error" className="error-message">
            {errors.author}
          </p>
        )}
      </div>

      <div className="book-form__field">
        <label htmlFor="book-status">Status</label>
        <select id="book-status" value={status} onChange={(event) => setStatus(event.target.value)}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="book-form__actions">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Perbarui' : 'Simpan'}
        </button>
        {isEditMode && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    createdAt: PropTypes.string,
  }),
  onCancel: PropTypes.func,
}

export default BookForm
