import { useMemo } from 'react'

/**
 * Custom hook untuk menghitung statistik koleksi buku.
 *
 * @param {Array<{status: string}>} books - daftar buku
 * @returns {{ total: number, milik: number, baca: number, beli: number,
 *            persen: { milik: number, baca: number, beli: number } }}
 */
function useBookStats(books) {
  // useMemo: statistik hanya dihitung ulang ketika array books berubah,
  // bukan di setiap render komponen.
  return useMemo(() => {
    const total = books.length

    // Hitung jumlah buku per status dalam satu kali perulangan
    const counts = { milik: 0, baca: 0, beli: 0 }
    books.forEach((book) => {
      if (book.status in counts) {
        counts[book.status] += 1
      }
    })

    // Persentase dibulatkan; jika total 0 hasilnya 0 agar tidak terjadi pembagian dengan nol
    const toPercent = (count) => (total === 0 ? 0 : Math.round((count / total) * 100))

    return {
      total,
      milik: counts.milik,
      baca: counts.baca,
      beli: counts.beli,
      persen: {
        milik: toPercent(counts.milik),
        baca: toPercent(counts.baca),
        beli: toPercent(counts.beli),
      },
    }
  }, [books])
}

export default useBookStats
