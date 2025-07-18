
const fs = require('fs')
const welcomePath = './キュルジー/lib/database/welcome.json'

// Create welcome database if not exists
if (!fs.existsSync(welcomePath)) {
    fs.writeFileSync(welcomePath, JSON.stringify({}))
}

module.exports = {
    command: ['welcome'],
    isBot: false,
    private: false,
    execute: async (m, { client, reply, isGroup, text }) => {
        if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
        
        let welcome = JSON.parse(fs.readFileSync(welcomePath))
        
        if (text) {
            welcome[m.chat] = text
            fs.writeFileSync(welcomePath, JSON.stringify(welcome))
            await reply(`✅ Pesan welcome berhasil diatur:\n\n${text}`)
        } else {
            if (welcome[m.chat]) {
                delete welcome[m.chat]
                fs.writeFileSync(welcomePath, JSON.stringify(welcome))
                await reply("✅ Pesan welcome berhasil dinonaktifkan")
            } else {
                await reply(`❌ Gunakan format: *${prefix}welcome [pesan]*\n\nContoh: *${prefix}welcome Selamat datang @user di grup @group*`)
            }
        }
    }
}
