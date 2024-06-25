const crypto = require('crypto-js')
const Base64 = require('crypto-js/enc-base64')

const createHash = (data) => Base64.stringify(crypto.SHA256(data))

export default createHash;
