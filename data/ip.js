// 假設公司只允許下列IP使用二維碼打卡功能。實務上可將公司或在家上班者的IP加入陣列。
module.exports = {
  ipArray: [
    process.env.APPROVED_IP_1,
    process.env.APPROVED_IP_2,
    process.env.APPROVED_IP_3,
    process.env.APPROVED_IP_4,
    process.env.APPROVED_IP_5,
    process.env.APPROVED_IP_6
  ]
}
