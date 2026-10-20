# RakBuku: Aplikasi Manajemen Buku Pribadi

**Tugas Praktikum Pertemuan 3, Pengembangan Aplikasi Web (React)**
Nama: Raditya Alrasyid Nugroho
NIM: 123140125

## Deskripsi

RakBuku adalah aplikasi web untuk mencatat koleksi buku pribadi. Setiap buku punya salah satu dari tiga status: **Dimiliki**, **Sedang Dibaca**, atau **Ingin Dibeli**. Data disimpan di `localStorage` browser, jadi tidak hilang setelah halaman di-refresh.

Aplikasi dibuat dengan React (Vite) dan JavaScript (`.jsx`) memakai functional component dan Hooks, tanpa framework CSS.

## Instalasi & Cara Menjalankan

Prasyarat: Node.js 20 atau lebih baru dan npm.

```bash
# 1. Install dependency
npm install

# 2. Jalankan aplikasi (development), lalu buka http://localhost:5173
npm run dev

# 3. Jalankan unit test
npm test

# 4. (Opsional) Build untuk production
npm run build
```

## Fitur Aplikasi

| Fitur | Keterangan |
|---|---|
| Tambah buku | Isi judul, penulis, dan status lalu klik **Simpan** |
| Edit buku | Klik **Edit** pada buku, ubah data di form, lalu klik **Perbarui** (atau **Batal**) |
| Hapus buku | Klik **Hapus**, lalu konfirmasi lewat dialog |
| Filter status | Tombol Semua / Dimiliki / Sedang Dibaca / Ingin Dibeli |
| Pencarian | Cari berdasarkan judul **atau** penulis, tidak membedakan huruf besar/kecil |
| Statistik | Halaman `/stats` menampilkan total buku, jumlah per status, dan persentase dengan progress bar |
| Penyimpanan persisten | Data otomatis disimpan ke `localStorage` (key `books`) |
| Validasi form | Judul/penulis kosong → border merah dan pesan error, data tidak disimpan |
| Notifikasi | Pesan singkat (±2,5 detik) setelah tambah, edit, atau hapus |
| Responsif | Layout dua kolom di desktop, satu kolom di layar HP |
| Halaman 404 | Route yang tidak dikenal menampilkan halaman NotFound |

## Penjelasan Fitur React yang Digunakan

| Fitur React | Dipakai di | Fungsi |
|---|---|---|
| `useState` | `BookForm.jsx`, `Home.jsx`, `useLocalStorage.js` | State input form & error, filter, kata kunci pencarian, buku yang sedang diedit, notifikasi |
| `useEffect` | `BookForm.jsx` | Mengisi form saat mode edit dan mengosongkannya saat `initialData` null |
| | `Home.jsx` | Menghilangkan notifikasi otomatis dengan `setTimeout` + cleanup `clearTimeout` |
| | `useLocalStorage.js` | Menyimpan data ke `localStorage` setiap kali nilai berubah |
| `useMemo` | `useBookStats.js` | Menghitung statistik hanya saat daftar buku berubah |
| | `Home.jsx` | Menghitung `filteredBooks` (filter + pencarian) |
| | `BookContext.jsx` | Menjaga objek `value` context tetap stabil |
| `useCallback` | `BookContext.jsx` | Menjaga fungsi `addBook`, `updateBook`, `deleteBook` tetap stabil |
| Context API | `context/BookContext.jsx` | `BookProvider` menyimpan data buku dan fungsi CRUD; hook `useBooks()` dipakai di `Home.jsx` dan `Stats.jsx` |
| React Router | `main.jsx` (`BrowserRouter`), `App.jsx` (`Routes`, `Route`), `Navbar.jsx` (`NavLink`), `Stats.jsx` & `NotFound.jsx` (`Link`) | Navigasi antara halaman `/`, `/stats`, dan `*` (404) |
| Custom hook | `hooks/useLocalStorage.js` | Seperti `useState`, tetapi otomatis membaca/menyimpan ke `localStorage` (dengan `try/catch` untuk data rusak) |
| | `hooks/useBookStats.js` | Mengembalikan `{ total, milik, baca, beli, persen }`; persentase 0 jika belum ada buku |
| PropTypes | Semua komponen di `components/`, `pages/`, `App.jsx`, dan `BookProvider` | Validasi tipe props |
| Komponen reusable | `BookForm`, `BookList`, `BookItem`, `BookFilter`, `SearchBar` | Hanya menerima props (tidak mengakses context), sehingga mudah dipakai ulang dan dites |
| Testing | `src/__tests__/` | Vitest + React Testing Library + user-event, 20 test |

