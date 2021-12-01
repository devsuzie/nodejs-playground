const CryptoJS = require('crypto-js')

const encrypt = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

const decrypt = (data, key) => {
  const decryptedData = CryptoJS.AES.decrypt(data, key)
  return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8))
}

module.exports = {encrypt, decrypt}
