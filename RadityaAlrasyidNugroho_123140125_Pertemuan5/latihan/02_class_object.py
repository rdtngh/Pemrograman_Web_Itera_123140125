"""Class, object, atribut, dan dunder methods."""


class Mahasiswa:
    """Merepresentasikan mahasiswa dan mata kuliahnya."""

    universitas = "Institut Teknologi Sumatera"
    prodi = "Teknik Informatika"
    total_mahasiswa_terdaftar = 0

    def __init__(self, nama, nim, ipk=0.0):
        """Membuat mahasiswa dengan daftar mata kuliah tersendiri."""
        self.nama, self.nim, self.ipk = nama, nim, ipk
        self.daftar_matkul = []
        Mahasiswa.total_mahasiswa_terdaftar += 1

    def tambah_matkul(self, mata_kuliah):
        """Menambahkan mata kuliah ke daftar milik objek ini."""
        self.daftar_matkul.append(mata_kuliah)
        print(f"{mata_kuliah} ditambahkan untuk {self.nama}.")

    def update_ipk(self, ipk_baru):
        """Mengubah IPK dalam rentang 0.0 sampai 4.0."""
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
            print(f"IPK {self.nama} diperbarui menjadi {ipk_baru:.2f}.")
        else:
            print("IPK tidak valid.")

    def evaluasi_status(self):
        """Mengembalikan predikat akademik berdasarkan IPK."""
        if self.ipk >= 3.50:
            return "Cumlaude / Sangat Memuaskan"
        if self.ipk >= 3.00:
            return "Memuaskan"
        if self.ipk >= 2.00:
            return "Cukup"
        return "Perlu Bimbingan Khusus"

    def __str__(self):
        """Representasi ramah untuk pengguna."""
        return f"{self.nama} ({self.nim}) — IPK {self.ipk:.2f}"

    def __repr__(self):
        """Representasi teknis objek."""
        return f"Mahasiswa(nama={self.nama!r}, nim={self.nim!r}, ipk={self.ipk!r})"


if __name__ == "__main__":
    print("Jumlah sebelum:", Mahasiswa.total_mahasiswa_terdaftar)
    ahmad = Mahasiswa("Ahmad Fadhil", "121140001", 3.72)
    nabila = Mahasiswa("Nabila Putri", "121140002", 3.40)
    print("Jumlah sesudah:", Mahasiswa.total_mahasiswa_terdaftar)
    ahmad.tambah_matkul("Pemrograman Web")
    ahmad.tambah_matkul("Basis Data")
    nabila.tambah_matkul("Kecerdasan Buatan")
    print("Mata kuliah Ahmad:", ahmad.daftar_matkul)
    print("Mata kuliah Nabila:", nabila.daftar_matkul)
    print("Status:", ahmad.evaluasi_status(), ";", nabila.evaluasi_status())
    print(ahmad)
    print(repr(nabila))
    Mahasiswa.universitas = "ITERA Kampus Mandiri"
    print("Universitas Ahmad:", ahmad.universitas)
    print("Universitas Nabila:", nabila.universitas)
