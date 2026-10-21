export const INITIAL_GAMES = [
  {
    id: 'G001',
    nama: 'Marvel\'s Spider-Man 2',
    platform: 'PS5',
    ukuranGB: 65,
    harga: 35000,
    spekMinimal: 'Khusus PS5 Digital / Disc Edition',
    coverUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Petualangan Peter Parker & Miles Morales melawan Venom di kota New York. Grafis next-gen 60FPS.',
    genre: 'Action / Adventure'
  },
  {
    id: 'G002',
    nama: 'Grand Theft Auto V',
    platform: 'PC',
    ukuranGB: 110,
    harga: 30000,
    spekMinimal: 'Intel Core i5 / GTX 1050 Ti / 8 GB RAM',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Jelajahi Los Santos bersama Michael, Trevor, dan Franklin. Lengkap dengan mod offline & grafik ultra.',
    genre: 'Open World'
  },
  {
    id: 'G003',
    nama: 'God of War Ragnarok',
    platform: 'PS5',
    ukuranGB: 84,
    harga: 40000,
    spekMinimal: 'PS5 / PS4 Pro System Firmware 11.00',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Kratos dan Atreus menghadapi takdir Ragnarok di sembilan alam mitologi Nordik.',
    genre: 'Action RPG'
  },
  {
    id: 'G004',
    nama: 'Elden Ring: Shadow of the Erdtree',
    platform: 'PC',
    ukuranGB: 60,
    harga: 35000,
    spekMinimal: 'Intel Core i7-8700K / GTX 1070 / 16 GB RAM',
    coverUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Karya mahakarya FromSoftware & George R.R. Martin. Lands Between dan Realm of Shadow.',
    genre: 'Souls-like RPG'
  },
  {
    id: 'G005',
    nama: 'Black Myth: Wukong',
    platform: 'PC',
    ukuranGB: 130,
    harga: 45000,
    spekMinimal: 'Intel Core i7-9700 / RTX 2060 / 16 GB RAM / SSD Wajib',
    coverUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Aksi memukau sang Kera Sakti Sun Wukong dengan Unreal Engine 5 tercanggih.',
    genre: 'Action RPG'
  },
  {
    id: 'G006',
    nama: 'EA Sports FC 24',
    platform: 'PS4',
    ukuranGB: 50,
    harga: 25000,
    spekMinimal: 'PS4 Jailbreak HEN 9.00 / 11.00',
    coverUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Game sepak bola nomor satu dunia dengan update skuad transfer terbaru dan Career Mode.',
    genre: 'Sports'
  },
  {
    id: 'G007',
    nama: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Switch',
    ukuranGB: 18,
    harga: 30000,
    spekMinimal: 'Nintendo Switch CFW Atmosphere',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Petualangan Link di daratan dan angkasa Hyrule dengan kemampuan Ultrahand yang kreatif.',
    genre: 'Adventure'
  },
  {
    id: 'G008',
    nama: 'Cyberpunk 2077: Phantom Liberty',
    platform: 'PC',
    ukuranGB: 70,
    harga: 35000,
    spekMinimal: 'Intel Core i7-10700 / RTX 3060 / 16 GB RAM',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Jelajahi Dogtown bersama Solomon Reed (Idris Elba) dalam thriller spionase Night City.',
    genre: 'Sci-Fi RPG'
  },
  {
    id: 'G009',
    nama: 'Red Dead Redemption 2',
    platform: 'PC',
    ukuranGB: 120,
    harga: 35000,
    spekMinimal: 'Intel Core i7 / GTX 1060 6GB / 12 GB RAM',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Kisah epik Arthur Morgan dan geng Van der Linde di era koboi Amerika Serikat.',
    genre: 'Open World'
  },
  {
    id: 'G010',
    nama: 'Ghost of Tsushima: Director\'s Cut',
    platform: 'PS5',
    ukuranGB: 75,
    harga: 35000,
    spekMinimal: 'PS5 / PS4 Pro System',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    deskripsi: 'Jin Sakai bertarung demi membebaskan pulau Tsushima dari invasi Mongol.',
    genre: 'Action'
  }
];

