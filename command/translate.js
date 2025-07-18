
module.exports = {
    command: ['translate', 'tr'],
    isBot: false,
    private: false,
    execute: async (m, { reply, text, quoted, fetchJson, reaction, prefix, command }) => {
        let textToTranslate = text || quoted?.text || quoted?.caption || ''
        
        if (!textToTranslate) return reply(`❌ *Contoh:* ${prefix + command} Hello world`)
        
        await reaction(m.chat, "⏳")
        
        try {
            // Detect language and translate
            let translate = await fetchJson(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|id`)
            
            if (translate.responseStatus === 200) {
                await reply(`🌐 *TRANSLATOR*\n\n• Teks Asli: ${textToTranslate}\n• Terjemahan: ${translate.responseData.translatedText}`)
            } else {
                await reply("❌ Gagal menerjemahkan teks")
            }
        } catch (error) {
            await reply("❌ Terjadi kesalahan saat menerjemahkan")
        }
        
        await reaction(m.chat, "✅")
    }
}
