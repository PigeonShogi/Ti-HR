const QRCode = require('qrcode')

// 產出字串化的QR碼，以下用 X 指稱。將 X 加入 HTML 的 img 標籤 src 屬性，即可在前端顯示內容為 text 的二維碼。若 text 為網址，則掃碼後會透過瀏覽器以 GET 方法發送請求。
const generateQR = async (text) => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  generateQR
}