export const INITIAL_RENTALS = [
  {
    id: 'R001',
    nama: 'Paket PS5 + 2 Stik',
    tipe: 'PlayStation 5 Disc Edition',
    hargaPerHari: 150000,
    hargaPerJam: 25000,
    deposit: 100000,
    status: 'Tersedia',
    fotoUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    fitur: ['2 Stik DualSense Wireless', 'Kabel HDMI 2.1 4K', 'Game Populer Pre-installed (Spiderman 2, FC 24, GTA V)', 'Tas Pelindung Eksklusif'],
    badge: 'Paling Laris'
  },
  {
    id: 'R002',
    nama: 'Paket PS4 Pro',
    tipe: 'PlayStation 4 Pro 1TB 4K',
    hargaPerHari: 80000,
    hargaPerJam: 15000,
    deposit: 75000,
    status: 'Tersedia',
    fotoUrl: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?w=600&auto=format&fit=crop&q=80',
    fitur: ['2 Stik DualShock 4 Ori', 'Kabel Lengkap', 'Pilihan 30+ Game Offline Siap Main', 'Bisa Request Game'],
    badge: 'Ekonomis'
  },
  {
    id: 'R003',
    nama: 'Paket PS4 Slim',
    tipe: 'PlayStation 4 Slim 500GB',
    hargaPerHari: 60000,
    hargaPerJam: 12000,
    deposit: 50000,
    status: 'Tersedia',
    fotoUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=600&auto=format&fit=crop&q=80',
    fitur: ['2 Stik DualShock 4', 'Kabel HDMI & Power', '15+ Game Pilihan (FC 24, PES, GTA V)', 'Hemat & Ringkas'],
    badge: 'Hemat'
  },
  {
    id: 'R004',
    nama: 'Paket Nintendo Switch OLED',
    tipe: 'Nintendo Switch OLED 64GB + MicroSD 256GB',
    hargaPerHari: 90000,
    hargaPerJam: 18000,
    deposit: 100000,
    status: 'Tersedia',
    fotoUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    fitur: ['2 Pasang Joycon + Grip', 'Docking TV + Charger Ori', 'Zelda TotK, Mario Kart 8 Deluxe, Pokemon', 'Bisa Main Dimana Saja'],
    badge: 'Portable'
  }
];

export const INITIAL_TEKNISI = [
  {
    id: 'T01',
    nama: 'Andi',
    fullName: 'Andi Saputra',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    rating: 4.0,
    bintang: 4,
    phone: '0812-9876-5432',
    platNomor: 'B 4128 KZM',
    status: 'Menuju Lokasi Pelanggan',
    estimasiMenit: 15,
    dompet: {
      totalKomisi: 240000,
      uangBensin: 60000,
      tugasSelesai: 6
    }
  },
  {
    id: 'T02',
    nama: 'Budi',
    fullName: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    rating: 4.8,
    bintang: 5,
    phone: '0812-8765-4321',
    platNomor: 'B 3982 TLP',
    status: 'Standby / Siap Bertugas',
    estimasiMenit: 0,
    dompet: {
      totalKomisi: 180000,
      uangBensin: 45000,
      tugasSelesai: 4
    }
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-20261021-001',
    customerId: 'CUST-001',
    customerName: 'Dimas Wicaksono',
    noWhatsApp: '0813-1122-3344',
    alamat: 'Jl. Melati No. 14, RT 03/RW 05, Cilandak, Jakarta Selatan',
    titikLokasi: '-6.2921, 106.8012',
    tipeLayanan: 'Sewa_PS',
    itemSewa: {
      id: 'R001',
      nama: 'Paket PS5 + 2 Stik',
      durasiHari: 1,
      hargaPerHari: 150000
    },
    items: [
      { nama: 'Paket Rental PS5 + 2 Stik', spec: 'PS5 Disc Edition + 2 DualSense', harga: 150000 }
    ],
    totalGB: 0,
    totalHarga: 150000,
    deposit: 100000,
    ongkir: 15000,
    grandTotal: 265000,
    status: 'Teknisi Menuju Rumah (15 mnt)',
    statusCode: 'EN_ROUTE',
    jadwalKunjungan: 'Hari ini, 13:00 - 15:00',
    teknisi: 'Andi',
    idTeknisi: 'T01',
    ktpVerified: true,
    ktpPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    sisaWaktuSewaHours: 23,
    checklistItems: [
      { name: 'HDD Master 01', status: 'OK', checked: true },
      { name: 'Konsol & 2 Stik', status: 'OK', checked: true },
      { name: 'Kabel HDMI 2.1 & Power', status: 'OK', checked: true }
    ],
    timestamp: '2026-10-21T10:30:00Z'
  },
  {
    id: 'ORD-20261021-002',
    customerId: 'CUST-002',
    customerName: 'Reza Fahlevi',
    noWhatsApp: '0812-4455-6677',
    alamat: 'Apartemen Green Pramuka Tower F Lantai 12, Jakarta Pusat',
    titikLokasi: '-6.1882, 106.8712',
    tipeLayanan: 'Install_Game',
    items: [
      { nama: 'Grand Theft Auto V', spec: '110 GB', harga: 30000 },
      { nama: 'Cyberpunk 2077', spec: '70 GB', harga: 35000 }
    ],
    totalGB: 180,
    totalHarga: 65000,
    deposit: 0,
    ongkir: 12000,
    grandTotal: 77000,
    status: 'Menunggu Konfirmasi',
    statusCode: 'PENDING',
    jadwalKunjungan: 'Hari ini, 16:00 - 18:00',
    teknisi: 'Budi',
    idTeknisi: 'T02',
    ktpVerified: false,
    timestamp: '2026-10-21T09:15:00Z'
  },
  {
    id: 'ORD-20261020-003',
    customerId: 'CUST-003',
    customerName: 'Satria Pratama',
    noWhatsApp: '0811-9988-7766',
    alamat: 'Jl. Tebet Barat Dalam Raya No. 45, Jakarta Selatan',
    titikLokasi: '-6.2366, 106.8522',
    tipeLayanan: 'Install_Game',
    items: [
      { nama: 'Marvel\'s Spider-Man 2', spec: '65 GB', harga: 35000 },
      { nama: 'EA Sports FC 24', spec: '50 GB', harga: 25000 }
    ],
    totalGB: 115,
    totalHarga: 60000,
    deposit: 0,
    ongkir: 10000,
    grandTotal: 70000,
    status: 'Selesai',
    statusCode: 'COMPLETED',
    jadwalKunjungan: 'Kemarin, 14:00',
    teknisi: 'Andi',
    idTeknisi: 'T01',
    ktpVerified: false,
    garansiHingga: '2026-10-27',
    rating: 5,
    timestamp: '2026-10-20T14:00:00Z'
  }
];

