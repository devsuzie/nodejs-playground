const CryptoJS = require('crypto-js')

const encrypt = data => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.SECRET_KEY,
  ).toString()
}

const decrypt = data => {
  const decryptedData = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY)
  return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8))
}

module.exports = {encrypt, decrypt}
