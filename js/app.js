// Memuat data dari localStorage saat halaman dimuat
window.onload = function () {
    tampilkanRakBelumDibaca();
    tampilkanRakSudahDibaca();
};
// Fungsi untuk menambahkan buku
function tambahBuku() {
    const judulBuku = document.getElementById('judulBuku').value;
    const penulisBuku = document.getElementById('penulisBuku').value;
    const tahunTerbit = document.getElementById('tahunTerbit').value;
    const penerbit = document.getElementById('penerbit').value;

    if (judulBuku.trim() === '') {
        alert('Harap masukkan judul buku.');
        return;
    }

    const buku = {
        judul: judulBuku,
        penulis: penulisBuku,
        tahun: tahunTerbit,
        penerbit: penerbit,
        sudahDibaca: false
    };

    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    rakBelumDibaca.push(buku);
    localStorage.setItem('belumDibaca', JSON.stringify(rakBelumDibaca));

    tampilkanRakBelumDibaca();
    document.getElementById('judulBuku').value = '';
    document.getElementById('penulisBuku').value = '';
    document.getElementById('tahunTerbit').value = '';
    document.getElementById('penerbit').value = '';
}


// Fungsi untuk menampilkan buku di rak belum dibaca
function tampilkanRakBelumDibaca() {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const belumDibacaList = document.getElementById('belumDibacaList');
    belumDibacaList.innerHTML = '';

    for (const buku of rakBelumDibaca) {
        const li = document.createElement('li');
        li.textContent = buku.judul;
        const buttonBaca = document.createElement('button');
        buttonBaca.textContent = 'Sudah Dibaca';
        buttonBaca.addEventListener('click', () => pindahKeRakSudahDibaca(buku));
        li.appendChild(buttonBaca);
        belumDibacaList.appendChild(li);
    }
}

// ...

// Fungsi untuk memindahkan buku ke rak sudah dibaca
function pindahKeRakSudahDibaca(buku) {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];

    // Hapus buku dari rak belum dibaca
    const index = rakBelumDibaca.findIndex((item) => item.judul === buku.judul);
    if (index !== -1) {
        rakBelumDibaca.splice(index, 1);
    }

    // Tambahkan buku ke rak sudah dibaca
    buku.sudahDibaca = true;
    rakSudahDibaca.push(buku);

    localStorage.setItem('belumDibaca', JSON.stringify(rakBelumDibaca));
    localStorage.setItem('sudahDibaca', JSON.stringify(rakSudahDibaca));

    tampilkanRakBelumDibaca();
    tampilkanRakSudahDibaca();
}

// Fungsi untuk memindahkan buku kembali ke rak belum dibaca
function pindahKeRakBelumDibaca(buku) {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];

    // Hapus buku dari rak sudah dibaca
    const index = rakSudahDibaca.findIndex((item) => item.judul === buku.judul);
    if (index !== -1) {
        rakSudahDibaca.splice(index, 1);
    }

    // Tambahkan buku kembali ke rak belum dibaca
    buku.sudahDibaca = false;
    rakBelumDibaca.push(buku);

    localStorage.setItem('belumDibaca', JSON.stringify(rakBelumDibaca));
    localStorage.setItem('sudahDibaca', JSON.stringify(rakSudahDibaca));

    tampilkanRakBelumDibaca();
    tampilkanRakSudahDibaca();
}



// Fungsi untuk menghapus buku
function hapusBuku(judul) {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];

    // Hapus buku dari rak belum dibaca
    let index = rakBelumDibaca.findIndex((item) => item.judul === judul);
    if (index !== -1) {
        rakBelumDibaca.splice(index, 1);
        localStorage.setItem('belumDibaca', JSON.stringify(rakBelumDibaca));
        tampilkanRakBelumDibaca();
        return;
    }

    // Hapus buku dari rak sudah dibaca
    index = rakSudahDibaca.findIndex((item) => item.judul === judul);
    if (index !== -1) {
        rakSudahDibaca.splice(index, 1);
        localStorage.setItem('sudahDibaca', JSON.stringify(rakSudahDibaca));
        tampilkanRakSudahDibaca();
    }
}


// Fungsi untuk menampilkan buku di rak belum dibaca
function tampilkanRakBelumDibaca() {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const belumDibacaList = document.getElementById('belumDibacaList');
    belumDibacaList.innerHTML = '';

    for (const buku of rakBelumDibaca) {
        const card = document.createElement('div'); // Buat elemen card
        card.classList.add('card'); // Tambahkan class card

        const judul = document.createElement('p');
        judul.textContent = `Judul: ${buku.judul}`;
        card.appendChild(judul);

        const penulis = document.createElement('p');
        penulis.textContent = `Penulis: ${buku.penulis}`;
        card.appendChild(penulis);

        const tahun = document.createElement('p');
        tahun.textContent = `Tahun Terbit: ${buku.tahun}`;
        card.appendChild(tahun);

        const penerbit = document.createElement('p');
        penerbit.textContent = `Penerbit: ${buku.penerbit}`;
        card.appendChild(penerbit);

        const buttonBaca = document.createElement('button');
        buttonBaca.textContent = 'Sudah Dibaca';
        buttonBaca.addEventListener('click', () => pindahKeRakSudahDibaca(buku));
        card.appendChild(buttonBaca);

        const buttonHapus = document.createElement('button');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.addEventListener('click', () => hapusBuku(buku.judul));
        card.appendChild(buttonHapus);

        belumDibacaList.appendChild(card);
    }

    tampilkanRakSudahDibaca();
}

