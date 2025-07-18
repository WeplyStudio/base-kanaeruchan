const fs = require('fs')

const config = {
    owner: "6285868055463", // Ganti dengan nomor owner yang sebenarnya
    botNumber: "-",
    setPair: "K1UU1212",
    thumbUrl: "https://i.pinimg.com/474x/5b/47/68/5b47680ecda932552e0ea197279ba21d.jpg",
    session: "sessions",
    status: {
        public: true,
        terminal: true,
        reactsw: true
    },
    message: {
        owner: "no, this is for owners only",
        group: "this is for groups only",
        admin: "this command is for admin only",
        private: "this is specifically for private chat"
    },
    settings: {
        title: "Kanaeru Chan Bot",
        packname: 'Kanaeru Chan Bot',
        description: "Asisten virtual yang cepat, ringan, dan siap membantu",
        author: 'Kanaeru Chan',
        footer: "2025 © Kanaeru Chan Bot"
    },
    newsletter: {
        name: "Kanaeru Chan",
        id: "120363301416835342@newsletter"
    },
    socialMedia: {
        YouTube: "https://youtube.com/@kyuurzy",
        GitHub: "https://github.com/kiuur",
        Telegram: "https://t.me/kyuucode",
        ChannelWA: "https://whatsapp.com/channel/0029VaarMc8DZ4Lc33QM3q3N"
    }
}

module.exports = config;

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
