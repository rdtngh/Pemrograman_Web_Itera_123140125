import { renderHook } from '@testing-library/react'
import useBookStats from '../hooks/useBookStats'

describe('useBookStats', () => {
  it('menghitung total, jumlah per status, dan persentase dengan benar', () => {
    const books = [
      { id: '1', title: 'A', author: 'X', status: 'milik' },
      { id: '2', title: 'B', author: 'Y', status: 'milik' },
      { id: '3', title: 'C', author: 'Z', status: 'baca' },
      { id: '4', title: 'D', author: 'W', status: 'beli' },
    ]

    const { result } = renderHook(() => useBookStats(books))

    expect(result.current).toEqual({
      total: 4,
      milik: 2,
      baca: 1,
      beli: 1,
      persen: { milik: 50, baca: 25, beli: 25 },
    })
  })

  it('mengembalikan persentase 0 ketika belum ada buku (tanpa pembagian dengan nol)', () => {
    const { result } = renderHook(() => useBookStats([]))

    expect(result.current.total).toBe(0)
    expect(result.current.persen).toEqual({ milik: 0, baca: 0, beli: 0 })
  })

  it('membulatkan persentase', () => {
    const books = [
      { id: '1', title: 'A', author: 'X', status: 'milik' },
      { id: '2', title: 'B', author: 'Y', status: 'baca' },
      { id: '3', title: 'C', author: 'Z', status: 'beli' },
    ]

    const { result } = renderHook(() => useBookStats(books))

    // 1/3 = 33,33% → dibulatkan menjadi 33
    expect(result.current.persen).toEqual({ milik: 33, baca: 33, beli: 33 })
  })
})
