
const fs = require('fs')
const antilinkPath = './キュルジー/lib/database/antilink.json'

// Create antilink database if not exists
if (!fs.existsSync(antilinkPath)) {
    fs.writeFileSync(antilinkPath, JSON.stringify({}))
}

module.exports = {
    command: ['antilink'],
    isBot: false,
    private: false,
    execute: async (m, { client, reply, isGroup }) => {
        if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
        
        let antilink = JSON.parse(fs.readFileSync(antilinkPath))
        
        if (antilink[m.chat]) {
            delete antilink[m.chat]
            fs.writeFileSync(antilinkPath, JSON.stringify(antilink))
            await reply("✅ Antilink berhasil dinonaktifkan")
        } else {
            antilink[m.chat] = true
            fs.writeFileSync(antilinkPath, JSON.stringify(antilink))
            await reply("✅ Antilink berhasil diaktifkan\n\n📝 Bot akan otomatis menghapus pesan yang mengandung link")
        }
    }
}
