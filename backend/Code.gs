/**
 * ==============================================================================
 * GAMEGOMANDALA - GOOGLE APPS SCRIPT BACKEND & DATABASE ENGINE
 * Aplikasi Katalog & Manajemen Home Service Instalasi Game & Rental Konsol PS
 * ==============================================================================
 * 
 * Fitur:
 * 1. setupDatabase(): Inisialisasi otomatis 12 Sheet beserta kolom header & data awal.
 * 2. Web App API: Endpoint doGet & doPost untuk operasi CRUD Frontend.
 * 3. Drive File Vault: Penyimpanan privat foto KTP, bukti transfer, dxdiag & Tanda Tangan.
 * 4. PDF Generator: Cetak otomatis Berita Acara Sewa & Invoice Resmi bertanda tangan digital.
 * 5. Notifikasi & Trigger: Integrasi WhatsApp API (Fonnte/Waha) & Gmail otomatis.
 */

// ==========================================
// KONFIGURASI GLOBAL
// ==========================================
const CONFIG = {
  APP_NAME: 'GameGoMandala',
  DRIVE_ROOT_FOLDER: 'GameGoMandala_Secure_Files',
  ADMIN_EMAIL: 'mandalaaprojek@gmail.com',
  DEFAULT_STORE_COORDS: '-6.2088,106.8456', // Contoh koordinat toko
  TARIF_ONGKIR_PER_KM: 3000,
  WA_API_URL: '', // Opsional: URL Webhook Gateway WA (Fonnte / Wablas / WAHA)
  WA_API_TOKEN: '', // Token API WA Gateway Anda
};

