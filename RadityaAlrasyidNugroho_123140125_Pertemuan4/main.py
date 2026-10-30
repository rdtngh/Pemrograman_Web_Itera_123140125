# ===================================================
# Berkas: main.py
# Deskripsi: Program utama untuk menguji seluruh fungsi
#            pada modul math_operations.
# Nama: Raditya Alrasyid Nugroho | NIM: 123140125
# ===================================================

# Cara 1: impor seluruh modul
import math_operations

# Cara 2: impor modul dengan alias
import math_operations as mo

# Cara 3: impor fungsi & konstanta spesifik
from math_operations import (
    PI,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)

LEBAR = 50
DAFTAR_SUHU = [0, 37, 100]


def tampilkan_luas_keliling(judul: str, luas: float, keliling: float) -> None:
    """
    Menampilkan judul bagian beserta hasil luas dan keliling.

    Args:
        judul (str): Judul bagian, contoh "[1] PERSEGI (sisi = 5)".
        luas (float): Hasil perhitungan luas.
        keliling (float): Hasil perhitungan keliling.

    Returns:
        None
    """
    print(judul)
    print(f"    {'Luas':<9}: {luas:.2f}")
    print(f"    {'Keliling':<9}: {keliling:.2f}")
    print()


def main() -> None:
    """
    Titik masuk program: memanggil seluruh fungsi modul math_operations
    dengan beberapa nilai uji dan menampilkan hasilnya.

    Returns:
        None
    """
    print("=" * LEBAR)
    print(f"{'PROGRAM PENGUJIAN MODUL MATH_OPERATIONS':^{LEBAR}}")
    print("=" * LEBAR)
    print(f"Konstanta PI yang digunakan : {PI}")
    print()

    # Persegi (memakai cara impor 1)
    for sisi in [5, 10]:
        tampilkan_luas_keliling(
            f"[1] PERSEGI (sisi = {sisi})",
            math_operations.luas_persegi(sisi),
            math_operations.keliling_persegi(sisi),
        )

    # Persegi panjang (memakai cara impor 1)
    for panjang, lebar in [(8, 4), (12.5, 3)]:
        tampilkan_luas_keliling(
            f"[2] PERSEGI PANJANG (panjang = {panjang}, lebar = {lebar})",
            math_operations.luas_persegi_panjang(panjang, lebar),
            math_operations.keliling_persegi_panjang(panjang, lebar),
        )

    # Lingkaran (memakai cara impor 2 / alias)
    for jari_jari in [7, 14]:
        tampilkan_luas_keliling(
            f"[3] LINGKARAN (jari-jari = {jari_jari})",
            mo.luas_lingkaran(jari_jari),
            mo.keliling_lingkaran(jari_jari),
        )

    # Konversi suhu (memakai cara impor 3)
    print("[4] KONVERSI SUHU")
    print(f"    {'Celsius':<11}{'Fahrenheit':<14}{'Kelvin'}")
    for celsius in DAFTAR_SUHU:
        print(f"    {celsius:<11.2f}{celsius_ke_fahrenheit(celsius):<14.2f}"
              f"{celsius_ke_kelvin(celsius):.2f}")
    print("=" * LEBAR)


if __name__ == "__main__":
    main()
