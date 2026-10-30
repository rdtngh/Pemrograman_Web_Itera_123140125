# ===================================================
# Berkas: tugas1_bmi.py
# Deskripsi: Program penghitung Body Mass Index (BMI)
#            beserta penentuan kategorinya.
# Nama: Raditya Alrasyid Nugroho | NIM: 123140125
# ===================================================


def hitung_bmi(berat: float, tinggi: float) -> float:
    """
    Menghitung Body Mass Index (BMI).

    Args:
        berat (float): Berat badan dalam kilogram (kg).
        tinggi (float): Tinggi badan dalam meter (m).

    Returns:
        float: Nilai BMI hasil perhitungan berat / (tinggi * tinggi).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori_bmi(bmi: float) -> str:
    """
    Menentukan kategori berat badan berdasarkan nilai BMI.

    Args:
        bmi (float): Nilai BMI yang sudah dihitung.

    Returns:
        str: Kategori BMI ("Berat badan kurang", "Berat badan normal",
            "Berat badan berlebih", atau "Obesitas").
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def minta_angka_positif(pesan: str) -> float:
    """
    Meminta input angka positif dari pengguna hingga input valid.

    Args:
        pesan (str): Teks prompt yang ditampilkan ke pengguna.

    Returns:
        float: Angka bernilai lebih dari nol yang dimasukkan pengguna.
    """
    while True:
        teks = input(pesan).strip().replace(",", ".")
        try:
            angka = float(teks)
        except ValueError:
            print("  [!] Input harus berupa angka. Silakan coba lagi.")
            continue
        if angka <= 0:
            print("  [!] Nilai harus lebih dari 0. Silakan coba lagi.")
            continue
        return angka


def main() -> None:
    """
    Titik masuk program: meminta input berat dan tinggi badan,
    menghitung BMI, lalu menampilkan hasil beserta kategorinya.

    Returns:
        None
    """
    print("=== PROGRAM PENGHITUNG BMI ===")
    berat_badan = minta_angka_positif("Masukkan berat badan (kg): ")
    tinggi_badan = minta_angka_positif("Masukkan tinggi badan (m): ")

    # Tinggi > 3 m hampir pasti dimasukkan dalam satuan cm
    while tinggi_badan > 3:
        print(f"  [!] Tinggi {tinggi_badan} terlalu besar. "
              f"Gunakan satuan meter (contoh: 1.70, bukan 170).")
        tinggi_badan = minta_angka_positif("Masukkan tinggi badan (m): ")

    bmi = hitung_bmi(berat_badan, tinggi_badan)
    kategori = tentukan_kategori_bmi(bmi)

    print()
    print("-" * 34)
    print(f"Berat badan : {berat_badan:.2f} kg")
    print(f"Tinggi badan: {tinggi_badan:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")
    print("-" * 34)


if __name__ == "__main__":
    main()
