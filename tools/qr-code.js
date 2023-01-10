const QRCode = require('qrcode')
const bcrypt = require('bcryptjs')

/*
產出字串化的QR碼，以下用 X 指稱。將 X 加入 HTML 的 img 標籤 src 屬性，即可在前端顯示內容為 text 的二維碼。若 text 為網址，則掃碼後會透過瀏覽器以 GET 方法發送請求。
函式 generateEncryptedQR 用以產出每日、每位員工專屬的打卡QR碼，並在輸出值中加入防偽雜湊值。
防偽雜湊值 encrypted_value 加密前格式：＠IP員工編號yyyy-mm-ddj*K4$29r#U!h
*/
const generateEncryptedQR = async (ip, employeeCode, today, baseUrl) => {
  try {
    const string = `@${ip}${employeeCode}${today}j*K4$29r#U!h`
    const hash = bcrypt.hashSync(
      string,
      bcrypt.genSaltSync(10)
    )
    // 如果防偽雜湊值含有斜線符號，將導致路由處理失敗，因此用正規表達式替換。未來比對雜湊值之前，需先將slash轉換回斜線符號。
    const hashWithoutSlash = hash.replace(/\//g, 'slash')
    const url = `${baseUrl}/api/punches/${hashWithoutSlash}`
    return await QRCode.toDataURL(url)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  generateEncryptedQR
}
