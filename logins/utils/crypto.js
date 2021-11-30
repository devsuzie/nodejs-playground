import CryptoJS from 'crypto-js'

export const encrypt = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

export const decrypt = (data, key) => {
  const decryptedData = CryptoJS.AES.decrypt(data, key)
  return JSON.parse(decryptedData.toString(CryptoJS.enc.utf8))
}
