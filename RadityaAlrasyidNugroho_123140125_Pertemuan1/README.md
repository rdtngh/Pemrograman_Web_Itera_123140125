# Mini POS - Kasir & Keranjang Belanja

## Identitas

Nama:
Raditya Alrasyid Nugroho

NIM:  
123140125

Kelas Praktikum:  
RB

## Deskripsi Aplikasi

Aplikasi ini merupakan Mini POS sederhana untuk membantu proses transaksi kasir kantin atau toko kampus. Aplikasi ini dibuat menggunakan HTML5, CSS3, JavaScript Vanilla, dan localStorage agar data keranjang tetap tersimpan ketika halaman direfresh.

Tujuan aplikasi ini adalah mempermudah proses pencatatan penjualan barang, perhitungan subtotal, diskon, total akhir, serta pembayaran dan kembalian secara otomatis. Selain itu, aplikasi ini juga menyediakan fitur validasi form agar data yang masuk ke keranjang sesuai dengan aturan yang telah ditentukan.

## Teknologi

- HTML5
- CSS3
- JavaScript
- localStorage

## Struktur Project

```text
RadityaAlrasyidNugroho_123140125_Pertemuan1/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── script.js
```

Penjelasan struktur file:
- `index.html`: berisi struktur utama halaman aplikasi Mini POS.
- `css/style.css`: berisi desain dan layout tampilan aplikasi.
- `js/script.js`: berisi logika validasi, perhitungan transaksi, dan penyimpanan data ke localStorage.
- `README.md`: dokumentasi project dan panduan penggunaan.

## Cara Menjalankan

1. Buka folder project di VS Code.
2. Pastikan aplikasi sudah memiliki extension Live Server.
3. Klik kanan pada file `index.html`.
4. Pilih opsi `Open with Live Server`.
5. Aplikasi akan terbuka di browser secara otomatis.

## Daftar Fitur

- Validasi nama barang minimal 3 karakter
- Validasi harga minimal Rp500
- Validasi qty minimal 1
- Feedback error
- Tambah barang
- Tabel keranjang
- Perhitungan subtotal
- Perhitungan total belanja
- Diskon 10%
- Kode promo HEMAT10
- Input uang bayar
- Perhitungan kembalian
- Validasi uang tidak mencukupi
- Hapus item
- localStorage
- Reset transaksi

## Penjelasan Alur Program

1. Pengguna memasukkan data barang berupa nama, harga satuan, dan jumlah.
2. Sistem memvalidasi input agar sesuai dengan aturan.
3. Jika valid, barang ditambahkan ke array keranjang.
4. Keranjang ditampilkan dalam bentuk tabel.
5. Subtotal dihitung menggunakan rumus harga satuan × qty.
6. Total belanja dihitung dari seluruh subtotal barang.
7. Diskon dihitung secara otomatis berdasarkan total belanja dan kode promo.
8. Total akhir didapat dari total belanja dikurangi diskon.
9. Pengguna memasukkan uang bayar lalu sistem menghitung kembalian.
10. Data keranjang disimpan menggunakan localStorage agar tetap ada setelah halaman di-refresh.

## Penjelasan LocalStorage

LocalStorage digunakan untuk menyimpan data keranjang agar tidak hilang saat pengguna merefresh halaman. Prosesnya adalah sebagai berikut:

- `JSON.stringify()` digunakan untuk mengubah data array JavaScript menjadi format string JSON.
- `localStorage.setItem()` digunakan untuk menyimpan data ke browser.
- `localStorage.getItem()` digunakan untuk mengambil data dari browser.
- `JSON.parse()` digunakan untuk mengubah data string JSON kembali menjadi array JavaScript.
- `localStorage.removeItem()` digunakan untuk menghapus data keranjang saat transaksi direset.

## Dokumentasi Screenshot

### 1. Tampilan Form Utama

### 2. Tampilan Validasi Error
[Tambahkan screenshot]

### 3. Tampilan Hasil Transaksi
[Tambahkan screenshot]

---

Dokumentasi ini dibuat sebagai panduan untuk tugas praktikum Mini POS sederhana menggunakan HTML, CSS, JavaScript, dan localStorage.
