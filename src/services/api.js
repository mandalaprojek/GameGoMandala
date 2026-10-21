import {
  INITIAL_GAMES,
  INITIAL_RENTALS,
  INITIAL_ORDERS,
  INITIAL_KONSOL_INVENTARIS,
  INITIAL_HDD_INVENTARIS,
  INITIAL_TEKNISI,
  INITIAL_FINANCIAL_SUMMARY
} from '../data/mockData';

const GAS_WEBAPP_URL = import.meta.env.VITE_GAS_WEBAPP_URL || '';

// LocalStorage Helper Keys
const STORAGE_KEYS = {
  GAMES: 'ggm_katalog_games',
  RENTALS: 'ggm_katalog_rentals',
  ORDERS: 'ggm_pesanan_orders',
  KONSOL: 'ggm_inventaris_konsol',
  HDD: 'ggm_inventaris_hdd',
  FINANCES: 'ggm_finances',
  STORE_CONFIG: 'ggm_store_config'
};

// Inisialisasi LocalStorage jika belum ada
function initLocalCache() {
  if (!localStorage.getItem(STORAGE_KEYS.GAMES)) {
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(INITIAL_GAMES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RENTALS)) {
    localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(INITIAL_RENTALS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.KONSOL)) {
    localStorage.setItem(STORAGE_KEYS.KONSOL, JSON.stringify(INITIAL_KONSOL_INVENTARIS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.HDD)) {
    localStorage.setItem(STORAGE_KEYS.HDD, JSON.stringify(INITIAL_HDD_INVENTARIS));
  }
}
initLocalCache();

export const apiService = {
  // Ambil Data Awal
  async getInitialData() {
    if (GAS_WEBAPP_URL) {
      try {
        const res = await fetch(`${GAS_WEBAPP_URL}?action=getInitialData`);
        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.warn('Gagal terhubung ke GAS Web App, beralih ke cache lokal:', err);
      }
    }

    // Fallback: LocalStorage / Mock
    return {
      katalogGame: JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES) || '[]'),
      katalogRental: JSON.parse(localStorage.getItem(STORAGE_KEYS.RENTALS) || '[]'),
      pesanan: JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]'),
      inventarisKonsol: JSON.parse(localStorage.getItem(STORAGE_KEYS.KONSOL) || '[]'),
      inventarisHDD: JSON.parse(localStorage.getItem(STORAGE_KEYS.HDD) || '[]'),
      teknisi: INITIAL_TEKNISI,
      finances: INITIAL_FINANCIAL_SUMMARY,
      isLiveGas: Boolean(GAS_WEBAPP_URL)
    };
  },

  // Buat Pesanan Baru
  async createPesanan(orderPayload) {
    if (GAS_WEBAPP_URL) {
      try {
        const res = await fetch(GAS_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'createPesanan', payload: orderPayload })
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.warn('GAS POST failed, saving locally:', err);
      }
    }

    // Local fallback
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const newId = 'ORD-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(100 + Math.random() * 900);
    const newOrder = {
      id: newId,
      customerId: 'CUST-' + Math.floor(1000 + Math.random() * 9000),
      customerName: orderPayload.nama,
      noWhatsApp: orderPayload.noWhatsApp,
      alamat: orderPayload.alamat,
      tipeLayanan: orderPayload.tipeLayanan,
      items: orderPayload.items || [],
      totalGB: orderPayload.totalGB || 0,
      totalHarga: orderPayload.totalHarga || 0,
      deposit: orderPayload.deposit || 0,
      ongkir: orderPayload.ongkir || 0,
      grandTotal: (orderPayload.totalHarga || 0) + (orderPayload.ongkir || 0) + (orderPayload.deposit || 0),
      status: 'Teknisi Menuju Rumah (15 mnt)',
      statusCode: 'EN_ROUTE',
      jadwalKunjungan: orderPayload.jadwalKunjungan || 'Hari ini',
      teknisi: 'Andi',
      idTeknisi: 'T01',
      ktpVerified: orderPayload.tipeLayanan === 'Sewa_PS' ? true : false,
      ktpPhotoUrl: orderPayload.ktpPhotoUrl || null,
      dxdiagPhotoUrl: orderPayload.dxdiagPhotoUrl || null,
      checklistItems: [
        { name: 'HDD Master 01', status: 'OK', checked: true },
        { name: orderPayload.tipeLayanan === 'Sewa_PS' ? 'Konsol & 2 Stik' : 'Perangkat Pelanggan', status: 'OK', checked: true }
      ],
      timestamp: new Date().toISOString()
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    return {
      status: 'success',
      orderId: newId,
      order: newOrder,
      message: 'Pesanan berhasil dibuat!'
    };
  },

  // Simpan Serah Terima & Tanda Tangan
  async submitSerahTerima(payload) {
    if (GAS_WEBAPP_URL) {
      try {
        const res = await fetch(GAS_WEBAPP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'submitSerahTerima', payload })
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.warn('GAS Serah Terima failed, saving locally:', err);
      }
    }

    // Local fallback
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const index = orders.findIndex(o => o.id === payload.orderId);
    if (index !== -1) {
      orders[index].status = 'Selesai';
      orders[index].statusCode = 'COMPLETED';
      orders[index].signatureBase64 = payload.signatureBase64;
      orders[index].completedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }

    return {
      status: 'success',
      signatureUrl: payload.signatureBase64,
      pdfUrl: '#',
      message: 'Serah terima tuntas! Invoice & Berita Acara digital telah diterbitkan.'
    };
  },

  // Verifikasi KTP (Admin)
  async verifyKTP(orderId, statusVerifikasi, adminName = 'Admin Mandala') {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].ktpVerified = statusVerifikasi === 'Verified';
      orders[index].ktpStatus = statusVerifikasi;
      orders[index].verifiedBy = adminName;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
    return { status: 'success', message: 'Verifikasi e-KYC berhasil diperbarui' };
  },

  // Refund Deposit (Admin)
  async processDepositRefund(orderId, potongDenda = 0, statusRefund = 'Refund_Selesai', adminName = 'Admin Mandala') {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].potonganDenda = potongDenda;
      orders[index].statusRefund = statusRefund;
      orders[index].refundBy = adminName;
      orders[index].refundAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
    return { status: 'success', message: 'Proses deposit berhasil dicatat dalam audit trail' };
  },

  // Tambah Game Baru (Admin)
  async addGame(game) {
    const games = JSON.parse(localStorage.getItem(STORAGE_KEYS.GAMES) || '[]');
    const newGame = {
      ...game,
      id: 'G' + Math.floor(100 + Math.random() * 900),
      ukuranGB: Number(game.ukuranGB),
      harga: Number(game.harga)
    };
    games.unshift(newGame);
    localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(games));
    return newGame;
  },

  // Tambah Rental PS Baru (Admin)
  async addRental(rental) {
    const rentals = JSON.parse(localStorage.getItem(STORAGE_KEYS.RENTALS) || '[]');
    const newRental = {
      ...rental,
      id: 'R' + Math.floor(100 + Math.random() * 900),
      hargaPerHari: Number(rental.hargaPerHari),
      deposit: Number(rental.deposit),
      status: 'Tersedia'
    };
    rentals.unshift(newRental);
    localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(rentals));
    return newRental;
  }
};
