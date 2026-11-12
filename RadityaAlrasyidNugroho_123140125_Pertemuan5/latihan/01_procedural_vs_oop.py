"""Perbandingan cara prosedural dan berorientasi objek."""

mahasiswa = {"nama": "Budi Santoso", "nim": "121140001", "jurusan": "Teknik Informatika", "ipk": 3.45}


def cetak_profil_prosedural(mhs):
    """Mencetak data mahasiswa dari dictionary."""
    print("Profil prosedural:", mhs)


def perbarui_ipk_prosedural(mhs, ipk_baru):
    """Memperbarui IPK dictionary jika nilainya berada di rentang valid."""
    if 0.0 <= ipk_baru <= 4.0:
        mhs["ipk"] = ipk_baru
        print(f"IPK prosedural diperbarui menjadi {ipk_baru:.2f}")
    else:
        print("Kesalahan: IPK harus antara 0.0 sampai 4.0.")


class Mahasiswa:
    """Menyimpan profil mahasiswa dan memvalidasi IPK."""

    def __init__(self, nama, nim, jurusan, ipk):
        """Membuat mahasiswa dengan identitas dan IPK awal."""
        self.nama, self.nim, self.jurusan, self.ipk = nama, nim, jurusan, ipk

    def cetak_profil(self):
        """Mencetak profil objek mahasiswa."""
        print(f"Profil OOP: {self.nama} ({self.nim}), {self.jurusan}, IPK {self.ipk:.2f}")

    def update_ipk(self, ipk_baru):
        """Memperbarui IPK jika valid."""
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
            print(f"IPK OOP diperbarui menjadi {ipk_baru:.2f}")
        else:
            print("Kesalahan: IPK harus antara 0.0 sampai 4.0.")


if __name__ == "__main__":
    cetak_profil_prosedural(mahasiswa)
    perbarui_ipk_prosedural(mahasiswa, 3.50)
    siti = Mahasiswa("Siti Rahma", "121140002", "Teknik Informatika", 3.80)
    siti.cetak_profil()
    siti.update_ipk(3.92)
    siti.cetak_profil()
