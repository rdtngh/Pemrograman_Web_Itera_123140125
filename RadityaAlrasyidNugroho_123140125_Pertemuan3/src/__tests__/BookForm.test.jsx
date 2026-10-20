import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookForm from '../components/BookForm/BookForm'

describe('BookForm', () => {
  it('menampilkan pesan error dan tidak memanggil onSubmit saat form kosong disubmit', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<BookForm onSubmit={handleSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Simpan' }))

    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument()
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument()
    // Feedback visual: input diberi class input-error (border merah)
    expect(screen.getByLabelText('Judul')).toHaveClass('input-error')
    expect(screen.getByLabelText('Penulis')).toHaveClass('input-error')
    expect(handleSubmit).not.toHaveBeenCalled()
  })

  it('memanggil onSubmit dengan data yang benar saat form diisi lengkap', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<BookForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Judul'), 'Laskar Pelangi')
    await user.type(screen.getByLabelText('Penulis'), 'Andrea Hirata')
    await user.selectOptions(screen.getByLabelText('Status'), 'baca')
    await user.click(screen.getByRole('button', { name: 'Simpan' }))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'baca',
    })
    // Setelah berhasil menambah, form dikosongkan
    expect(screen.getByLabelText('Judul')).toHaveValue('')
    expect(screen.getByLabelText('Penulis')).toHaveValue('')
  })

  it('mengisi form dari initialData dan menampilkan tombol "Perbarui" pada mode edit', () => {
    const book = {
      id: '1',
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      status: 'beli',
      createdAt: '2026-10-20T15:00:00.000Z',
    }
    render(<BookForm onSubmit={vi.fn()} initialData={book} onCancel={vi.fn()} />)

    expect(screen.getByLabelText('Judul')).toHaveValue('Bumi Manusia')
    expect(screen.getByLabelText('Penulis')).toHaveValue('Pramoedya Ananta Toer')
    expect(screen.getByLabelText('Status')).toHaveValue('beli')
    expect(screen.getByRole('button', { name: 'Perbarui' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Batal' })).toBeInTheDocument()
  })

  it('menghilangkan pesan error judul ketika pengguna mulai mengetik', async () => {
    const user = userEvent.setup()
    render(<BookForm onSubmit={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Simpan' }))
    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Judul'), 'A')

    expect(screen.queryByText('Judul wajib diisi')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Judul')).not.toHaveClass('input-error')
    // Error penulis tetap ada karena field penulis belum diisi
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument()
  })

  it('menganggap input yang hanya berisi spasi sebagai kosong', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<BookForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Judul'), '   ')
    await user.type(screen.getByLabelText('Penulis'), 'Tere Liye')
    await user.click(screen.getByRole('button', { name: 'Simpan' }))

    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument()
    expect(handleSubmit).not.toHaveBeenCalled()
  })
})
