const CryptoJS = require("crypto-js")

function cryptPassword (password){
    return CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString();
}

module.exports= cryptPassword;