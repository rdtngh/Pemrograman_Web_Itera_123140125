import { useEffect, useState } from 'react'

/**
 * Custom hook untuk menyimpan state ke localStorage secara otomatis.
 * Cara pakainya sama seperti useState: const [value, setValue] = useLocalStorage(key, initialValue)
 *
 * @param {string} key - nama key di localStorage
 * @param {*} initialValue - nilai awal jika localStorage belum berisi data
 * @returns {[*, Function]} pasangan [value, setValue]
 */
function useLocalStorage(key, initialValue) {
  // Lazy initializer: fungsi ini hanya dijalankan sekali saat render pertama,
  // sehingga localStorage tidak dibaca ulang di setiap render.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      // Jika belum ada data tersimpan, gunakan nilai awal
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      // Data rusak (JSON tidak valid) atau localStorage tidak bisa diakses → pakai nilai awal
      console.warn(`Gagal membaca localStorage dengan key "${key}":`, error)
      return initialValue
    }
  })

  // Setiap kali value (atau key) berubah, simpan versi terbarunya ke localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Misalnya kuota penyimpanan penuh atau mode private browser
      console.warn(`Gagal menyimpan localStorage dengan key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