### Daftar Unit Test

| File | Skenario |
|---|---|
| `BookForm.test.jsx` | Submit kosong → pesan "Judul wajib diisi" & "Penulis wajib diisi", `onSubmit` tidak dipanggil |
| | Isi lengkap → `onSubmit` dipanggil dengan `{ title, author, status }`, form dikosongkan |
| | Mode edit → form terisi dari `initialData`, tombol "Perbarui" & "Batal" tampil |
| | Error hilang saat pengguna mulai mengetik |
| | Input berisi spasi saja dianggap kosong |
| `BookList.test.jsx` | Array kosong → "Belum ada buku" |
| | Dua buku → kedua judul tampil |
| | Klik Hapus + konfirmasi → `onDelete(id)` dipanggil |
| `BookFilter.test.jsx` | Klik "Ingin Dibeli" → `onFilterChange('beli')` |
| | Tombol filter aktif punya style berbeda |
| `useBookStats.test.js` | Total, jumlah per status, dan persentase benar |
| | Total 0 → persentase 0 |
| | Persentase dibulatkan |
| `useLocalStorage.test.js` | Nilai yang di-set tersimpan di `localStorage` |
| | Nilai awal dibaca dari `localStorage` |
| | Data rusak → kembali ke `initialValue` |
| `App.test.jsx` (integrasi) | Alur tambah, cari, filter, edit, hapus |
| | Data tetap ada setelah aplikasi dimuat ulang |
| | Navigasi ke halaman Statistik |
| | Route tidak dikenal → halaman 404 |

## Struktur Folder

```
RadityaAlrasyidNugroho_123140125_Pertemuan3/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── Navbar/        Navbar.jsx, Navbar.css
│   │   ├── BookForm/      BookForm.jsx, BookForm.css
│   │   ├── BookList/      BookList.jsx, BookList.css
│   │   ├── BookItem/      BookItem.jsx, BookItem.css
│   │   ├── BookFilter/    BookFilter.jsx, BookFilter.css
│   │   └── SearchBar/     SearchBar.jsx, SearchBar.css
│   ├── pages/
│   │   ├── Home/          Home.jsx, Home.css
│   │   ├── Stats/         Stats.jsx, Stats.css
│   │   └── NotFound/      NotFound.jsx, NotFound.css
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useBookStats.js
│   ├── context/
│   │   └── BookContext.jsx
│   ├── __tests__/         file-file unit test
│   ├── App.jsx            Navbar + definisi route
│   ├── App.css            style global (warna, font, tombol, container)
│   ├── main.jsx           entry point: BrowserRouter + BookProvider
│   └── setupTests.js      setup jest-dom untuk Vitest
├── index.html
├── package.json
└── vite.config.js         konfigurasi Vite + Vitest
```

### Struktur Data Buku

```js
{
  id: "1729435200000",        // Date.now().toString()
  title: "Laskar Pelangi",
  author: "Andrea Hirata",
  status: "milik",            // "milik" | "baca" | "beli"
  createdAt: "2026-10-20T15:00:00.000Z"
}
```

## Screenshot

### Halaman Beranda
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3db0410a-23d8-46bb-a34d-a952c100f1da" />

### Validasi Form (Error)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/67774b83-8378-4c54-a98e-421bb113f7b2" />

### Mode Edit
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dc8a5c33-9885-40b0-b98d-215ec51d47a2" />

### Filter & Pencarian
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/de324517-d58d-4003-aad3-a2e899b72597" />

### Halaman Statistik
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ad412409-509d-4666-a2d3-10edc7844a21" />

### Hasil Unit Test
<img width="1025" height="600" alt="image" src="https://github.com/user-attachments/assets/db49b5f7-a028-4365-a009-c319fe1530bc" />
