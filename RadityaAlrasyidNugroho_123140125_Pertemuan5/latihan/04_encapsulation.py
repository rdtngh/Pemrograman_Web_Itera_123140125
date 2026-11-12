"""Encapsulation, property, validasi transaksi, dan name mangling."""


class RekeningBank:
    """Rekening dengan saldo dan PIN privat serta riwayat transaksi."""
    def __init__(self, nomor_rekening, nama_pemilik, saldo_awal, pin):
        """Membuat rekening dengan saldo awal dan PIN pemilik."""
        self.nomor_rekening = nomor_rekening
        self._pemilik = nama_pemilik
        self.__saldo = saldo_awal
        self.__pin = str(pin)
        self._riwayat_transaksi = []

    @property
    def saldo(self):
        """Membaca saldo rekening."""
        return self.__saldo

    @saldo.setter
    def saldo(self, nilai):
        """Mengubah saldo dengan validasi dan pesan audit."""
        if not isinstance(nilai, (int, float)):
            raise ValueError("Saldo harus numerik.")
        if nilai < 0:
            raise ValueError("Saldo tidak boleh negatif.")
        self.__saldo = nilai
        print(f"Audit: saldo diubah menjadi Rp{nilai:,.0f}.")

    def setor(self, nominal):
        """Menyetor nominal positif dan mencatat transaksi."""
        if nominal <= 0:
            print("Setoran harus lebih besar dari nol.")
            return False
        self.__saldo += nominal
        self._riwayat_transaksi.append(f"Setor +Rp{nominal:,.0f}")
        print(f"Setoran Rp{nominal:,.0f} berhasil.")
        return True

    def tarik(self, nominal, pin_input):
        """Menarik uang jika PIN benar dan saldo mencukupi."""
        if str(pin_input) != self.__pin:
            print("Penarikan gagal: PIN salah.")
            return False
        if nominal <= 0:
            print("Penarikan gagal: nominal harus positif.")
            return False
        if nominal > self.__saldo:
            print("Penarikan gagal: saldo tidak mencukupi.")
            return False
        self.__saldo -= nominal
        self._riwayat_transaksi.append(f"Tarik -Rp{nominal:,.0f}")
        print(f"Penarikan Rp{nominal:,.0f} berhasil.")
        return True

    def cetak_mutasi(self):
        """Mencetak identitas rekening, transaksi, dan saldo akhir."""
        print(f"Mutasi rekening {self.nomor_rekening} — {self._pemilik}")
        for transaksi in self._riwayat_transaksi:
            print("-", transaksi)
        print(f"Saldo akhir: Rp{self.__saldo:,.0f}")


if __name__ == "__main__":
    rek = RekeningBank("121-009-8871", "Ahmad Fadhilah", 500000, "123456")
    print("Public:", rek.nomor_rekening)
    print("Protected:", rek._pemilik)
    print("Saldo property:", rek.saldo)
    rek.setor(250000)
    rek.tarik(100000, "000000")
    rek.tarik(100000, "123456")
    rek.tarik(1000000, "123456")
    try:
        rek.saldo = -50000
    except ValueError as error:
        print("ValueError tertangkap:", error)
    try:
        print(rek.__saldo)
    except AttributeError as error:
        print("Akses langsung ditolak:", error)
    print("Name mangling:", rek._RekeningBank__saldo)
    rek.cetak_mutasi()
