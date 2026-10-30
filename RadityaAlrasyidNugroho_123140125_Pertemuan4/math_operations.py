# ===================================================
# Berkas: math_operations.py
# Deskripsi: Modul berisi konstanta PI, fungsi luas & keliling
#            bangun datar, serta fungsi konversi suhu.
# Nama: Raditya Alrasyid Nugroho | NIM: 123140125
# ===================================================

PI = 3.14159


def _validasi_ukuran(**ukuran: float) -> None:
    """
    Memastikan semua ukuran geometri tidak bernilai negatif.

    Args:
        **ukuran (float): Pasangan nama ukuran dan nilainya,
            contoh: sisi=5.

    Returns:
        None

    Raises:
        ValueError: Jika ada ukuran yang bernilai negatif.
    """
    for nama, nilai in ukuran.items():
        if nilai < 0:
            raise ValueError(f"{nama} tidak boleh negatif (diberikan {nilai})")


def luas_persegi(sisi: float) -> float:
    """
    Menghitung luas persegi.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Luas persegi (sisi * sisi).
    """
    _validasi_ukuran(sisi=sisi)
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """
    Menghitung keliling persegi.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Keliling persegi (4 * sisi).
    """
    _validasi_ukuran(sisi=sisi)
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung luas persegi panjang.

    Args:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Luas persegi panjang (panjang * lebar).
    """
    _validasi_ukuran(panjang=panjang, lebar=lebar)
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung keliling persegi panjang.

    Args:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Keliling persegi panjang (2 * (panjang + lebar)).
    """
    _validasi_ukuran(panjang=panjang, lebar=lebar)
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """
    Menghitung luas lingkaran menggunakan konstanta PI modul ini.

    Args:
        jari_jari (float): Jari-jari lingkaran.

    Returns:
        float: Luas lingkaran (PI * jari_jari ** 2).
    """
    _validasi_ukuran(jari_jari=jari_jari)
    return PI * jari_jari ** 2


def keliling_lingkaran(jari_jari: float) -> float:
    """
    Menghitung keliling lingkaran menggunakan konstanta PI modul ini.

    Args:
        jari_jari (float): Jari-jari lingkaran.

    Returns:
        float: Keliling lingkaran (2 * PI * jari_jari).
    """
    _validasi_ukuran(jari_jari=jari_jari)
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius: float) -> float:
    """
    Mengonversi suhu dari Celsius ke Fahrenheit.

    Args:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam derajat Fahrenheit (celsius * 9 / 5 + 32).
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """
    Mengonversi suhu dari Celsius ke Kelvin.

    Args:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam Kelvin (celsius + 273.15).
    """
    return celsius + 273.15


if __name__ == "__main__":
    # Uji coba internal modul (tidak dijalankan saat di-import)
    print("Uji coba internal math_operations")
    print(f"luas_persegi(5)               = {luas_persegi(5):.2f}")
    print(f"keliling_persegi(5)           = {keliling_persegi(5):.2f}")
    print(f"luas_persegi_panjang(8, 4)    = {luas_persegi_panjang(8, 4):.2f}")
    print(f"keliling_persegi_panjang(8,4) = "
          f"{keliling_persegi_panjang(8, 4):.2f}")
    print(f"luas_lingkaran(7)             = {luas_lingkaran(7):.2f}")
    print(f"keliling_lingkaran(7)         = {keliling_lingkaran(7):.2f}")
    print(f"celsius_ke_fahrenheit(100)    = {celsius_ke_fahrenheit(100):.2f}")
    print(f"celsius_ke_kelvin(100)        = {celsius_ke_kelvin(100):.2f}")
    try:
        luas_persegi(-1)
    except ValueError as err:
        print(f"luas_persegi(-1)              -> ValueError: {err}")
