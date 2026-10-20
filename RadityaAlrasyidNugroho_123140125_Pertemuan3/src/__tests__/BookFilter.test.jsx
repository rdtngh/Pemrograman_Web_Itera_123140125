import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookFilter from '../components/BookFilter/BookFilter'

describe('BookFilter', () => {
  it('memanggil onFilterChange("beli") saat tombol "Ingin Dibeli" diklik', async () => {
    const user = userEvent.setup()
    const handleFilterChange = vi.fn()
    render(<BookFilter currentFilter="semua" onFilterChange={handleFilterChange} />)

    await user.click(screen.getByRole('button', { name: 'Ingin Dibeli' }))

    expect(handleFilterChange).toHaveBeenCalledWith('beli')
  })

  it('memberi style aktif pada tombol filter yang sedang dipilih', () => {
    render(<BookFilter currentFilter="baca" onFilterChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Sedang Dibaca' })).toHaveClass('book-filter__button--active')
    expect(screen.getByRole('button', { name: 'Semua' })).not.toHaveClass('book-filter__button--active')
  })
})
