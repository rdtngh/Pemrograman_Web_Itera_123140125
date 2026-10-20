import { act, renderHook } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  // Bersihkan localStorage agar setiap test dimulai dari kondisi kosong
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('menyimpan nilai yang di-set ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('books', []))

    const books = [{ id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' }]
    act(() => {
      result.current[1](books)
    })

    expect(result.current[0]).toEqual(books)
    expect(JSON.parse(window.localStorage.getItem('books'))).toEqual(books)
  })

  it('membaca nilai awal dari localStorage jika sudah ada data', () => {
    window.localStorage.setItem('books', JSON.stringify([{ id: '9', title: 'Tersimpan' }]))

    const { result } = renderHook(() => useLocalStorage('books', []))

    expect(result.current[0]).toEqual([{ id: '9', title: 'Tersimpan' }])
  })

  it('memakai initialValue jika data di localStorage rusak', () => {
    window.localStorage.setItem('books', '{data rusak')
    // Sembunyikan console.warn dari hook agar output test tetap bersih
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const { result } = renderHook(() => useLocalStorage('books', []))

    expect(result.current[0]).toEqual([])
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })
})
