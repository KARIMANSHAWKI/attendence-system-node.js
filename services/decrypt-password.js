const CryptoJS = require("crypto-js");

function decryptPassword(password) {
  return CryptoJS.AES.decrypt(password, process.env.PASS_SECRET)
  .toString(
    CryptoJS.enc.Utf8
  );
}

module.exports = decryptPassword;
