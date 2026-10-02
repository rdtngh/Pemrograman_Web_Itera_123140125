const namaKalian = 'Raditya Alrasyid Nugroho';
const prodi = 'Teknik Informatika';
const angkatan = 2023;

const biodata = `
Nama: ${namaKalian}
Program Studi: ${prodi}
Angkatan: ${angkatan}
`;

function cekKabisat(tahun) {
  return (tahun % 4 === 0 && tahun % 100 !== 0) || tahun % 400 === 0;
}

const hasilKabisat = [
  `cekKabisat(2024) -> ${cekKabisat(2024)}`,
  `cekKabisat(1900) -> ${cekKabisat(1900)}`,
  `cekKabisat(2000) -> ${cekKabisat(2000)}`,
  `cekKabisat(2001) -> ${cekKabisat(2001)}`,
].join('\n');

function buatTabelPerkalian(n) {
  let hasil = '';
  for (let i = 1; i <= 5; i++) {
    hasil += `${n} x ${i} = ${n * i}\n`;
  }
  return hasil;
}

const perkalian = buatTabelPerkalian(3);

const nilai = [90, 80, 75, 98, 85];
const nilaiTertinggi = Math.max(...nilai);
const nilaiTerendah = Math.min(...nilai);

const hasilNilai = `
Nilai tertinggi: ${nilaiTertinggi}
Nilai terendah: ${nilaiTerendah}
`;

async function ambilDataUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const userList = users.slice(0, 3).map((user) => {
      return `ID: ${user.id}\nNama: ${user.name}\nEmail: ${user.email}`;
    }).join('\n\n');

    if (typeof document !== 'undefined') {
      const userOutput = document.getElementById('userOutput');
      if (userOutput) {
        userOutput.textContent = userList;
      }
    }

    return userList;
  } catch (error) {
    const errorMessage = `Gagal mengambil data: ${error.message}`;

    if (typeof document !== 'undefined') {
      const userOutput = document.getElementById('userOutput');
      if (userOutput) {
        userOutput.textContent = errorMessage;
      }
    }

    console.error(errorMessage);
    return errorMessage;
  }
}

if (typeof document !== 'undefined') {
  const biodataOutput = document.getElementById('biodataOutput');
  const kabisatOutput = document.getElementById('kabisatOutput');
  const perkalianOutput = document.getElementById('perkalianOutput');
  const nilaiOutput = document.getElementById('nilaiOutput');
  const ambilUserBtn = document.getElementById('ambilUserBtn');

  if (biodataOutput) {
    biodataOutput.textContent = biodata;
  }

  if (kabisatOutput) {
    kabisatOutput.textContent = hasilKabisat;
  }

  if (perkalianOutput) {
    perkalianOutput.textContent = perkalian;
  }

  if (nilaiOutput) {
    nilaiOutput.textContent = hasilNilai;
  }

  if (ambilUserBtn) {
    ambilUserBtn.addEventListener('click', () => {
      ambilDataUser();
    });
  }
}

console.log(biodata);
console.log(hasilKabisat);
console.log(perkalian);
console.log(hasilNilai);
