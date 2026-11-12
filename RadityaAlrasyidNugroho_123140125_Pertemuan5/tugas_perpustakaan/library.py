"""Class pengelola koleksi item perpustakaan."""
from library_item import LibraryItem


class Library:
    """Menyimpan item secara privat dan menyediakan operasi katalog."""
    def __init__(self):
        """Membuat perpustakaan dengan koleksi item kosong."""
        self.__koleksi = []

    def tambah_item(self, item):
        """Menambahkan item LibraryItem ke koleksi."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan LibraryItem.")
        self.__koleksi.append(item)
        print(f"Berhasil menambahkan: {item.get_detail()}")

    def tampilkan_katalog(self):
        """Menampilkan detail semua item yang tersedia."""
        print("\nKatalog item tersedia:")
        tersedia = [item for item in self.__koleksi if not item.is_dipinjam]
        if not tersedia:
            print("Tidak ada item tersedia.")
            return
        for item in tersedia:
            print(item.get_detail())

    def cari_berdasarkan_judul(self, judul):
        """Mencari dan menampilkan item dengan judul yang sama."""
        hasil = [item for item in self.__koleksi if item.judul.casefold() == judul.casefold()]
        if hasil:
            print(f"\nHasil pencarian judul '{judul}':")
            for item in hasil:
                print(item.get_detail())
            return hasil
        print(f"\nItem dengan judul '{judul}' tidak ditemukan.")
        return []

    def cari_berdasarkan_id(self, item_id):
        """Mencari dan menampilkan item dengan ID yang sama."""
        hasil = [item for item in self.__koleksi if item.item_id == str(item_id)]
        if hasil:
            print(f"\nHasil pencarian ID '{item_id}':")
            for item in hasil:
                print(item.get_detail())
            return hasil
        print(f"\nItem dengan ID '{item_id}' tidak ditemukan.")
        return []