// Fungsi untuk menampilkan buku di rak sudah dibaca
function tampilkanRakSudahDibaca() {
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];
    const sudahDibacaList = document.getElementById('sudahDibacaList');
    sudahDibacaList.innerHTML = '';

    for (const buku of rakSudahDibaca) {
        const card = document.createElement('div'); // Buat elemen card
        card.classList.add('card'); // Tambahkan class card

        const judul = document.createElement('p');
        judul.textContent = `Judul: ${buku.judul}`;
        card.appendChild(judul);

        const penulis = document.createElement('p');
        penulis.textContent = `Penulis: ${buku.penulis}`;
        card.appendChild(penulis);

        const tahun = document.createElement('p');
        tahun.textContent = `Tahun Terbit: ${buku.tahun}`;
        card.appendChild(tahun);

        const penerbit = document.createElement('p');
        penerbit.textContent = `Penerbit: ${buku.penerbit}`;
        card.appendChild(penerbit);

        const buttonKembali = document.createElement('button');
        buttonKembali.textContent = 'Kembali ke Belum Dibaca';
        buttonKembali.addEventListener('click', () => pindahKeRakBelumDibaca(buku));
        card.appendChild(buttonKembali);

        const buttonHapus = document.createElement('button');
        buttonHapus.textContent = 'Hapus';
        buttonHapus.addEventListener('click', () => hapusDariRakSudahDibaca(buku.judul));
        card.appendChild(buttonHapus);

        sudahDibacaList.appendChild(card);
    }
}

// Fungsi untuk memindahkan buku kembali ke rak belum dibaca
function pindahKeRakBelumDibaca(buku) {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];

    // Hapus buku dari rak sudah dibaca
    const index = rakSudahDibaca.findIndex((item) => item.judul === buku.judul);
    rakSudahDibaca.splice(index, 1);

    // Tambahkan buku kembali ke rak belum dibaca
    buku.sudahDibaca = false;
    rakBelumDibaca.push(buku);

    localStorage.setItem('belumDibaca', JSON.stringify(rakBelumDibaca));
    localStorage.setItem('sudahDibaca', JSON.stringify(rakSudahDibaca));

    tampilkanRakBelumDibaca();
    tampilkanRakSudahDibaca();
}

// Fungsi untuk menghapus buku dari rak sudah dibaca
function hapusDariRakSudahDibaca(judul) {
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];

    // Hapus buku dari rak sudah dibaca
    const index = rakSudahDibaca.findIndex((item) => item.judul === judul);
    rakSudahDibaca.splice(index, 1);

    localStorage.setItem('sudahDibaca', JSON.stringify(rakSudahDibaca));
    tampilkanRakSudahDibaca();
}
// Fungsi untuk mencari buku
function cariBuku() {
    const kataKunci = document.getElementById('cariInput').value.toLowerCase();
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];
    const hasilPencarian = document.getElementById('hasilPencarian');
    hasilPencarian.innerHTML = '';

    if (kataKunci.trim() === '') {
        return; // Jika kata kunci kosong, keluar dari fungsi
    }

    // Cari di rak belum dibaca
    for (const buku of rakBelumDibaca) {
        if (buku.judul.toLowerCase().includes(kataKunci)) {
            const li = document.createElement('li');
            li.textContent = `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Tahun Terbit: ${buku.tahun}, Penerbit: ${buku.penerbit}`;
            hasilPencarian.appendChild(li);
        }
    }

    // Cari di rak sudah dibaca
    for (const buku of rakSudahDibaca) {
        if (buku.judul.toLowerCase().includes(kataKunci)) {
            const li = document.createElement('li');
            li.textContent = `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Tahun Terbit: ${buku.tahun}, Penerbit: ${buku.penerbit}`;
            hasilPencarian.appendChild(li);
        }
    }
}

// Fungsi untuk menampilkan semua data buku
function tampilkanSemuaData() {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];
    const hasilPencarian = document.getElementById('hasilPencarian');
    hasilPencarian.innerHTML = '';

    // Tampilkan data dari rak belum dibaca
    for (const buku of rakBelumDibaca) {
        const li = document.createElement('li');
        li.textContent = `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Tahun Terbit: ${buku.tahun}, Penerbit: ${buku.penerbit}`;
        hasilPencarian.appendChild(li);
    }

    // Tampilkan data dari rak sudah dibaca
    for (const buku of rakSudahDibaca) {
        const li = document.createElement('li');
        li.textContent = `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Tahun Terbit: ${buku.tahun}, Penerbit: ${buku.penerbit}`;
        hasilPencarian.appendChild(li);
    }
}



// Fungsi untuk memuat data dari rak "Belum Dibaca"
function loadDataBelumDibaca() {
    const rakBelumDibaca = JSON.parse(localStorage.getItem('belumDibaca')) || [];
    const hasilPencarian = document.getElementById('hasilPencarian');
    hasilPencarian.innerHTML = '';

    for (const buku of rakBelumDibaca) {
        const li = document.createElement('li');
        li.textContent = `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Tahun Terbit: ${buku.tahun}, Penerbit: ${buku.penerbit}`;
        hasilPencarian.appendChild(li);
    }
}

// Fungsi untuk memuat data dari rak "Sudah Dibaca"
function loadDataSudahDibaca() {
    const rakSudahDibaca = JSON.parse(localStorage.getItem('sudahDibaca')) || [];
    const hasilPencarian = document.getElementById('hasilPencarian');
    hasilPencarian.innerHTML = '';

    for (const buku of rakSudahDibaca) {
        const li = document.createElement('li');
        li.textContent = `Judul: ${buku.judul}, Penulis: ${buku.penulis}, Tahun Terbit: ${buku.tahun}, Penerbit: ${buku.penerbit}`;
        hasilPencarian.appendChild(li);
    }
}







