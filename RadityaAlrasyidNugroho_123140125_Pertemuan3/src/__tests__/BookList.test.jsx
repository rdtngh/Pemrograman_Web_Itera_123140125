import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookList from '../components/BookList/BookList'

const books = [
  { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: '2', title: 'Laut Bercerita', author: 'Leila S. Chudori', status: 'baca' },
]

describe('BookList', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('menampilkan "Belum ada buku" jika array kosong', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('Belum ada buku')).toBeInTheDocument()
  })

  it('menampilkan judul kedua buku', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument()
    expect(screen.getByText('Laut Bercerita')).toBeInTheDocument()
    expect(screen.queryByText('Belum ada buku')).not.toBeInTheDocument()
  })

  it('memanggil onDelete dengan id buku setelah konfirmasi hapus disetujui', async () => {
    const user = userEvent.setup()
    const handleDelete = vi.fn()
    // Mock window.confirm agar seolah-olah pengguna menekan "OK"
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<BookList books={books} onEdit={vi.fn()} onDelete={handleDelete} />)

    await user.click(screen.getAllByRole('button', { name: 'Hapus' })[0])

    expect(window.confirm).toHaveBeenCalledWith('Yakin ingin menghapus buku ini?')
    expect(handleDelete).toHaveBeenCalledWith('1')
  })
})