export const INITIAL_KONSOL_INVENTARIS = [
  {
    nomorSeri: 'PS5-CFI1218-01',
    tipe: 'PS5 Disc Edition',
    kondisi: 'Mulus 98%',
    stick: 2,
    kabel: 'HDMI 2.1, Kabel Power, Type-C',
    status: 'Tersedia'
  },
  {
    nomorSeri: 'PS5-CFI1218-02',
    tipe: 'PS5 Disc Edition',
    kondisi: 'Mulus 95%',
    stick: 2,
    kabel: 'HDMI 2.1, Kabel Power, Type-C',
    status: 'Disewa'
  },
  {
    nomorSeri: 'PS4-CUH7218-01',
    tipe: 'PS4 Pro 1TB',
    kondisi: 'Bagus 90%',
    stick: 2,
    kabel: 'HDMI, Power, Micro-USB',
    status: 'Tersedia'
  },
  {
    nomorSeri: 'PS4-CUH2218-01',
    tipe: 'PS4 Slim 500GB',
    kondisi: 'Normal 88%',
    stick: 2,
    kabel: 'HDMI, Power, Micro-USB',
    status: 'Tersedia'
  }
];

export const INITIAL_HDD_INVENTARIS = [
  {
    nomorHDD: 'HDD Master 01',
    kapasitas: '2000 GB (2TB)',
    daftarGame: 'GTA V, Cyberpunk 2077, Black Myth Wukong, Elden Ring, RDR2',
    status: 'Dibawa Teknisi Andi'
  },
  {
    nomorHDD: 'HDD Master 02',
    kapasitas: '2000 GB (2TB)',
    daftarGame: 'Spiderman 2, God of War Ragnarok, FC 24, PES 2024, Horizon Forbidden West',
    status: 'Siap di Kantor'
  },
  {
    nomorHDD: 'HDD Master 03',
    kapasitas: '1000 GB (1TB)',
    daftarGame: 'Game Ringan PC, Emulator Nintendo Switch, Game Anak & Edukasi, Minecraft',
    status: 'Siap di Kantor'
  }
];

export const INITIAL_FINANCIAL_SUMMARY = {
  omzetHariIni: 412000,
  totalPesananBulanIni: 48,
  komisiTeknisiTotal: 960000,
  uangBensinTotal: 240000,
  depositTertahan: 350000,
  pesananAktif: 2,
  unitKonsolDisewa: 1
};
