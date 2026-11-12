"""Inheritance, overriding, multiple inheritance, dan MRO."""


class Kendaraan:
    """Kendaraan umum dengan odometer."""
    def __init__(self, merek, model, tahun):
        """Membuat kendaraan dengan odometer awal nol."""
        self.merek, self.model, self.tahun, self.odometer = merek, model, tahun, 0

    def deskripsi(self):
        """Mengembalikan deskripsi kendaraan dan jarak tempuhnya."""
        return f"{self.tahun} {self.merek} {self.model}, odometer {self.odometer} km"

    def tambah_jarak(self, km):
        """Menambahkan jarak positif ke odometer."""
        if km <= 0:
            raise ValueError("Jarak harus positif.")
        self.odometer += km

    def klakson(self):
        """Mengembalikan suara klakson umum."""
        return "Tin tin!"


class Mobil(Kendaraan):
    """Kendaraan mobil dengan tangki bahan bakar."""
    def __init__(self, merek, model, tahun, jumlah_pintu, kapasitas_tangki, sisa_bensin=0.0):
        """Membuat mobil dan menginisialisasi atribut tangkinya."""
        super().__init__(merek, model, tahun)
        self.jumlah_pintu, self.kapasitas_tangki, self.sisa_bensin = jumlah_pintu, kapasitas_tangki, sisa_bensin

    def deskripsi(self):
        """Mengembalikan deskripsi mobil beserta informasi bensin."""
        return f"{super().deskripsi()}, {self.jumlah_pintu} pintu, bensin {self.sisa_bensin:.1f}/{self.kapasitas_tangki:.1f} L"

    def klakson(self):
        """Mengembalikan suara klakson khusus mobil."""
        return "Telolet! Telolet! (Klakson Mobil)"

    def isi_bensin(self, liter):
        """Mengisi bensin tanpa melampaui kapasitas tangki."""
        if liter <= 0 or self.sisa_bensin + liter > self.kapasitas_tangki:
            raise ValueError("Jumlah bensin tidak valid atau tangki akan meluap.")
        self.sisa_bensin += liter
        print(f"Bensin bertambah {liter:.1f} L.")


class Motor(Kendaraan):
    """Kendaraan motor."""
    def __init__(self, merek, model, tahun, kapasitas_cc):
        """Membuat motor dengan kapasitas mesin."""
        super().__init__(merek, model, tahun)
        self.kapasitas_cc = kapasitas_cc

    def deskripsi(self):
        """Mengembalikan deskripsi motor beserta kapasitas mesin."""
        return f"{super().deskripsi()}, {self.kapasitas_cc} cc"

    def klakson(self):
        """Mengembalikan suara klakson khusus motor."""
        return "Bip bip! (Klakson Motor)"

    def wheelie(self):
        """Menampilkan aksi wheelie motor."""
        return f"{self.merek} {self.model} melakukan wheelie!"


class KomponenBaterai:
    """Komponen baterai kendaraan listrik."""
    def __init__(self, kapasitas_kwh):
        """Membuat baterai dengan daya awal 100 persen."""
        self.kapasitas_kwh, self.daya_tersisa = kapasitas_kwh, 100.0

    def isi_daya(self, persen):
        """Menambah daya baterai tanpa melampaui 100 persen."""
        if persen <= 0 or self.daya_tersisa + persen > 100:
            raise ValueError("Pengisian harus positif dan daya tidak boleh melebihi 100%.")
        self.daya_tersisa += persen
        print(f"Daya baterai sekarang {self.daya_tersisa:.1f}%.")


class MobilListrik(Mobil, KomponenBaterai):
    """Mobil yang mewarisi fitur mobil dan baterai."""
    def __init__(self, merek, model, tahun, kapasitas_baterai):
        """Menginisialisasi bagian mobil dan komponen baterai."""
        Mobil.__init__(self, merek, model, tahun, 0, 0.0, 0.0)
        KomponenBaterai.__init__(self, kapasitas_baterai)

    def deskripsi(self):
        """Mengembalikan deskripsi khusus mobil listrik."""
        return f"{self.tahun} {self.merek} {self.model} (mobil listrik), baterai {self.kapasitas_kwh} kWh ({self.daya_tersisa:.1f}%)"


if __name__ == "__main__":
    avanza = Mobil("Toyota", "Avanza Veloz", 2023, 5, 45.0)
    motor = Motor("Honda", "CBR250RR", 2022, 250)
    ioniq = MobilListrik("Hyundai", "Ioniq 5", 2024, 72.6)
    for kendaraan in (avanza, motor, ioniq):
        print(kendaraan.deskripsi(), "|", kendaraan.klakson())
    avanza.tambah_jarak(120)
    motor.tambah_jarak(45)
    ioniq.tambah_jarak(60)
    avanza.isi_bensin(30)
    print(motor.wheelie())
    ioniq.daya_tersisa = 80.0
    ioniq.isi_daya(20)
    print("isinstance:", isinstance(ioniq, Mobil), isinstance(ioniq, KomponenBaterai))
    print("issubclass:", issubclass(MobilListrik, Mobil))
    print("MRO:", MobilListrik.__mro__)
