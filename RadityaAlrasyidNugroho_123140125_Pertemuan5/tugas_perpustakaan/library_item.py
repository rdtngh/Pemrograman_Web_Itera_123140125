"""Class abstrak dan jenis item dalam koleksi perpustakaan."""
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Item dasar dengan identitas dan status yang dienkapsulasi."""
    def __init__(self, item_id, judul):
        """Menyimpan ID, judul, dan status awal item."""
        self._item_id = str(item_id)
        self._judul = judul
        self.__is_dipinjam = False

    @property
    def item_id(self):
        """ID item untuk pencarian."""
        return self._item_id

    @property
    def judul(self):
        """Judul item untuk pencarian."""
        return self._judul

    @property
    def is_dipinjam(self):
        """Membaca status peminjaman item."""
        return self.__is_dipinjam

    @abstractmethod
    def get_detail(self):
        """Mengembalikan detail item dalam bentuk teks."""
        raise NotImplementedError


class Book(LibraryItem):
    """Buku dalam koleksi perpustakaan."""
    def get_detail(self):
        """Menghasilkan detail buku."""
        return f"[Buku] ID: {self.item_id} | Judul: {self.judul}"


class Magazine(LibraryItem):
    """Majalah dalam koleksi perpustakaan."""
    def get_detail(self):
        """Menghasilkan detail majalah."""
        return f"[Majalah] ID: {self.item_id} | Judul: {self.judul}"
