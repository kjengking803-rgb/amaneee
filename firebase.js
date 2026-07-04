// ============================================================
// firebase.js — Amane Store
// ============================================================
// LANGKAH SETUP:
// 1. Buka https://console.firebase.google.com
// 2. Project Settings → Your Apps → SDK setup and configuration
// 3. Copy nilai dari firebaseConfig dan tempel di bawah ini
// 4. Samakan juga di kynasXmarket.html (FIREBASE_CONFIG)
//    dan admin.html (FIREBASE_CONFIG_ADMIN)
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyD8htvN1ki7m4qzXG41GHcfzoovmEt7kyM",
  authDomain: "amane-store-ea7ea.firebaseapp.com",
  projectId: "amane-store-ea7ea",
  storageBucket: "amane-store-ea7ea.firebasestorage.app",
  messagingSenderId: "267392548754",
  appId: "1:267392548754:web:2ef42fa1f3f14488730b4b",
  measurementId: "G-4ZYB4LNQLF"
};

// ============================================================
// FIREBASE URL untuk REST API (auto dari config atas)
// Tidak perlu diubah manual
// ============================================================
const FIREBASE_URL   = "https://amane-store-ea7ea-default-rtdb.asia-southeast1.firebasedatabase.app/;
const FIREBASE_TOKEN = ''; // kosongkan jika pakai rules publik

// ============================================================
// REST API Helpers
// ============================================================
const _furl = (path) =>
    `${FIREBASE_URL}/${path}.json${FIREBASE_TOKEN ? `?auth=${FIREBASE_TOKEN}` : ''}`;

async function fbGet(path) {
    const r = await fetch(_furl(path));
    if (!r.ok) throw new Error(`Firebase GET error: ${r.status}`);
    return r.json();
}

async function fbSet(path, data) {
    const r = await fetch(_furl(path), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(`Firebase SET error: ${r.status}`);
    return r.json();
}

async function fbPush(path, data) {
    const r = await fetch(_furl(path), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(`Firebase PUSH error: ${r.status}`);
    return r.json();
}

async function fbPatch(path, data) {
    const r = await fetch(_furl(path), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(`Firebase PATCH error: ${r.status}`);
    return r.json();
}

async function fbDel(path) {
    const r = await fetch(_furl(path), { method: 'DELETE' });
    if (!r.ok) throw new Error(`Firebase DELETE error: ${r.status}`);
    return r.json();
}

// ============================================================
// STRUKTUR DATA FIREBASE — Amane Store
// ============================================================
//
// amane-store/
// ├── categories/      ← Produk & kategori (admin tulis, web baca)
// ├── config/          ← Semua setting toko dari admin dashboard
// │     ├── storeName, tagline, icon, logoUrl
// │     ├── waNumber, tgUser, igLink
// │     ├── marqueeOn, marqueeText, marqueeColor
// │     ├── bgUrl, bgOpacity, bgBlur
// │     ├── primaryColor, secondaryColor
// │     ├── maintenance, requireLogin
// │     ├── showAI, aiKey, aiName, aiPrompt
// │     ├── nokosActive, roApiKey, roBaseUrl
// │     ├── nokosMarkupMode, nokosMarkupVal
// │     ├── panelActive, pteroUrl, pteroKey
// │     ├── resourceMaps[]
// │     ├── smmActive, smmApiKey, smmBaseUrl
// │     ├── smmMarkup, smmMarkupMin
// │     └── dtApiKey, dtBaseUrl
// ├── orders/          ← Order dari checkout WA/TG
// ├── invoices/        ← Transaksi QRIS deposit (Dongtube)
// ├── nokos_orders/    ← Order nomor OTP (RumahOTP)
// ├── panel_servers/   ← Server Pterodactyl per user
// ├── smm_orders/      ← Order suntik sosmed (Fayupedia)
// ├── smm_services/    ← Cache layanan SMM dari Fayupedia
// ├── banners/         ← Banner carousel website
// ├── payments/        ← Metode pembayaran manual
// ├── reviews/         ← Ulasan pembeli
// └── users/           ← Data user yang login Google
//
// ============================================================
// FIREBASE RULES (paste di Firebase Console → Rules):
// ============================================================
//
// {
//   "rules": {
//     "categories":    { ".read": true,  ".write": false },
//     "config":        { ".read": true,  ".write": false },
//     "banners":       { ".read": true,  ".write": false },
//     "payments":      { ".read": true,  ".write": false },
//     "reviews":       { ".read": true,  ".write": false },
//     "smm_services":  { ".read": true,  ".write": false },
//     "orders":        { ".read": "auth != null", ".write": true },
//     "invoices":      { ".read": "auth != null", ".write": true },
//     "nokos_orders":  { ".read": "auth != null", ".write": true },
//     "panel_servers": { ".read": "auth != null", ".write": true },
//     "smm_orders":    { ".read": "auth != null", ".write": true },
//     "users":         { ".read": false, ".write": "auth != null" }
//   }
// }
//
// ============================================================
