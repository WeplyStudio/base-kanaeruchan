
const config = require('../settings/config')

module.exports = {
    command: ['sticker', 's'],
    isBot: false,
    private: false,
    execute: async (m, { client, reply, reaction, mime, quoted, fquoted }) => {
        if (!quoted) return reply(`❌ Reply gambar dengan caption *${prefix}sticker*`)
        if (!/image/.test(mime)) return reply(`❌ Reply gambar dengan caption *${prefix}sticker*`)
        
        await reaction(m.chat, "⏳")
        let media = await quoted.download()
        
        // Convert to WebP sticker
        const { imageToWebp } = require('../キュルジー/lib/converter')
        let webpBuffer = await imageToWebp(media)
        
        await client.sendMessage(m.chat, {
            sticker: webpBuffer,
            packname: config.settings.packname,
            author: config.settings.author
        }, { quoted: fquoted.packSticker })
        
        await reaction(m.chat, "✅")
    }
}
