<p align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/146603597/467927524-e119b15a-9d93-42da-b3e9-854530d60e4c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T080742Z&X-Amz-Expires=300&X-Amz-Signature=7417c0e12d75b7430480639e942a9caf92555cdc06ff12dc46b19b5a6fdbe20d&X-Amz-SignedHeaders=host">
</p>

<h1 align="center">「 Kanaeru Chan Bot v7.0 」</h1>
<p align="center"><i>軽くて可愛い、しかし sangat tangguh</i></p>
<p align="center">WhatsApp Selfbot Framework | Designed for speed, style & control</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/WeplyStudio/base-kanaeruchan?color=ffb3c6&style=flat-square" />
  <img src="https://img.shields.io/github/forks/WeplyStudio/base-kanaeruchan?color=e2caff&style=flat-square" />
  <img src="https://img.shields.io/github/issues/WeplyStudio/base-kanaeruchan?color=b9fbc0&style=flat-square" />
  <img src="https://img.shields.io/github/license/WeplyStudio/base-kanaeruchan?color=fde2ff&style=flat-square" />
  <img src="https://img.shields.io/badge/made%20with-node.js%20v18-8cc4ff?style=flat-square&logo=node.js&logoColor=white" />
</p>

---

## ❐ Overview

「 Kanaeru 」adalah selfbot berbasis WhatsApp yang memadukan struktur modular dengan UI interaktif modern. Ringan, fleksibel, dan cantik — dibuat untuk developer yang ingin total kontrol.

> _Code is poetry. Kanaeru is melody._

---

## ❐ Fitur Unggulan

∘ Dukungan `buttonsMessage`, `interactiveMessage`, `cta_url`, dan `productMessage`  
∘ Cocok untuk WhatsApp Business dan WhatsApp Original  
∘ Sistem plugin event-driven (`case`, `plugins/`)  
∘ Respon khusus hanya pada pesan bot  
∘ Ringan dan tetap stabil (Node.js v18)  
∘ Auto-reaction toggleable (`reactsw: true|false`)  
∘ Struktur file clean dan mudah diatur  
∘ Tidak menggunakan enkripsi agresif — full transparansi  

---

## ❐ Dokumentasi Instalasi

```bash
# Clone repo
git clone https://github.com/WeplyStudio/base-kanaeruchan.git
cd base-kanaeruchan

# Install dependency
npm install

# Jalankan bot
node .

# Konfigurasi di:
- ./config.js
- ./plugins/
- ./case/
```

---

## ❐ Komponen UI yang Didukung

```
[ List Menu ]
Tipe        : single_select
Fungsi      : Menampilkan daftar menu sebagai opsi
Kompatibel  : Semua versi WhatsApp

[ CTA URL ]
Tipe        : cta_url
Fungsi      : Redirect ke tautan (GitHub, docs, dsb)
Penempatan  : Di dalam message payload

[ ProductMessage ]
Tipe        : Fake catalog
Fungsi      : Menyisipkan tombol interaktif estetik
Metode      : Digunakan sebagai trik UI/UX
```

---

## ❐ Kenapa Memilih Kanaeru?

∘ Tidak bloated, tidak berat  
∘ Minim dependency, mudah dikembangkan  
∘ Struktur modular yang scalable  
∘ Estetik tanpa emoji berlebihan  
∘ Clean-code, dokumentasi jelas  
∘ Mendukung mode selfbot dan bot  

---

## ❐ Credits

- KyuuRzy – Struktur dasar dan pengembangan awal  
- Kanaeru Team – Desain ulang, plugin, dan UX update  
- Baileys – WhatsApp Web API library (by @whiskeysockets)  

---

## ❐ License & Etika

```
✓ Bebas digunakan dan dikembangkan
✘ Dilarang menjual ulang tanpa kontribusi fitur
✘ Dilarang digunakan untuk spam, scam, atau aktivitas ilegal
```

> Jika disalahgunakan, proyek ini dapat ditutup sepihak.

---

## ❐ Penutup

「 Kanaeru Chan 」bukan sekadar bot. Ini adalah *kerangka kerja* untuk WhatsApp automation yang indah, kuat, dan bebas.  
Karena dunia sudah terlalu sempit untuk skrip bot yang jelek dan penuh iklan.
