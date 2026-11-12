"""Abstract Base Class, abstract property, dan interface pattern."""
from abc import ABC, abstractmethod
import math


class Shape(ABC):
    """Kontrak umum untuk bentuk geometri."""
    def __init__(self, nama):
        """Menyimpan nama bentuk."""
        self.nama = nama

    @abstractmethod
    def luas(self):
        """Menghitung luas bentuk."""
        raise NotImplementedError

    @abstractmethod
    def keliling(self):
        """Menghitung keliling bentuk."""
        raise NotImplementedError

    def cetak_laporan(self):
        """Mencetak nama, luas, dan keliling bentuk."""
        print(f"{self.nama}: luas={self.luas():.2f}, keliling={self.keliling():.2f}")


class PersegiPanjang(Shape):
    """Bentuk persegi panjang."""
    def __init__(self, panjang, lebar):
        """Membuat persegi panjang dengan panjang dan lebar."""
        super().__init__("Persegi Panjang")
        self.panjang, self.lebar = panjang, lebar
    def luas(self):
        """Menghitung luas persegi panjang."""
        return self.panjang * self.lebar
    def keliling(self):
        """Menghitung keliling persegi panjang."""
        return 2 * (self.panjang + self.lebar)


class Lingkaran(Shape):
    """Bentuk lingkaran."""
    def __init__(self, radius):
        """Membuat lingkaran dengan jari-jari yang diberikan."""
        super().__init__("Lingkaran")
        self.radius = radius
    def luas(self):
        """Menghitung luas lingkaran."""
        return math.pi * self.radius ** 2
    def keliling(self):
        """Menghitung keliling lingkaran."""
        return 2 * math.pi * self.radius


class DatabaseConnector(ABC):
    """Interface abstrak untuk konektor basis data."""
    @property
    @abstractmethod
    def driver_name(self):
        """Nama driver koneksi."""
        raise NotImplementedError
    @abstractmethod
    def connect(self, host, port, database):
        """Membuka koneksi."""
        raise NotImplementedError
    @abstractmethod
    def execute_query(self, sql):
        """Menjalankan query dan mengembalikan hasil."""
        raise NotImplementedError
    @abstractmethod
    def disconnect(self):
        """Menutup koneksi."""
        raise NotImplementedError


class PostgreSQLConnector(DatabaseConnector):
    """Simulasi konektor PostgreSQL tanpa library eksternal."""
    @property
    def driver_name(self):
        """Mengembalikan nama driver PostgreSQL."""
        return "PostgreSQL (psycopg2)"
    def connect(self, host, port, database):
        """Menampilkan informasi koneksi dan menandai koneksi berhasil."""
        print(f"Menghubungkan ke {host}:{port}/{database} menggunakan {self.driver_name}.")
        return True
    def execute_query(self, sql):
        """Menampilkan SQL dan mengembalikan data simulasi mahasiswa."""
        print("SQL:", sql)
        return [{"id": 1, "nama": "Ahmad"}, {"id": 2, "nama": "Nabila"}]
    def disconnect(self):
        """Menampilkan pemberitahuan bahwa koneksi ditutup."""
        print("Koneksi PostgreSQL ditutup.")


if __name__ == "__main__":
    PersegiPanjang(10, 5).cetak_laporan()
    Lingkaran(7).cetak_laporan()
    try:
        Shape("Abstrak")
    except TypeError as error:
        print("Shape tidak dapat dibuat:", error)
    class SegitigaCacat(Shape):
        """Contoh subclass yang belum mengimplementasikan keliling."""
        def luas(self):
            """Memberi implementasi luas untuk contoh subclass tidak lengkap."""
            return 0
    try:
        SegitigaCacat("Segitiga")
    except TypeError as error:
        print("SegitigaCacat tidak dapat dibuat:", error)
    konektor = PostgreSQLConnector()
    konektor.connect("localhost", 5432, "paw_praktikum_db")
    hasil = konektor.execute_query("SELECT id, nama FROM mahasiswa;")
    print("Hasil query:", hasil)
    konektor.disconnect()
