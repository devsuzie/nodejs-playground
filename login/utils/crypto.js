const CryptoJS = require('crypto-js');

const encrypt = data => {
  return CryptoJS.AES.encrypt(data, process.env.CRYPTOJS_SECRET).toString();
};

const decrypt = data => {
  return CryptoJS.AES.decrypt(data, process.env.CRYPTOJS_SECRET).toString(
    CryptoJS.enc.Utf8,
  );
};

module.exports = {encrypt, decrypt};