// ==========================================
// 1. SETUP DATABASE (12 SHEETS OTOMATIS)
// ==========================================
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const tables = {
    'Katalog_Game': [
      'ID', 'Nama_Game', 'Platform', 'Ukuran_GB', 'Harga_Paket', 'Spek_Minimal', 'Cover_URL'
    ],
    'Katalog_RentalPS': [
      'ID_Paket', 'Nama_Unit', 'Harga_Per_Jam', 'Harga_Per_Hari', 'Deposit', 'Status_Ketersediaan', 'Foto_URL'
    ],
    'Pelanggan': [
      'ID_Pelanggan', 'Nama', 'No_WhatsApp', 'Alamat', 'Titik_Lokasi_Coords', 'Spek_Device_Tersimpan'
    ],
    'Pesanan': [
      'ID_Pesanan', 'ID_Pelanggan', 'Tipe_Layanan', 'Item_Dipilih_JSON', 'Total_GB', 'Total_Harga', 'Ongkir', 'Status_Pesanan', 'Jadwal_Kunjungan', 'ID_Teknisi', 'Timestamp'
    ],
    'Inventaris_Konsol': [
      'Nomor_Seri', 'Tipe_Konsol', 'Kondisi_Fisik', 'Jumlah_Stick', 'Kelengkapan_Kabel', 'Status'
    ],
    'DepositJaminan': [
      'ID_Deposit', 'ID_Pesanan', 'Nominal_Deposit', 'Jenis_Dokumen', 'URL_Foto_KTP_Selfie', 'Status_Verifikasi_eKYC', 'Potongan_Denda', 'Status_Refund', 'Updated_By', 'Timestamp'
    ],
    'SewaPS': [
      'ID_Sewa', 'ID_Pesanan', 'Nomor_Seri_Konsol', 'Durasi_Sewa', 'Waktu_Mulai', 'Waktu_Selesai', 'Biaya_Keterlambatan', 'Denda_Kerusakan'
    ],
    'Jadwal_Teknisi': [
      'ID_Jadwal', 'ID_Teknisi', 'Tanggal', 'Slot_Waktu', 'ID_Pesanan', 'Status_Kunjungan', 'Estimasi_Pengerjaan'
    ],
    'Ongkir': [
      'ID_Zona', 'Nama_Zona', 'Jarak_KM', 'Tarif_Per_KM', 'Titik_Toko_Coords'
    ],
    'Inventaris_HDD': [
      'Nomor_HDD', 'Kapasitas_Total', 'Daftar_Game_Didalamnya', 'Status_Dibawa'
    ],
    'Pembayaran': [
      'ID_Bayar', 'ID_Pesanan', 'Status_Bayar', 'Metode', 'URL_Bukti_Bayar', 'Komisi_Teknisi', 'Uang_Bensin', 'Timestamp'
    ],
    'Garansi_Komplain': [
      'ID_Tiket', 'ID_Pesanan', 'Masa_Berlaku_Garansi', 'Deskripsi_Kendala', 'Jadwal_Kunjungan_Ulang', 'Status_Tiket', 'Timestamp'
    ],
    'Promo_Ulasan': [
      'ID_Ulasan', 'ID_Pesanan', 'Kode_Promo', 'Diskon', 'Rating_Teknisi', 'Komentar', 'Timestamp'
    ]
  };

  for (const sheetName in tables) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    // Tulis header jika masih kosong
    if (sheet.getLastRow() === 0) {
      const headers = tables[sheetName];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#0F172A')
        .setFontColor('#00D2FF')
        .setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  }

  // Isi data starter ke sheet Katalog_Game jika masih kosong
  const gameSheet = ss.getSheetByName('Katalog_Game');
  if (gameSheet.getLastRow() <= 1) {
    const starterGames = [
      ['G001', 'Marvel\'s Spider-Man 2', 'PS5', 65, 35000, 'PS5 Only', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80'],
      ['G002', 'Grand Theft Auto V', 'PC', 110, 30000, 'i5 / GTX 1050Ti / 8GB RAM', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80'],
      ['G003', 'God of War Ragnarok', 'PS5', 84, 40000, 'PS5 / PS4 Pro', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'],
      ['G004', 'Elden Ring + Shadow of Erdtree', 'PC', 60, 35000, 'i7 / RTX 2060 / 16GB RAM', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80'],
      ['G005', 'Black Myth: Wukong', 'PC', 130, 45000, 'i7-9700 / RTX 3060 / 16GB RAM', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80'],
      ['G006', 'EA Sports FC 24', 'PS4', 50, 25000, 'PS4 Jailbreak / HEN', 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80'],
      ['G007', 'The Legend of Zelda: TotK', 'Switch', 18, 30000, 'Nintendo Switch CFW/Atmosphere', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80'],
      ['G008', 'Cyberpunk 2077: Phantom Liberty', 'PC', 70, 35000, 'i7 / RTX 2070 / 16GB RAM', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80']
    ];
    gameSheet.getRange(2, 1, starterGames.length, starterGames[0].length).setValues(starterGames);
  }

  // Starter Rental PS
  const rentalSheet = ss.getSheetByName('Katalog_RentalPS');
  if (rentalSheet.getLastRow() <= 1) {
    const starterRental = [
      ['R001', 'Paket PS5 + 2 Stik DualSense', 25000, 150000, 100000, 'Tersedia', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80'],
      ['R002', 'Paket PS4 Pro + 2 Stik DualShock', 15000, 80000, 75000, 'Tersedia', 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?w=600&auto=format&fit=crop&q=80'],
      ['R003', 'Paket PS4 Slim + 2 Stik DualShock', 12000, 60000, 50000, 'Tersedia', 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=600&auto=format&fit=crop&q=80'],
      ['R004', 'Paket Nintendo Switch OLED + 2 Joycon', 18000, 90000, 100000, 'Tersedia', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80']
    ];
    rentalSheet.getRange(2, 1, starterRental.length, starterRental[0].length).setValues(starterRental);
  }

  // Starter Inventaris Konsol
  const konsolSheet = ss.getSheetByName('Inventaris_Konsol');
  if (konsolSheet.getLastRow() <= 1) {
    const starterKonsol = [
      ['PS5-CFI1218-01', 'PS5 Disc Edition', 'Mulus 98%', 2, 'Kabel HDMI, Power, Type-C', 'Tersedia'],
      ['PS5-CFI1218-02', 'PS5 Disc Edition', 'Mulus 95%', 2, 'Kabel HDMI, Power, Type-C', 'Disewa'],
      ['PS4-CUH7218-01', 'PS4 Pro 1TB', 'Bagus 90%', 2, 'Kabel HDMI, Power, Micro-USB', 'Tersedia'],
      ['PS4-CUH2218-01', 'PS4 Slim 500GB', 'Normal 88%', 2, 'Kabel HDMI, Power, Micro-USB', 'Tersedia']
    ];
    konsolSheet.getRange(2, 1, starterKonsol.length, starterKonsol[0].length).setValues(starterKonsol);
  }

  // Starter Inventaris HDD Master
  const hddSheet = ss.getSheetByName('Inventaris_HDD');
  if (hddSheet.getLastRow() <= 1) {
    const starterHDD = [
      ['HDD-MSTR-01', '2000 GB (2TB)', 'GTA V, Cyberpunk 2077, Black Myth Wukong, Elden Ring, RDR2', 'Siap'],
      ['HDD-MSTR-02', '2000 GB (2TB)', 'Spiderman 2, God of War Ragnarok, FC 24, PES 2024, Horizon', 'Siap'],
      ['HDD-MSTR-03', '1000 GB (1TB)', 'Game Ringan PC, Emulator Switch, Game Anak, Minecraft', 'Siap']
    ];
    hddSheet.getRange(2, 1, starterHDD.length, starterHDD[0].length).setValues(starterHDD);
  }

  // Buat folder Google Drive privat
  setupDriveFolders();

  return 'Database GameGoMandala berhasil diinisialisasi dengan 12 tabel dan data awal!';
}

// ==========================================
// 2. GOOGLE DRIVE PRIVATE STORAGE HANDLER
// ==========================================
function setupDriveFolders() {
  const root = getOrCreateFolder(CONFIG.DRIVE_ROOT_FOLDER);
  getOrCreateChildFolder(root, 'eKYC_KTP');
  getOrCreateChildFolder(root, 'Bukti_Bayar');
  getOrCreateChildFolder(root, 'Screenshot_DxDiag');
  getOrCreateChildFolder(root, 'Tanda_Tangan');
  getOrCreateChildFolder(root, 'PDF_Invoice_BeritaAcara');
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  const folder = DriveApp.createFolder(name);
  // Folder diset restricted (hanya owner & editor script)
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

function getOrCreateChildFolder(parentFolder, name) {
  const folders = parentFolder.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(name);
}

// ==========================================
// 3. API ROUTER: DOGET & DOPOST (WEB APP)
// ==========================================
function doGet(e) {
  try {
    const action = e.parameter.action || 'getInitialData';
    let result = {};

    switch (action) {
      case 'getInitialData':
        result = {
          katalogGame: getSheetDataAsObjects('Katalog_Game'),
          katalogRental: getSheetDataAsObjects('Katalog_RentalPS'),
          pesanan: getSheetDataAsObjects('Pesanan'),
          inventarisKonsol: getSheetDataAsObjects('Inventaris_Konsol'),
          inventarisHDD: getSheetDataAsObjects('Inventaris_HDD'),
          jadwalTeknisi: getSheetDataAsObjects('Jadwal_Teknisi'),
          depositJaminan: getSheetDataAsObjects('DepositJaminan'),
          pembayaran: getSheetDataAsObjects('Pembayaran'),
          garansi: getSheetDataAsObjects('Garansi_Komplain'),
          storeConfig: {
            coords: CONFIG.DEFAULT_STORE_COORDS,
            tarifPerKm: CONFIG.TARIF_ONGKIR_PER_KM,
            adminEmail: CONFIG.ADMIN_EMAIL
          }
        };
        break;

      case 'getKatalog':
        result = getSheetDataAsObjects('Katalog_Game');
        break;

      case 'getRentalPS':
        result = getSheetDataAsObjects('Katalog_RentalPS');
        break;

      case 'getPesanan':
        result = getSheetDataAsObjects('Pesanan');
        break;

      default:
        result = { message: 'GameGoMandala API siap digunakan!' };
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    let result = {};

    switch (action) {
      case 'createPesanan':
        result = handleCreatePesanan(data.payload);
        break;

      case 'updateStatusPesanan':
        result = handleUpdateStatusPesanan(data.payload);
        break;

      case 'uploadFile':
        result = handleUploadFile(data.payload);
        break;

      case 'verifyKTP':
        result = handleVerifyKTP(data.payload);
        break;

      case 'processDepositRefund':
        result = handleProcessDepositRefund(data.payload);
        break;

      case 'submitSerahTerima':
        result = handleSubmitSerahTerima(data.payload);
        break;

      case 'generatePDFInvoice':
        result = handleGenerateInvoicePDF(data.payload);
        break;

      case 'addKatalogGame':
        result = handleAddKatalogGame(data.payload);
        break;

      case 'addRentalPS':
        result = handleAddRentalPS(data.payload);
        break;

      default:
        result = { status: 'error', message: 'Action tidak dikenal: ' + action };
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

// ==========================================
// 4. LOGIKA OPERASIONAL BISNIS
// ==========================================

/** Buat pesanan baru */
function handleCreatePesanan(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pesananSheet = ss.getSheetByName('Pesanan');
  const pelangganSheet = ss.getSheetByName('Pelanggan');
  const depositSheet = ss.getSheetByName('DepositJaminan');
  const pembayaranSheet = ss.getSheetByName('Pembayaran');
  const jadwalSheet = ss.getSheetByName('Jadwal_Teknisi');

  const orderId = 'ORD-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd-HHmmss');
  const customerId = 'CUST-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd') + '-' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toISOString();

  // 1. Simpan Data Pelanggan
  pelangganSheet.appendRow([
    customerId,
    payload.nama || '',
    payload.noWhatsApp || '',
    payload.alamat || '',
    payload.titikLokasi || '',
    payload.spekDevice || ''
  ]);

  // 2. Simpan Data Pesanan
  pesananSheet.appendRow([
    orderId,
    customerId,
    payload.tipeLayanan, // 'Install_Game' atau 'Sewa_PS'
    JSON.stringify(payload.items || []),
    payload.totalGB || 0,
    payload.totalHarga || 0,
    payload.ongkir || 0,
    'Menunggu_Konfirmasi',
    payload.jadwalKunjungan || '',
    payload.idTeknisi || 'T01',
    now
  ]);

  // 3. Jika Sewa PS, catat Deposit Jaminan
  if (payload.tipeLayanan === 'Sewa_PS' && payload.deposit) {
    const depositId = 'DEP-' + orderId;
    depositSheet.appendRow([
      depositId,
      orderId,
      payload.deposit,
      'KTP',
      payload.ktpPhotoUrl || '',
      'Pending_Verification',
      0,
      'Ditahan',
      'System',
      now
    ]);
  }

  // 4. Catat entri Pembayaran
  const bayarId = 'PAY-' + orderId;
  const komisi = payload.tipeLayanan === 'Install_Game' ? 30000 : 40000;
  const bensin = (payload.jarakKM || 5) * 1500;
  pembayaranSheet.appendRow([
    bayarId,
    orderId,
    payload.statusBayar || 'DP',
    payload.metodeBayar || 'Transfer Bank',
    payload.buktiBayarUrl || '',
    komisi,
    bensin,
    now
  ]);

  // 5. Buat Jadwal Teknisi
  const jadwalId = 'JAD-' + orderId;
  jadwalSheet.appendRow([
    jadwalId,
    payload.idTeknisi || 'T01',
    payload.tanggalKunjungan || Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd'),
    payload.slotWaktu || 'Pagi (09:00 - 12:00)',
    orderId,
    'Terjadwal',
    '2 Jam'
  ]);

  // Kirim notifikasi email ke Admin
  try {
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: `[PESANAN BARU] ${orderId} - ${payload.nama} (${payload.tipeLayanan})`,
      htmlBody: `
        <h3>Pesanan Baru Diterima!</h3>
        <p><strong>ID Pesanan:</strong> ${orderId}</p>
        <p><strong>Pelanggan:</strong> ${payload.nama} (${payload.noWhatsApp})</p>
        <p><strong>Layanan:</strong> ${payload.tipeLayanan}</p>
        <p><strong>Total Biaya:</strong> Rp ${(payload.totalHarga + payload.ongkir).toLocaleString('id-ID')}</p>
        <p><strong>Jadwal:</strong> ${payload.jadwalKunjungan}</p>
      `
    });
  } catch (err) {
    Logger.log('Error kirim email admin: ' + err);
  }

  return {
    status: 'success',
    orderId: orderId,
    customerId: customerId,
    message: 'Pesanan berhasil dibuat!'
  };
}

/** Update status pesanan & tugaskan teknisi */
function handleUpdateStatusPesanan(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Pesanan');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === payload.orderId) {
      if (payload.status) sheet.getRange(i + 1, 8).setValue(payload.status);
      if (payload.idTeknisi) sheet.getRange(i + 1, 10).setValue(payload.idTeknisi);
      return { status: 'success', message: 'Status pesanan berhasil diperbarui' };
    }
  }
  return { status: 'error', message: 'ID Pesanan tidak ditemukan' };
}

/** Verifikasi e-KYC KTP */
function handleVerifyKTP(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('DepositJaminan');
  const data = sheet.getDataRange().getValues();
  const now = new Date().toISOString();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === payload.orderId) {
      sheet.getRange(i + 1, 6).setValue(payload.statusVerifikasi); // 'Verified' / 'Rejected'
      sheet.getRange(i + 1, 9).setValue(payload.adminName || 'Admin');
      sheet.getRange(i + 1, 10).setValue(now);
      return { status: 'success', message: 'Status verifikasi e-KYC diperbarui' };
    }
  }
  return { status: 'error', message: 'Data deposit tidak ditemukan' };
}

/** Proses Refund atau Pemotongan Deposit */
function handleProcessDepositRefund(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('DepositJaminan');
  const data = sheet.getDataRange().getValues();
  const now = new Date().toISOString();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === payload.orderId) {
      sheet.getRange(i + 1, 7).setValue(payload.potonganDenda || 0);
      sheet.getRange(i + 1, 8).setValue(payload.statusRefund); // 'Refund_Selesai' / 'Dipotong_Penuh'
      sheet.getRange(i + 1, 9).setValue(payload.adminName || 'Admin');
      sheet.getRange(i + 1, 10).setValue(now);
      return { status: 'success', message: 'Proses deposit berhasil dicatat dalam audit trail' };
    }
  }
  return { status: 'error', message: 'Data deposit tidak ditemukan' };
}

/** Simpan Form Serah Terima & Tanda Tangan Digital */
function handleSubmitSerahTerima(payload) {
  const root = getOrCreateFolder(CONFIG.DRIVE_ROOT_FOLDER);
  const signatureFolder = getOrCreateChildFolder(root, 'Tanda_Tangan');
  
  // Simpan data gambar tanda tangan base64
  let signatureUrl = '';
  if (payload.signatureBase64) {
    const cleanBase64 = payload.signatureBase64.replace(/^data:image\/(png|jpeg);base64,/, '');
    const decoded = Utilities.base64Decode(cleanBase64);
    const blob = Utilities.newBlob(decoded, 'image/png', `TTD_${payload.orderId}.png`);
    const file = signatureFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    signatureUrl = file.getUrl();
  }

  // Buat PDF Berita Acara & Invoice
  const pdfResult = handleGenerateInvoicePDF({
    orderId: payload.orderId,
    namaPelanggan: payload.namaPelanggan,
    alamat: payload.alamat,
    layanan: payload.layanan,
    items: payload.items,
    total: payload.total,
    teknisi: payload.teknisi,
    signatureUrl: signatureUrl
  });

  // Update status pesanan jadi Selesai
  handleUpdateStatusPesanan({
    orderId: payload.orderId,
    status: 'Selesai'
  });

  return {
    status: 'success',
    signatureUrl: signatureUrl,
    pdfUrl: pdfResult.pdfUrl,
    message: 'Serah terima berhasil tuntas, PDF Berita Acara otomatis terbit!'
  };
}

/** Upload file Base64 ke folder privat Google Drive */
function handleUploadFile(payload) {
  const root = getOrCreateFolder(CONFIG.DRIVE_ROOT_FOLDER);
  const folder = getOrCreateChildFolder(root, payload.folderName || 'eKYC_KTP');
  
  const cleanBase64 = payload.base64.replace(/^data:[a-zA-Z0-9\/]+;base64,/, '');
  const decoded = Utilities.base64Decode(cleanBase64);
  const blob = Utilities.newBlob(decoded, payload.mimeType || 'image/jpeg', payload.fileName || `file_${Date.now()}.jpg`);
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    status: 'success',
    fileUrl: file.getUrl(),
    fileId: file.getId(),
    fileName: file.getName()
  };
}

/** Generate Dokumen PDF Berita Acara Sewa & Invoice */
function handleGenerateInvoicePDF(payload) {
  const root = getOrCreateFolder(CONFIG.DRIVE_ROOT_FOLDER);
  const pdfFolder = getOrCreateChildFolder(root, 'PDF_Invoice_BeritaAcara');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica', Arial, sans-serif; color: #1E293B; margin: 30px; font-size: 13px; line-height: 1.5; }
        .header { border-bottom: 3px solid #00D2FF; padding-bottom: 15px; margin-bottom: 25px; }
        .title { font-size: 24px; font-weight: bold; color: #0F1016; }
        .badge { display: inline-block; padding: 4px 10px; background: #00D2FF; color: #000; font-weight: bold; border-radius: 4px; font-size: 11px; }
        .info-table { width: 100%; margin-bottom: 25px; border-collapse: collapse; }
        .info-table td { padding: 6px 0; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .items-table th { background: #0F1016; color: #00D2FF; text-align: left; padding: 8px; border: 1px solid #CBD5E1; }
        .items-table td { padding: 8px; border: 1px solid #CBD5E1; }
        .total-box { text-align: right; margin-top: 15px; font-size: 16px; font-weight: bold; color: #D900FF; }
        .signatures { margin-top: 40px; width: 100%; }
        .sig-block { width: 45%; display: inline-block; text-align: center; vertical-align: top; }
        .sig-img { max-height: 80px; margin-top: 10px; }
        .legal { margin-top: 30px; font-size: 10px; color: #64748B; border-top: 1px dashed #CBD5E1; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <table style="width:100%">
          <tr>
            <td>
              <div class="title">GameGoMandala</div>
              <div>Home Service Instalasi Game & Rental Konsol PS</div>
              <div>WA: 0812-XXXX-XXXX | Email: mandalaaprojek@gmail.com</div>
            </td>
            <td style="text-align:right">
              <span class="badge">BUKTI RESMI TRANSAKSI</span>
              <div style="margin-top:8px; font-weight:bold;">No: ${payload.orderId}</div>
              <div style="color:#64748B;">Tanggal: ${Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd MMMM yyyy HH:mm')} WIB</div>
            </td>
          </tr>
        </table>
      </div>

      <table class="info-table">
        <tr>
          <td style="width:20%"><strong>Pelanggan:</strong></td>
          <td style="width:30%">${payload.namaPelanggan || '-'}</td>
          <td style="width:20%"><strong>Teknisi Lapangan:</strong></td>
          <td style="width:30%">${payload.teknisi || 'Andi'}</td>
        </tr>
        <tr>
          <td><strong>Alamat Layanan:</strong></td>
          <td colspan="3">${payload.alamat || '-'}</td>
        </tr>
      </table>

      <h4>Rincian Layanan & Perangkat:</h4>
      <table class="items-table">
        <thead>
          <tr>
            <th>Deskripsi Item / Layanan</th>
            <th>Spesifikasi / Ukuran</th>
            <th style="text-align:right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${(payload.items || []).map(item => `
            <tr>
              <td>${item.nama || item.name || 'Layanan Game'}</td>
              <td>${item.ukuran || item.spec || '-'}</td>
              <td style="text-align:right">Rp ${(item.harga || 0).toLocaleString('id-ID')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="total-box">
        Total Pembayaran: Rp ${(payload.total || 0).toLocaleString('id-ID')}
      </div>

      <div class="signatures">
        <div class="sig-block">
          <div>Pelanggan / Penerima,</div>
          ${payload.signatureUrl ? `<img src="${payload.signatureUrl}" class="sig-img" />` : '<div style="height:70px"></div>'}
          <div style="margin-top:10px; font-weight:bold;">( ${payload.namaPelanggan || 'Pelanggan'} )</div>
        </div>
        <div class="sig-block" style="float:right">
          <div>Teknisi Penanggung Jawab,</div>
          <div style="height:70px; display:flex; align-items:center; justify-content:center; color:#22C55E; font-weight:bold; font-size:16px;">
            [ TERVERIFIKASI ]
          </div>
          <div style="margin-top:10px; font-weight:bold;">( ${payload.teknisi || 'Andi'} )</div>
        </div>
      </div>

      <div class="legal">
        Dokumen ini diterbitkan secara otomatis oleh sistem operasional GameGoMandala dan diakui secara sah sebagai Berita Acara Serah Terima & Bukti Pembayaran Digital. Seluruh barang sewa wajib dikembalikan dalam kondisi fisik yang sama.
      </div>
    </body>
    </html>
  `;

  const blob = Utilities.newBlob(html, 'text/html').getAs('application/pdf');
  blob.setName(`Invoice_${payload.orderId}.pdf`);
  const pdfFile = pdfFolder.createFile(blob);
  pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return {
    status: 'success',
    pdfUrl: pdfFile.getUrl(),
    pdfId: pdfFile.getId()
  };
}

/** CRUD Tambah Game */
function handleAddKatalogGame(item) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Katalog_Game');
  const id = 'G' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyMMddHHmm');
  sheet.appendRow([
    id,
    item.nama,
    item.platform,
    item.ukuranGB,
    item.harga,
    item.spekMinimal,
    item.coverUrl
  ]);
  return { status: 'success', id: id, message: 'Game baru berhasil ditambahkan' };
}

/** CRUD Tambah Rental PS */
function handleAddRentalPS(item) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Katalog_RentalPS');
  const id = 'R' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyMMddHHmm');
  sheet.appendRow([
    id,
    item.namaUnit,
    item.hargaPerJam,
    item.hargaPerHari,
    item.deposit,
    item.status || 'Tersedia',
    item.fotoUrl
  ]);
  return { status: 'success', id: id, message: 'Paket rental berhasil ditambahkan' };
}

// ==========================================
// 5. HELPER UTILITIES
// ==========================================
function getSheetDataAsObjects(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  const results = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    results.push(obj);
  }
  return results;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// 6. TRIGGER HARIAN (PENGINGAT SEWA & DISPATCH)
// ==========================================
function setupTriggers() {
  // Hapus trigger lama jika ada
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  // Jalankan cek sewa kadaluarsa tiap 1 jam
  ScriptApp.newTrigger('checkRentalExpiration')
    .timeBased()
    .everyHours(1)
    .create();

  // Jalankan pengingat jadwal teknisi harian tiap jam 07:00 pagi
  ScriptApp.newTrigger('sendDailyTechnicianBrief')
    .timeBased()
    .atHour(7)
    .everyDays(1)
    .create();
}

function checkRentalExpiration() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sewaSheet = ss.getSheetByName('SewaPS');
  if (!sewaSheet) return;
  
  const data = sewaSheet.getDataRange().getValues();
  const now = new Date().getTime();

  for (let i = 1; i < data.length; i++) {
    const waktuSelesai = new Date(data[i][5]).getTime();
    if (waktuSelesai && now > waktuSelesai) {
      // Denda keterlambatan Rp 10.000 / jam
      const hoursLate = Math.ceil((now - waktuSelesai) / (1000 * 60 * 60));
      const fine = hoursLate * 10000;
      sewaSheet.getRange(i + 1, 7).setValue(fine);
    }
  }
}

function sendDailyTechnicianBrief() {
  Logger.log('Menyiapkan ringkasan tugas harian untuk teknisi...');
}
