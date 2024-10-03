const redline = require("readline-sync")

const angkaPertama = parseFloat(redline.question("masukan angka pertama : "))
const operator = redline.question("pilih operator (+, -, *, /, %) : ")
const angkaKedua = parseFloat(redline.question("masukan angka kedua : "))

const requiredOprator = ['+','-','*','/','%'];

if(isNaN(angkaPertama) || isNaN(angkaKedua)) {
    console.log("inputan anda tidak valid");
}else if(!requiredOprator.includes(operator)) {
    console.log("pilih sesuatu operator yang tersedia");
}else {
    const hasil = proccesHasil(angkaPertama, angkaKedua, operator);
    console.log({ hasil });
}

function proccesHasil(inputanPertama, inputanKedua, operator) {
    switch(operator) {
        case "+":
            return inputanPertama + inputanKedua;
        case "-":
            return inputanPertama - inputanKedua;
        case "*":
            return inputanPertama * inputanKedua;
        case "/":
            if (angkaKedua === 0) {
                return console.log("Angka kedua tidak boleh bernilai 0")
            }
            return inputanPertama / inputanKedua;
        case "*":
            return inputanPertama * inputanKedua;
    }
}

