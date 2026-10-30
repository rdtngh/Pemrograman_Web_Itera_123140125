# ===================================================
# Berkas: tugas2_nilai_mahasiswa.py
# Deskripsi: Pengelolaan data nilai mahasiswa (nilai akhir,
#            grade, tabel, serta nilai tertinggi & terendah).
# Nama: Raditya Alrasyid Nugroho | NIM: 123140125
# ===================================================

LEBAR_TABEL = 60

data_mahasiswa = [
    {"nama": "Andi Pratama", "nim": "122140001",
     "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Siti Rahma", "nim": "122140002",
     "nilai_uts": 75, "nilai_uas": 72, "nilai_tugas": 78},
    {"nama": "Budi Santoso", "nim": "122140003",
     "nilai_uts": 65, "nilai_uas": 60, "nilai_tugas": 70},
    {"nama": "Dewi Lestari", "nim": "122140004",
     "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 58},
    {"nama": "Eko Saputra", "nim": "122140005",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Rian Hidayat", "nim": "122140006",
     "nilai_uts": 90, "nilai_uas": 85, "nilai_tugas": 95},
]


def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir dengan bobot 30% UTS, 40% UAS, 30% Tugas.

    Args:
        uts (float): Nilai Ujian Tengah Semester.
        uas (float): Nilai Ujian Akhir Semester.
        tugas (float): Nilai tugas.

    Returns:
        float: Nilai akhir = (0.30 * UTS) + (0.40 * UAS) + (0.30 * Tugas).
    """
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)


def tentukan_grade(nilai_akhir: float) -> str:
    """
    Menentukan grade huruf berdasarkan nilai akhir.

    Args:
        nilai_akhir (float): Nilai akhir mahasiswa (0-100).

    Returns:
        str: Grade "A" (>= 80), "B" (>= 70), "C" (>= 60),
            "D" (>= 50), atau "E" (< 50).
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data_mahasiswa(daftar: list) -> list:
    """
    Membuat list baru berisi data mahasiswa yang dilengkapi
    kunci "nilai_akhir" dan "grade".

    Args:
        daftar (list): List of dict dengan kunci nama, nim, nilai_uts,
            nilai_uas, dan nilai_tugas.

    Returns:
        list: List of dict baru yang berisi data asli ditambah
            "nilai_akhir" (float) dan "grade" (str).
    """
    hasil = []
    for mhs in daftar:
        nilai_akhir = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        hasil.append({
            **mhs,
            "nilai_akhir": nilai_akhir,
            "grade": tentukan_grade(nilai_akhir),
        })
    return hasil


def tampilkan_tabel(daftar: list) -> None:
    """
    Menampilkan data mahasiswa dalam format tabel rapi di terminal.

    Args:
        daftar (list): List of dict yang sudah memiliki kunci
            "nilai_akhir" dan "grade".

    Returns:
        None
    """
    print(f"{' DATA NILAI MAHASISWA ':=^{LEBAR_TABEL}}")
    print(f"{'No':<4}{'Nama':<18}{'NIM':<12}{'Nilai Akhir':>12}"
          f"{'Grade':^10}")
    print("-" * LEBAR_TABEL)
    for nomor, mhs in enumerate(daftar, start=1):
        print(f"{nomor:<4}{mhs['nama']:<18}{mhs['nim']:<12}"
              f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:^10}")
    print("-" * LEBAR_TABEL)


def cari_tertinggi_terendah(daftar: list) -> tuple:
    """
    Mencari mahasiswa dengan nilai akhir tertinggi dan terendah.

    Args:
        daftar (list): List of dict yang sudah memiliki kunci "nilai_akhir".

    Returns:
        tuple: (mahasiswa_tertinggi, mahasiswa_terendah), masing-masing
            berupa dict data mahasiswa.
    """
    tertinggi = max(daftar, key=lambda m: m["nilai_akhir"])
    terendah = min(daftar, key=lambda m: m["nilai_akhir"])
    return tertinggi, terendah


def format_ringkas(mhs: dict) -> str:
    """
    Membuat teks ringkas data seorang mahasiswa.

    Args:
        mhs (dict): Data mahasiswa yang memiliki kunci nama, nim,
            nilai_akhir, dan grade.

    Returns:
        str: Teks berformat "Nama (NIM) - nilai_akhir [grade]".
    """
    return (f"{mhs['nama']} ({mhs['nim']}) - "
            f"{mhs['nilai_akhir']:.2f} [{mhs['grade']}]")


def main() -> None:
    """
    Titik masuk program: memproses data, menampilkan tabel,
    serta menampilkan mahasiswa dengan nilai tertinggi dan terendah.

    Returns:
        None
    """
    hasil = proses_data_mahasiswa(data_mahasiswa)
    tampilkan_tabel(hasil)

    tertinggi, terendah = cari_tertinggi_terendah(hasil)
    print()
    print(f"Nilai Tertinggi : {format_ringkas(tertinggi)}")
    print(f"Nilai Terendah  : {format_ringkas(terendah)}")


if __name__ == "__main__":
    main()
