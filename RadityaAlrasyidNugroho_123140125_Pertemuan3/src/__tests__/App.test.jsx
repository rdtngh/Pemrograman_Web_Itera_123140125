import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { BookProvider } from '../context/BookContext'
import App from '../App'

// Render seluruh aplikasi (Router + Context) pada route tertentu
const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <BookProvider>
        <App />
      </BookProvider>
    </MemoryRouter>,
  )

// Helper untuk menambah buku lewat form
const addBook = async (user, title, author, status = 'milik') => {
  await user.type(screen.getByLabelText('Judul'), title)
  await user.type(screen.getByLabelText('Penulis'), author)
  await user.selectOptions(screen.getByLabelText('Status'), status)
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
}

describe('Integrasi aplikasi RakBuku', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.scrollTo = vi.fn()
    // Gagal jika React mencetak error (misalnya warning key atau prop) ke console
    vi.spyOn(console, 'error').mockImplementation((...args) => {
      throw new Error(`console.error dipanggil: ${args.join(' ')}`)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('menambah, mencari, memfilter, mengedit, dan menghapus buku', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderApp()

    await addBook(user, 'Laskar Pelangi', 'Andrea Hirata', 'milik')
    await addBook(user, 'Bumi Manusia', 'Pramoedya Ananta Toer', 'beli')
    expect(screen.getByText('Menampilkan 2 dari 2 buku')).toBeInTheDocument()

    // Pencarian berdasarkan nama penulis, tidak peka huruf besar/kecil
    await user.type(screen.getByRole('searchbox'), 'ANDREA')
    expect(screen.getByText('Menampilkan 1 dari 2 buku')).toBeInTheDocument()
    expect(screen.queryByText('Bumi Manusia')).not.toBeInTheDocument()
    await user.clear(screen.getByRole('searchbox'))

    // Filter status
    await user.click(screen.getByRole('button', { name: 'Ingin Dibeli' }))
    expect(screen.getByText('Menampilkan 1 dari 2 buku')).toBeInTheDocument()
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Semua' }))

    // Edit buku
    const item = screen.getByText('Bumi Manusia').closest('li')
    await user.click(within(item).getByRole('button', { name: 'Edit' }))
    expect(screen.getByLabelText('Judul')).toHaveValue('Bumi Manusia')
    await user.clear(screen.getByLabelText('Judul'))
    await user.type(screen.getByLabelText('Judul'), 'Anak Semua Bangsa')
    await user.click(screen.getByRole('button', { name: 'Perbarui' }))
    expect(screen.getByText('Anak Semua Bangsa')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Buku berhasil diperbarui')
    expect(screen.getByRole('button', { name: 'Simpan' })).toBeInTheDocument()

    // Hapus buku
    const itemToDelete = screen.getByText('Laskar Pelangi').closest('li')
    await user.click(within(itemToDelete).getByRole('button', { name: 'Hapus' }))
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument()
    expect(screen.getByText('Menampilkan 1 dari 1 buku')).toBeInTheDocument()
  })

  it('data tetap ada setelah aplikasi dimuat ulang (localStorage)', async () => {
    const user = userEvent.setup()
    const { unmount } = renderApp()
    await addBook(user, 'Laut Bercerita', 'Leila S. Chudori', 'baca')
    unmount()

    renderApp()
    expect(screen.getByText('Laut Bercerita')).toBeInTheDocument()
  })

  it('menampilkan statistik dan berpindah halaman lewat navbar', async () => {
    const user = userEvent.setup()
    renderApp()
    await addBook(user, 'Laskar Pelangi', 'Andrea Hirata', 'milik')
    await addBook(user, 'Laut Bercerita', 'Leila S. Chudori', 'baca')

    await user.click(screen.getByRole('link', { name: 'Statistik' }))

    expect(screen.getByRole('heading', { name: 'Statistik' })).toBeInTheDocument()
    expect(screen.getByRole('progressbar', { name: 'Persentase Dimiliki' })).toHaveAttribute('aria-valuenow', '50')
    expect(screen.getByRole('progressbar', { name: 'Persentase Ingin Dibeli' })).toHaveAttribute('aria-valuenow', '0')
  })

  it('menampilkan halaman 404 untuk route yang tidak dikenal', () => {
    renderApp('/halaman-tidak-ada')

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Kembali ke Beranda' })).toHaveAttribute('href', '/')
  })
})
