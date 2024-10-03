const redline = require("readline-sync");

let hasilSebelumnya = 0;
let riwayat = [];

function tampilkanRiwayat() {
    if (riwayat.length === 0) {
        console.log("Tidak ada riwayat kalkulasi.");
    } else {
        console.log("Riwayat Kalkulasi:");
        riwayat.forEach((item, index) => {
            console.log(`${index + 1}: ${item}`);
        });
    }
}

function simpanRiwayat() {
    const namaFile = redline.question("Masukkan nama file untuk menyimpan riwayat (atau ketik 'cancel' untuk batal): ");
    if (namaFile.toLowerCase() === 'cancel') {
        return;
    }
    const fs = require('fs');
    fs.writeFileSync(namaFile, riwayat.join("\n"));
    console.log(`Riwayat telah disimpan ke file ${namaFile}`);
}

while (true) {
    const inputAngkaPertama = redline.question("Masukkan angka pertama (atau ketik 'riwayat' untuk melihat riwayat atau 'simpan' untuk menyimpan riwayat): ");
    
    // Cek jika input adalah 'riwayat'
    if (inputAngkaPertama.toLowerCase() === 'riwayat') {
        tampilkanRiwayat();
        continue; // Kembali ke awal loop
    }
    
    // Cek jika input adalah 'simpan'
    if (inputAngkaPertama.toLowerCase() === 'simpan') {
        simpanRiwayat();
        continue; // Kembali ke awal loop
    }

    const angkaPertama = parseFloat(inputAngkaPertama);

    const operator = redline.question("Pilih operator (+, -, *, /, %) : ");
    
    let angkaKedua = redline.question("Masukkan angka kedua (atau ketik 'H' untuk menggunakan hasil sebelumnya): ");
    
    if (angkaKedua.toUpperCase() === 'H') {
        angkaKedua = hasilSebelumnya; // Menggunakan hasil sebelumnya
    } else {
        angkaKedua = parseFloat(angkaKedua);
    }

    const requiredOperator = ['+', '-', '*', '/', '%'];

    if (isNaN(angkaPertama) || (isNaN(angkaKedua) && angkaKedua !== hasilSebelumnya)) {
        console.log("Inputan anda tidak valid");
    } else if (!requiredOperator.includes(operator)) {
        console.log("Pilih operator yang tersedia");
    } else {
        const hasil = prosesHasil(angkaPertama, angkaKedua, operator);
        if (hasil !== undefined) {
            hasilSebelumnya = hasil;
            riwayat.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
            console.log(`Hasil: ${hasil}`);
        }
    }

    const lanjut = redline.keyInYNStrict("Ingin melanjutkan perhitungan? (y/n): ");
    if (!lanjut) break;
}

function prosesHasil(inputanPertama, inputanKedua, operator) {
    switch (operator) {
        case "+":
            return inputanPertama + inputanKedua;
        case "-":
            return inputanPertama - inputanKedua;
        case "*":
            return inputanPertama * inputanKedua;
        case "/":
            if (inputanKedua === 0) {
                console.log("Error: Pembagian dengan nol tidak diperbolehkan.");
                return undefined;
            }
            return inputanPertama / inputanKedua;
        case "%":
            return inputanPertama % inputanKedua;
        default:
            console.log("Operator tidak dikenal.");
            return undefined;
    }
}