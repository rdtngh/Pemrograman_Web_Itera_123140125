"""Titik masuk demonstrasi Sistem Manajemen Perpustakaan Sederhana."""
from library_item import Book, Magazine
from library import Library


def main():
    """Menguji penambahan, katalog, pencarian, dan status item."""
    perpustakaan = Library()
    items = [
        Book("B001", "Laskar Pelangi"),
        Book("B002", "Bumi Manusia"),
        Magazine("M001", "Majalah Sains"),
        Magazine("M002", "Teknologi Hari Ini"),
    ]
    print("=== Penambahan item ===")
    for item in items:
        perpustakaan.tambah_item(item)

    print("\n=== Katalog ===")
    perpustakaan.tampilkan_katalog()

    print("\n=== Pencarian ===")
    perpustakaan.cari_berdasarkan_judul("Laskar Pelangi")
    perpustakaan.cari_berdasarkan_judul("Judul Tidak Ada")
    perpustakaan.cari_berdasarkan_id("M001")
    perpustakaan.cari_berdasarkan_id("X999")

    print("\n=== Status ketersediaan ===")
    for item in items:
        status = "Dipinjam" if item.is_dipinjam else "Tersedia"
        print(f"{item.judul} (ID {item.item_id}): {status}")


if __name__ == "__main__":
    main()
