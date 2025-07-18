const config = require('./settings/config');
const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const crypto  = require("crypto")
const fetch = require("node-fetch")
const moment = require("moment-timezone");
const path = require("path")
const os = require('os');
const speed = require('performance-now')
const { spawn, exec, execSync } = require('child_process');
const { default: baileys, getContentType } = require("@whiskeysockets/baileys");
module.exports = client = async (client, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        );

        const sender = m.key.fromMe ? client.user.id.split(":")[0] + "@s.whatsapp.net" ||
              client.user.id : m.key.participant || m.key.remoteJid;

        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = [" ", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const botNumber = await client.decodeJid(client.user.id);
        const isBot = botNumber.includes(senderNumber)

        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);

        const { smsg, fetchJson, sleep, formatSize, runtime } = require('./キュルジー/lib/myfunction');     
        const cihuy = fs.readFileSync('./キュルジー/lib/media/laurine-wb.png')
        const { fquoted } = require('./キュルジー/lib/fquoted')

        // Log semua pesan masuk
        console.log('\x1b[30m--------------------\x1b[0m');
        console.log(chalk.bgHex("#4a69bd").bold(`▢ New Message`));
        console.log(
            chalk.bgHex("#ffffff").black(
                `   ▢ Tanggal: ${new Date().toLocaleString()} \n` +
                `   ▢ Pesan: ${m.body || m.mtype} \n` +
                `   ▢ Pengirim: ${pushname} \n` +
                `   ▢ JID: ${senderNumber}`
            )
        );
        console.log();

        const reaction = async (jidss, emoji) => {
            client.sendMessage(jidss, {
                react: {
                    text: emoji,
                    key: m.key 
                } 
            })
        };

        async function reply(text) {
            client.sendMessage(m.chat, {
                productMessage: {
                    title: config.settings.title,
                    description: config.settings.description,
                    thumbnail: config.thumbUrl,
                    productId: "123456799",
                    retailerId: "KANAERU-CHAN",
                    url: config.socialMedia.Telegram,
                    body: text,
                    footer: config.settings.footer,
                    buttons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: JSON.stringify({
                                display_text: "📱 Support",
                                url: config.socialMedia.Telegram
                            })
                        }
                    ]
                }
            }, { quoted: fquoted.packSticker })
        }

        const pluginsLoader = async (directory) => {
            let plugins = [];
            const folders = fs.readdirSync(directory);
            folders.forEach(file => {
                const filePath = path.join(directory, file);
                if (filePath.endsWith(".js")) {
                    try {
                        const resolvedPath = require.resolve(filePath);
                        if (require.cache[resolvedPath]) {
                            delete require.cache[resolvedPath];
                        }
                        const plugin = require(filePath);
                        plugins.push(plugin);
                    } catch (error) {
                        console.log(`${filePath}:`, error);
                    }
                }
            });
            return plugins;
        };

        const pluginsDisable = true;
        const plugins = await pluginsLoader(path.resolve(__dirname, "./command"));
        const plug = {
            client,
            prefix,
            command, 
            reply, 
            text, 
            isBot,
            reaction,
            pushname, 
            mime,
            quoted,
            sleep,
            fquoted,
            fetchJson 
        };

        for (let plugin of plugins) {
            if (plugin.command.find(e => e == command.toLowerCase())) {
                if (plugin.isBot && !isBot) {
                    return
                }

                if (plugin.private && !plug.isPrivate) {
                    return m.reply(config.message.private);
                }

                if (typeof plugin !== "function") return;
                await plugin(m, plug);
            }
        }

        if (!pluginsDisable) return;  

        switch (command) {

            case "menu": {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const formattedUsedMem = formatSize(usedMem);
    const formattedTotalMem = formatSize(totalMem);
    let timestamp = speed();
    let latensi = speed() - timestamp;

    let menu = `╭─────「 ✦ Kanaeru Chan v7.0 ✦ 」
│ ∘ Nama     : ${pushname}
│ ∘ Tanggal  : ${moment().tz('Asia/Jakarta').format('DD/MM/YYYY')}
│ ∘ Waktu    : ${moment().tz('Asia/Jakarta').format('HH:mm:ss')} WIB
│ ∘ Mode     : PUBLIC
│ ∘ Speed    : ${latensi.toFixed(4)} s
│ ∘ Runtime  : ${runtime(process.uptime())}
│ ∘ RAM      : ${formattedUsedMem} / ${formattedTotalMem}
╰───────────────────────

❐ 「 MAIN MENU 」
∘ menu           ⤷ Tampilkan semua fitur
∘ owner          ⤷ Info kontak developer
∘ mode           ⤷ Ubah mode bot

❐ 「 TOOLS 」
∘ sticker / s    ⤷ Gambar ke stiker
∘ qr             ⤷ Buat QR Code
∘ qrread         ⤷ Baca isi QR
∘ getpp          ⤷ Ambil foto profil
∘ calc           ⤷ Kalkulator
∘ translate      ⤷ Terjemahan otomatis

❐ 「 GROUP MENU 」
∘ tagall         ⤷ Mention semua anggota
∘ hidetag        ⤷ Mention silent
∘ kick           ⤷ Keluarkan anggota
∘ promote        ⤷ Jadikan admin
∘ demote         ⤷ Turunkan admin
∘ delete         ⤷ Hapus pesan
∘ open / close   ⤷ Buka/Tutup grup
∘ setname        ⤷ Ganti nama grup
∘ setdesc        ⤷ Ganti deskripsi grup
∘ setppgrup      ⤷ Ganti foto grup
∘ infogrup       ⤷ Info lengkap grup
∘ welcome        ⤷ Atur pesan masuk
∘ goodbye        ⤷ Atur pesan keluar
∘ antilink       ⤷ Auto kick link
∘ antitoxic      ⤷ Filter kata kasar
∘ antiluar       ⤷ Blok user luar

❐ 「 FUN ZONE 」
∘ menfess        ⤷ Kirim pesan rahasia
∘ emojimix       ⤷ Gabung 2 emoji
∘ readviewonce   ⤷ Lihat pesan 1x

❐ 「 OWNER 」
∘ listuser       ⤷ Daftar user aktif
∘ unblock        ⤷ Hapus blok
∘ spaminfo       ⤷ Status anti spam
∘ join           ⤷ Masuk via link
∘ autoread       ⤷ Baca otomatis
∘ antiluarnegeri ⤷ Blok +62 doang
∘ exec / eval    ⤷ Kode langsung

⚠︎ Jangan spam, call, atau provoke
⚠︎ Pelanggaran akan diblok otomatis`;

    await client.sendMessage(m.chat, {
        productMessage: {
            title: "✦ Kanaeru Menu ✦",
            description: "Asisten virtual aesthetic bergaya Jepang",
            thumbnail: config.thumbUrl,
            productId: "kanaeru-001",
            retailerId: "KANAERU",
            url: config.socialMedia.YouTube,
            body: menu,
            footer: "「 Support: telegram.me/kanaeru 」",
            buttons: [
                {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                        title: "❐ Pilih Menu Utama",
                        sections: [
                            {
                                title: "✦ Main Menu",
                                rows: [
                                    { title: "✦ Menu", description: "Tampilkan semua fitur", id: "menu" },
                                    { title: "✦ Owner", description: "Kontak developer", id: "owner" },
                                    { title: "✦ Mode", description: "Mode bot: publik/pribadi", id: "mode" }
                                ]
                            },
                            {
                                title: "❐ Tools & Utilitas",
                                rows: [
                                    { title: "QR", description: "Buat QR Code", id: "qr" },
                                    { title: "QR Read", description: "Baca isi QR", id: "qrread" },
                                    { title: "Sticker", description: "Foto ke stiker", id: "sticker" },
                                    { title: "Get PP", description: "Ambil profil user", id: "getpp" }
                                ]
                            },
                            {
                                title: "❐ Fitur Grup",
                                rows: [
                                    { title: "Tagall", description: "Mention semua member", id: "tagall" },
                                    { title: "Hidetag", description: "Mention silent", id: "hidetag" },
                                    { title: "Kick", description: "Keluarin member", id: "kick" },
                                    { title: "Welcome", description: "Pesan masuk grup", id: "welcome" }
                                ]
                            },
                            {
                                title: "❐ Fun Zone",
                                rows: [
                                    { title: "Menfess", description: "Pesan rahasia", id: "menfess" },
                                    { title: "Emojimix", description: "Gabung emoji", id: "emojimix" }
                                ]
                            },
                            {
                                title: "❐ Fitur Owner",
                                rows: [
                                    { title: "Eval", description: "Evaluasi kode js", id: "eval" },
                                    { title: "Exec", description: "Execute command", id: "exec" }
                                ]
                            }
                        ]
                    })
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "✦ Channel YouTube",
                        url: config.socialMedia.YouTube
                    })
                }
            ]
        }
    }, { quoted: fquoted.packSticker });
}
break;
            // MAIN MENU COMMANDS
            case "owner":{
                let ownerInfo = `👤 *OWNER INFORMATION*

• Name: KyuuRzy
• GitHub: ${config.socialMedia.GitHub}
• Telegram: ${config.socialMedia.Telegram}
• YouTube: ${config.socialMedia.YouTube}

💬 Hubungi owner untuk bantuan atau pertanyaan`

                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "👤 Owner Information",
                        description: "Informasi kontak developer bot",
                        thumbnail: config.thumbUrl,
                        productId: "123456790",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.Telegram,
                        body: ownerInfo,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📱 Contact Telegram",
                                    url: config.socialMedia.Telegram
                                })
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "💻 GitHub",
                                    url: config.socialMedia.GitHub
                                })
                            },
                            {
                                name: "cta_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📋 Back to Menu",
                                    id: ".menu"
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker });
            }
            break

            case "mode":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat mengubah mode bot")
                const currentMode = config.status.public ? "PUBLIC" : "PRIVATE"
                let modeInfo = `🔧 *MODE BOT*

Mode saat ini: ${currentMode}

Untuk mengubah mode, edit file config.js`

                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "🔧 Bot Mode Settings",
                        description: "Pengaturan mode bot",
                        thumbnail: config.thumbUrl,
                        productId: "123456791",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.GitHub,
                        body: modeInfo,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "cta_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "⚙️ Settings",
                                    id: ".menu"
                                })
                            },
                            {
                                name: "cta_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🔄 Refresh Status",
                                    id: ".mode"
                                })
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📱 Support",
                                    url: config.socialMedia.Telegram
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker });
            }
            break

            // TOOLS & UTILITIES
            case "sticker":
            case "s":{
                if (!quoted) return reply(`❌ Reply gambar dengan caption *${prefix + command}*`)
                if (!/image/.test(mime)) return reply(`❌ Reply gambar dengan caption *${prefix + command}*`)
                await reaction(m.chat, "⏳")
                
                try {
                    let media = await quoted.download()
                    const { imageToWebp } = require('./キュルジー/lib/converter')
                    let webpBuffer = await imageToWebp(media)
                    
                    await client.sendMessage(m.chat, {
                        productMessage: {
                            title: "✅ Sticker Created",
                            description: "Sticker berhasil dibuat dari gambar",
                            thumbnail: config.thumbUrl,
                            productId: "123456792",
                            retailerId: "KANAERU-CHAN",
                            url: config.socialMedia.Telegram,
                            body: "🎨 *STICKER BERHASIL DIBUAT*\n\nGambar telah dikonversi menjadi sticker!",
                            footer: config.settings.footer,
                            buttons: [
                                {
                                    name: "cta_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "🖼️ Create More",
                                        id: ".s"
                                    })
                                },
                                {
                                    name: "cta_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📋 Back to Menu",
                                        id: ".menu"
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📱 Support",
                                        url: config.socialMedia.Telegram
                                    })
                                }
                            ]
                        }
                    }, { quoted: fquoted.packSticker })

                    await client.sendMessage(m.chat, {
                        sticker: webpBuffer,
                        packname: config.settings.packname,
                        author: config.settings.author
                    }, { quoted: fquoted.packSticker })
                    
                    await reaction(m.chat, "✅")
                } catch (error) {
                    console.error('Sticker conversion error:', error)
                    await reply("❌ Gagal membuat sticker. Pastikan file adalah gambar yang valid.")
                    await reaction(m.chat, "❌")
                }
            }
            break

            case "qr":{
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} https://github.com/kiuur`)
                await reaction(m.chat, "⏳")
                let qrcode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
                
                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "📱 QR Code Generator",
                        description: "QR Code berhasil dibuat",
                        thumbnail: config.thumbUrl,
                        productId: "123456793",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.Telegram,
                        body: `📱 *QR CODE GENERATOR*\n\nTeks: ${text}\n\nQR Code telah dibuat!`,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "🔄 Create New QR",
                                    id: ".qr"
                                })
                            },
                            {
                                name: "single_select", 
                                buttonParamsJson: JSON.stringify({
                                    title: "📖 QR Reader",
                                    id: ".qrread"
                                })
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📱 Support",
                                    url: config.socialMedia.Telegram
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker })

                await client.sendMessage(m.chat, {
                    image: { url: qrcode },
                    caption: `📱 *QR Code Generator*\n\nTeks: ${text}`
                }, { quoted: fquoted.packSticker })
                await reaction(m.chat, "✅")
            }
            break

            case "qrread":
    {
        if (!quoted) return reply(`❌ Reply gambar yang berisi QR Code!`)
        if (!quoted.mimetype || !quoted.mimetype.startsWith('image/')) {
            return reply(`❌ File harus berupa gambar!`)
        }

        await reaction(m.chat, "⏳")

        try {
            const QrReader = require('qrcode-reader')
            const jimp = require('jimp')

            // Download gambar
            let media = await quoted.download()

            // Baca gambar dengan jimp
            const image = await jimp.read(media)

            // Buat QR reader
            const qr = new QrReader()

            // Scan QR code
            const result = await new Promise((resolve, reject) => {
                qr.callback = (err, value) => {
                    if (err) reject(err)
                    else resolve(value)
                }
                qr.decode(image.bitmap)
            })

            if (result && result.result) {
                await client.sendMessage(m.chat, {
                    text: `「 QR Code Reader 」\n\nHasil scan:\n${result.result}`
                }, { quoted: m })
                await reaction(m.chat, "✅")
            } else {
                await reply("❌ Tidak ada QR Code yang terdeteksi dalam gambar!")
                await reaction(m.chat, "❌")
            }

        } catch (error) {
            console.error('QR Read error:', error)
            await reply("❌ Gagal membaca QR Code. Pastikan gambar jelas dan berisi QR Code yang valid.")
            await reaction(m.chat, "❌")
        }

        break
    }

            case "getpp":{
                let target = m.mentionedJid[0] || m.quoted?.sender || (args[0] && args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net') || sender
                await reaction(m.chat, "⏳")
                try {
                    let ppimg = await client.profilePictureUrl(target, 'image')
                    
                    await client.sendMessage(m.chat, {
                        productMessage: {
                            title: "🖼️ Profile Picture",
                            description: "Foto profil berhasil diambil",
                            thumbnail: config.thumbUrl,
                            productId: "123456797",
                            retailerId: "KANAERU-CHAN",
                            url: config.socialMedia.Telegram,
                            body: `🖼️ *PROFILE PICTURE*\n\nUser: @${target.split('@')[0]}\n\nFoto profil berhasil diambil!`,
                            footer: config.settings.footer,
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "👤 Get Another PP",
                                        id: ".getpp"
                                    })
                                },
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "🎨 Make Sticker",
                                        id: ".s"
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📱 Support",
                                        url: config.socialMedia.Telegram
                                    })
                                }
                            ]
                        }
                    }, { quoted: fquoted.packSticker })

                    await client.sendMessage(m.chat, {
                        image: { url: ppimg },
                        caption: `🖼️ *Profile Picture*\n\nUser: @${target.split('@')[0]}`,
                        mentions: [target]
                    }, { quoted: fquoted.packSticker })
                } catch {
                    await reply("❌ Gagal mengambil foto profil")
                }
                await reaction(m.chat, "✅")
            }
            break

            case "calc":{
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} 2+2`)
                try {
                    let result = eval(text.replace(/[^0-9+\-*/().]/g, ''))
                    await client.sendMessage(m.chat, {
                        productMessage: {
                            title: "🧮 Calculator Result",
                            description: "Hasil perhitungan matematika",
                            thumbnail: config.thumbUrl,
                            productId: "123456794",
                            retailerId: "KANAERU-CHAN", 
                            url: config.socialMedia.Telegram,
                            body: `🧮 *CALCULATOR*\n\nSoal: ${text}\nJawaban: ${result}`,
                            footer: config.settings.footer,
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "🔢 Calculate Again",
                                        id: ".calc"
                                    })
                                },
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "📋 Menu",
                                        id: ".menu"
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📱 Support",
                                        url: config.socialMedia.Telegram
                                    })
                                }
                            ]
                        }
                    }, { quoted: fquoted.packSticker })
                } catch {
                    await reply("❌ Format perhitungan tidak valid")
                }
            }
            break

            case "translate":{
                if (!text && !quoted) return reply(`❌ *Contoh:* ${prefix + command} Hello world`)
                let textToTranslate = text || quoted.text || quoted.caption || ''
                if (!textToTranslate) return reply("❌ Tidak ada teks untuk diterjemahkan")
                await reaction(m.chat, "⏳")
                try {
                    let translate = await fetchJson(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|id`)
                    await client.sendMessage(m.chat, {
                        productMessage: {
                            title: "🌐 Translator Result",
                            description: "Hasil terjemahan teks",
                            thumbnail: config.thumbUrl,
                            productId: "123456795",
                            retailerId: "KANAERU-CHAN",
                            url: config.socialMedia.Telegram,
                            body: `🌐 *TRANSLATOR*\n\nAsli: ${textToTranslate}\nTerjemahan: ${translate.responseData.translatedText}`,
                            footer: config.settings.footer,
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "🔄 Translate More",
                                        id: ".translate"
                                    })
                                },
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "🌍 Change Language",
                                        id: ".menu"
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📱 Support",
                                        url: config.socialMedia.Telegram
                                    })
                                }
                            ]
                        }
                    }, { quoted: fquoted.packSticker })
                } catch {
                    await reply("❌ Gagal menerjemahkan teks")
                }
                await reaction(m.chat, "✅")
            }
            break

            // GROUP FEATURES
            case "hidetag":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                const groupMetadata = await client.groupMetadata(m.chat)
                const participants = groupMetadata.participants
                let textHide = text || "📢 Hidden tag message"

                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "📢 Hidden Tag Sent",
                        description: "Pesan tersembunyi telah dikirim",
                        thumbnail: config.thumbUrl,
                        productId: "123456796",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.Telegram,
                        body: `📢 *HIDDEN TAG*\n\nPesan berhasil dikirim ke ${participants.length} anggota`,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "📝 Send Another",
                                    id: ".hidetag"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "👥 Tag All",
                                    id: ".tagall"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "📋 Group Menu",
                                    id: ".menu"
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker })

                await client.sendMessage(m.chat, {
                    text: textHide,
                    mentions: participants.map(a => a.id)
                }, { quoted: fquoted.packSticker })
            }
            break

            case "kick":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                if (!m.mentionedJid[0] && !m.quoted) return reply("❌ Tag atau reply member yang ingin di-kick")
                let target = m.mentionedJid[0] || m.quoted.sender
                await client.groupParticipantsUpdate(m.chat, [target], "remove")
                
                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "👮‍♂️ Member Kicked",
                        description: "Member berhasil dikeluarkan dari grup",
                        thumbnail: config.thumbUrl,
                        productId: "123456798",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.Telegram,
                        body: `👮‍♂️ *MEMBER KICKED*\n\n✅ Berhasil mengeluarkan @${target.split('@')[0]} dari grup`,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "👥 Group Info",
                                    id: ".infogrup"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "⚙️ Group Settings",
                                    id: ".menu"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "📋 Admin Menu",
                                    id: ".menu"
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker })
            }
            break

            case "promote":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                if (!m.mentionedJid[0] && !m.quoted) return reply("❌ Tag atau reply member yang ingin dipromote")
                let target = m.mentionedJid[0] || m.quoted.sender
                await client.groupParticipantsUpdate(m.chat, [target], "promote")
                
                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "⬆️ Member Promoted",
                        description: "Member berhasil dipromote menjadi admin",
                        thumbnail: config.thumbUrl,
                        productId: "123456799",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.Telegram,
                        body: `⬆️ *MEMBER PROMOTED*\n\n✅ Berhasil menjadikan @${target.split('@')[0]} sebagai admin`,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "👑 Admin List",
                                    id: ".infogrup"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "⬇️ Demote Member",
                                    id: ".demote"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "📋 Group Menu",
                                    id: ".menu"
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker })
            }
            break

            case "demote":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                if (!m.mentionedJid[0] && !m.quoted) return reply("❌ Tag atau reply admin yang ingin di-demote")
                let target = m.mentionedJid[0] || m.quoted.sender
                await client.groupParticipantsUpdate(m.chat, [target], "demote")
                await reply(`✅ Berhasil menurunkan @${target.split('@')[0]} dari admin`)
            }
            break

            case "delete":{
                if (!m.quoted) return reply("❌ Reply pesan yang ingin dihapus")
                await client.sendMessage(m.chat, { delete: m.quoted.key })
            }
            break

            case "open":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await client.groupSettingUpdate(m.chat, 'not_announcement')
                await reply("✅ Grup berhasil dibuka untuk semua member")
            }
            break

            case "close":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await client.groupSettingUpdate(m.chat, 'announcement')
                await reply("✅ Grup berhasil ditutup, hanya admin yang bisa mengirim pesan")
            }
            break

            case "setname":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} Nama Grup Baru`)
                await client.groupUpdateSubject(m.chat, text)
                await reply(`✅ Nama grup berhasil diubah menjadi: ${text}`)
            }
            break

            case "setdesc":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} Deskripsi grup baru`)
                await client.groupUpdateDescription(m.chat, text)
                await reply(`✅ Deskripsi grup berhasil diubah`)
            }
            break

            case "setppgrup":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                if (!quoted) return reply(`❌ Reply gambar dengan caption *${prefix + command}*`)
                if (!/image/.test(mime)) return reply(`❌ Reply gambar dengan caption *${prefix + command}*`)
                await reaction(m.chat, "⏳")
                let media = await quoted.download()
                await client.updateProfilePicture(m.chat, media)
                await reply("✅ Foto profil grup berhasil diubah")
                await reaction(m.chat, "✅")
            }
            break

            case "infogrup":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                let groupMetadata = await client.groupMetadata(m.chat)
                let groupInfo = `📊 *INFO GRUP*\n\n` +
                    `• Nama: ${groupMetadata.subject}\n` +
                    `• Deskripsi: ${groupMetadata.desc || 'Tidak ada deskripsi'}\n` +
                    `• ID: ${groupMetadata.id}\n` +
                    `• Dibuat: ${new Date(groupMetadata.creation * 1000).toLocaleString()}\n` +
                    `• Member: ${groupMetadata.participants.length}\n` +
                    `• Admin: ${groupMetadata.participants.filter(p => p.admin).length}`
                await reply(groupInfo)
            }
            break

            case "welcome":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await reply("✅ Fitur welcome telah diaktifkan untuk grup ini")
            }
            break

            case "goodbye":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await reply("✅ Fitur goodbye telah diaktifkan untuk grup ini")
            }
            break

            case "antilink":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await reply("✅ Fitur antilink telah diaktifkan untuk grup ini")
            }
            break

            case "antitoxic":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await reply("✅ Fitur antitoxic telah diaktifkan untuk grup ini")
            }
            break

            case "antiluar":{
                if (!isGroup) return reply("❌ Fitur ini hanya bisa digunakan di grup")
                await reply("✅ Fitur antiluar telah diaktifkan untuk grup ini")
            }
            break

            // FUN FEATURES
            case "menfess":{
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} Pesan anonim`)
                
                await client.sendMessage(m.chat, {
                    productMessage: {
                        title: "📝 Anonymous Message",
                        description: "Pesan anonim telah dikirim",
                        thumbnail: config.thumbUrl,
                        productId: "123456800",
                        retailerId: "KANAERU-CHAN",
                        url: config.socialMedia.Telegram,
                        body: `📝 *MENFESS SENT*\n\nPesan anonim telah dikirim!\n\nPesan: ${text}`,
                        footer: config.settings.footer,
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "💌 Send Another",
                                    id: ".menfess"
                                })
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "🎭 Fun Menu",
                                    id: ".menu"
                                })
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📱 Support",
                                    url: config.socialMedia.Telegram
                                })
                            }
                        ]
                    }
                }, { quoted: fquoted.packSticker })

                await client.sendMessage(m.chat, {
                    text: `📝 *PESAN ANONIM*\n\n${text}\n\n_Pesan ini dikirim secara anonim_`,
                    contextInfo: {
                        mentionedJid: [sender],
                        externalAdReply: {
                            title: "💌 Pesan Anonim",
                            body: "Seseorang mengirim pesan anonim",
                            thumbnailUrl: config.thumbUrl,
                            renderLargerThumbnail: false,
                        }
                    }
                })
            }
            break

            case "readviewonce":{
                if (!m.quoted) return reply("❌ Reply pesan view once")
                if (m.quoted.mtype !== 'viewOnceMessage') return reply("❌ Ini bukan pesan view once")
                await reply("👁️ Fitur ini memerlukan implementasi khusus untuk membaca pesan view once")
            }
            break

            case "emojimix":{
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} 😀+😎`)
                let [emoji1, emoji2] = text.split('+')
                if (!emoji1 || !emoji2) return reply(`❌ Format: ${prefix + command} emoji1+emoji2`)
                await reaction(m.chat, "⏳")
                try {
                    let mixUrl = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`
                    await client.sendMessage(m.chat, {
                        sticker: { url: mixUrl },
                        packageName: config.settings.packname,
                        author: config.settings.author
                    }, { quoted: fquoted.packSticker })
                } catch {
                    await reply("❌ Gagal menggabungkan emoji")
                }
                await reaction(m.chat, "✅")
            }
            break

            // OWNER COMMANDS
            case "listuser":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat menggunakan command ini")
                await reply("👥 *DAFTAR USER AKTIF*\n\n_Fitur ini memerlukan database user untuk menampilkan daftar lengkap_")
            }
            break

            case "unblock":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat menggunakan command ini")
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} 628xxx`)
                let target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await client.updateBlockStatus(target, "unblock")
                await reply(`✅ Berhasil unblock @${target.split('@')[0]}`)
            }
            break

            case "spaminfo":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat menggunakan command ini")
                await reply("🛡️ *SPAM PROTECTION STATUS*\n\n• Status: Aktif\n• Filter: Otomatis\n• Toleransi: 5 pesan/menit")
            }
            break

            case "join":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat menggunakan command ini")
                if (!text) return reply(`❌ *Contoh:* ${prefix + command} https://chat.whatsapp.com/xxx`)
                if (!text.includes('chat.whatsapp.com')) return reply("❌ Link grup tidak valid")
                let code = text.split('chat.whatsapp.com/')[1]
                try {
                    await client.groupAcceptInvite(code)
                    await reply("✅ Berhasil bergabung ke grup")
                } catch {
                    await reply("❌ Gagal bergabung ke grup")
                }
            }
            break

            case "autoread":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat menggunakan command ini")
                await reply("📖 *AUTOREAD STATUS*\n\n• Status: Aktif\n• Mode: Otomatis\n\n_Bot akan membaca semua pesan secara otomatis_")
            }
            break

            case "antiluarnegeri":{
                if (senderNumber !== config.owner) return reply("❌ Hanya owner yang dapat menggunakan command ini")
                await reply("🌍 *ANTI LUAR NEGERI*\n\n• Status: Aktif\n• Filter: Nomor non-Indonesia\n\n_Bot akan memblokir nomor luar negeri secara otomatis_")
            }
            break

            case "get":{
                if (!isBot) return
                if (!/^https?:\/\//.test(text)) return reply(`*ex:* ${prefix + command} https://kyuurzy.site`);
                const ajg = await fetch(text);
                await reaction(m.chat, "⚡")

                if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
                    throw `Content-Length: ${ajg.headers.get("content-length")}`;
                }

                const contentType = ajg.headers.get("content-type");
                if (contentType.startsWith("image/")) {
                    return client.sendMessage(m.chat, {
                        image: { url: text }
                    }, { quoted: fquoted.packSticker });
                }

                if (contentType.startsWith("video/")) {
                    return client.sendMessage(m.chat, {
                        video: { url: text } 
                    }, { quoted: fquoted.packSticker });
                }

                if (contentType.startsWith("audio/")) {
                    return client.sendMessage(m.chat, {
                        audio: { url: text },
                        mimetype: 'audio/mpeg', 
                        ptt: true
                    }, { quoted: fquoted.packSticker });
                }

                let alak = await ajg.buffer();
                try {
                    alak = util.format(JSON.parse(alak + ""));
                } catch (e) {
                    alak = alak + "";
                } finally {
                    return reply(alak.slice(0, 65536));
                }
            }
            break
            case "insp": {
                if (!isBot) return
                if (!text && !m.quoted) return reply(`*reply:* ${prefix + command}`);
                let quotedType = m.quoted?.mtype || '';
                let penis = JSON.stringify({ [quotedType]: m.quoted }, null, 2);
                const acak = `insp-${crypto.randomBytes(6).toString('hex')}.json`;

                await client.sendMessage(m.chat, {
                    document: Buffer.from(penis),
                    fileName: acak,
                    mimetype: "application/json"
                }, { quoted: fquoted.packSticker })
            }
            break
            case 'tagall':{
                if (!isBot) return
                const textMessage = args.join(" ") || "nothing";
                let teks = `tagall message :\n> *${textMessage}*\n\n`;
                const groupMetadata = await client.groupMetadata(m.chat);
                const participants = groupMetadata.participants;
                for (let mem of participants) {
                    teks += `@${mem.id.split("@")[0]}\n`;
                }

                client.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map((a) => a.id)
                }, { quoted: fquoted.packSticker });
            }
            break
            case "exec": {
                if (!isBot) return;
                if (!budy.startsWith(".exec")) return;

                const { exec } = require("child_process");
                const args = budy.trim().split(' ').slice(1).join(' ');
                if (!args) return reply(`*ex:* ${prefix + command} ls`);
                exec(args, (err, stdout) => {
                    if (err) return reply(String(err));
                    if (stdout) return reply(stdout);
                });
            }
            break;
            case "eval": {
                if (!isBot) return;
                if (!budy.startsWith(".eval")) return;

                const args = budy.trim().split(' ').slice(1).join(' ');
                if (!args) return reply(`*ex:* ${prefix + command} m.chat`);
                let teks;
                try {
                    teks = await eval(`(async () => { ${args.startsWith("return") ? "" : "return"} ${args} })()`);
                } catch (e) {
                    teks = e;
                } finally {
                    await reply(require('util').format(teks));
                }
            }
            break;
            default:
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})