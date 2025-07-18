
module.exports = {
    command: ['calc', 'calculate'],
    isBot: false,
    private: false,
    execute: async (m, { reply, text, prefix, command }) => {
        if (!text) return reply(`❌ *Contoh:* ${prefix + command} 2+2*3`)
        
        try {
            // Clean input and evaluate
            let expression = text.replace(/[^0-9+\-*/().]/g, '')
            if (!expression) return reply("❌ Format perhitungan tidak valid")
            
            let result = eval(expression)
            if (isNaN(result)) return reply("❌ Hasil perhitungan tidak valid")
            
            await reply(`🧮 *CALCULATOR*\n\n• Soal: ${text}\n• Jawaban: ${result}`)
        } catch (error) {
            await reply("❌ Format perhitungan tidak valid")
        }
    }
}
