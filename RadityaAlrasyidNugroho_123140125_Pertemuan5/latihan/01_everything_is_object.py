"""Membuktikan bahwa beberapa nilai dan fungsi adalah objek Python."""

angka = 42
pesan = "Praktikum Pemrograman Web ITERA"
daftar_nilai = [85, 90, 78]

for nama, nilai in (("angka", angka), ("pesan", pesan), ("daftar_nilai", daftar_nilai)):
    print(f"{nama}: type={type(nilai)}, class={nilai.__class__}")
print("upper:", pesan.upper())
print("split:", pesan.split())


def salam():
    """Mengembalikan salam singkat."""
    return "Halo dari fungsi!"


print("hasil salam:", salam())
print("tipe fungsi:", type(salam))
print("identitas fungsi:", id(salam), hex(id(salam)))
