# Praktikum PAW Pertemuan 5 — Python OOP

## Identitas Mahasiswa

- **Nama Lengkap:** Raditya Alrasyid Nugroho
- **NIM:** 123140125
- **Kelas Praktikum:** RB

## Deskripsi Program

Sistem Manajemen Perpustakaan Sederhana adalah program terminal untuk menyimpan beberapa buku dan majalah, menampilkan katalog item yang tersedia, serta mencari item berdasarkan judul atau ID. Program membuat objek `Book` dan `Magazine`, menambahkannya melalui `Library`, lalu menjalankan katalog, pencarian, dan pembacaan status ketersediaan.

## Konsep OOP

1. **Class dan object:** `Library`, `Book`, dan `Magazine` menjadi cetak biru untuk objek perpustakaan dan item.
2. **Inheritance:** `Book` dan `Magazine` mewarisi `LibraryItem`.
3. **Encapsulation:** `Library` menyimpan koleksi di `__koleksi`; identitas item memakai atribut protected dan status peminjaman tersimpan privat.
4. **Polymorphism:** `Library` memanggil `get_detail()` dengan antarmuka sama. Setiap jenis item menghasilkan teks detailnya sendiri.
5. **Abstraction:** `LibraryItem` adalah abstract class dengan abstract method `get_detail()` yang wajib diimplementasikan subclass.

Property `is_dipinjam` menyediakan akses baca status item. Item dimulai dalam keadaan tersedia; program tidak menambahkan alur peminjaman karena tidak termasuk ruang lingkup spesifikasi.

## Menjalankan Program

Dari root repository, masuk ke direktori aplikasi lalu jalankan:

```bash
cd RadityaAlrasyidNugroho_123140125_Pertemuan5/tugas_perpustakaan
python main.py
```

## Menjalankan Latihan

Jalankan setiap file secara mandiri dari root folder pertemuan, misalnya:

```bash
python latihan/01_everything_is_object.py
```

File latihan lainnya berada di direktori `latihan/` dengan nama sesuai materi.

## Screenshot Output Terminal

Screenshot belum tersedia. Tambahkan screenshot asli hasil menjalankan `main.py` secara manual di bawah ini.

![Screenshot output terminal — tambahkan gambar asli di sini](screenshots/output_terminal.png)
