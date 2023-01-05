const address = require('address')

let macAddress

async function saveMacAddress (value) {
  macAddress = value
}

address.mac(function (_err, addr) {
  saveMacAddress(addr)
})

module.exports = macAddress
