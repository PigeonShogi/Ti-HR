const dayjs = require('dayjs')

module.exports = {
  today: dayjs().format().slice(0, 10) // yyyy-mm-dd
}
