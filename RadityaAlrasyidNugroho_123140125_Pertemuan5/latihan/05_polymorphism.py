"""Polymorphism, duck typing, checkout, dan operator overloading."""


class MetodePembayaran:
    """Kontrak dasar untuk objek pembayaran."""
    def __init__(self, nama_metode):
        """Menyimpan nama metode pembayaran."""
        self.nama_metode = nama_metode

    def bayar(self, tagihan):
        """Method dasar yang harus diganti subclass."""
        raise NotImplementedError("Subclass harus mengimplementasikan bayar().")


class TransferBank(MetodePembayaran):
    """Pembayaran transfer dengan biaya administrasi tetap."""
    def __init__(self, nama_bank, nomor_va):
        """Membuat metode transfer dengan bank dan nomor virtual account."""
        super().__init__("Transfer Bank")
        self.nama_bank, self.nomor_va = nama_bank, nomor_va

    def bayar(self, tagihan):
        """Menampilkan rincian transfer."""
        admin = 4000
        print(f"{self.nama_bank}: tagihan Rp{tagihan:,.0f}, admin Rp{admin:,.0f}, total Rp{tagihan + admin:,.0f}, VA {self.nomor_va}")
        return True


class EWallet(MetodePembayaran):
    """Pembayaran dompet elektronik dengan cashback."""
    def __init__(self, nama_provider, nomor_hp, saldo_wallet):
        """Membuat dompet elektronik dengan saldo awal."""
        super().__init__("E-Wallet")
        self.nama_provider, self.nomor_hp, self.saldo_wallet = nama_provider, nomor_hp, saldo_wallet

    def bayar(self, tagihan):
        """Membayar jika saldo cukup dan memberikan cashback 5 persen."""
        if self.saldo_wallet < tagihan:
            print(f"{self.nama_provider}: saldo tidak cukup.")
            return False
        cashback = tagihan * 0.05
        self.saldo_wallet = self.saldo_wallet - tagihan + cashback
        print(f"{self.nama_provider}: pembayaran Rp{tagihan:,.0f}, cashback Rp{cashback:,.0f}, sisa saldo Rp{self.saldo_wallet:,.0f}")
        return True


class CryptoPayment:
    """Metode pembayaran tanpa inheritance yang mendukung duck typing."""
    def __init__(self, wallet_address, crypto_symbol="USDT"):
        """Membuat pembayaran crypto dengan alamat dan simbol aset."""
        self.wallet_address, self.crypto_symbol = wallet_address, crypto_symbol

    def bayar(self, tagihan):
        """Mengonversi Rupiah ke USDT dengan kurs latihan."""
        nilai_crypto = tagihan / 16000
        print(f"Crypto {self.crypto_symbol}: Rp{tagihan:,.0f} = {nilai_crypto:.2f} {self.crypto_symbol}, wallet {self.wallet_address}")
        return True


def proses_checkout_pesanan(daftar_opsi_bayar, total_belanja):
    """Memproses semua objek yang menyediakan method bayar()."""
    for opsi in daftar_opsi_bayar:
        print(f"Checkout via {getattr(opsi, 'nama_metode', opsi.__class__.__name__)}:")
        opsi.bayar(total_belanja)


class Dompet:
    """Dompet yang mendukung penjumlahan dan perbandingan saldo."""
    def __init__(self, pemilik, saldo):
        """Membuat dompet untuk pemilik dengan saldo tertentu."""
        self.pemilik, self.saldo = pemilik, saldo

    def __add__(self, other):
        """Menjumlahkan saldo dompet atau nilai numerik."""
        if isinstance(other, Dompet):
            return Dompet(f"{self.pemilik} + {other.pemilik}", self.saldo + other.saldo)
        if isinstance(other, (int, float)):
            return Dompet(self.pemilik, self.saldo + other)
        return NotImplemented

    def __eq__(self, other):
        """Membandingkan saldo dua dompet."""
        if not isinstance(other, Dompet):
            return NotImplemented
        return self.saldo == other.saldo

    def __str__(self):
        """Menampilkan pemilik dan saldo dompet."""
        return f"Dompet {self.pemilik}: Rp{self.saldo:,.0f}"


if __name__ == "__main__":
    transfer = TransferBank("BCA", "880121140001")
    gopay = EWallet("GoPay", "081234567890", 500000)
    crypto = CryptoPayment("0x71C...b89A")
    proses_checkout_pesanan([transfer, gopay, crypto], 320000)
    d1, d2 = Dompet("Andi", 150000), Dompet("Budi", 250000)
    print("d1 + d2:", d1 + d2)
    print("d1 == d2:", d1 == d2)
    print("d1 + 50000:", d1 + 50000)
