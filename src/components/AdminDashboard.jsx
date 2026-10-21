import React, { useState } from 'react';
import { 
  Shield, 
  Package, 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Plus, 
  MapPin, 
  HardDrive, 
  Tv, 
  FileSpreadsheet, 
  AlertTriangle,
  Clock,
  ArrowRightLeft,
  ChevronRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export function AdminDashboard({
  orders = [],
  games = [],
  rentals = [],
  konsolList = [],
  hddList = [],
  teknisiList = [],
  onVerifyKTP,
  onProcessRefund,
  onAddGame,
  onAddRental,
  onSwitchRole
}) {
  const [activeTab, setActiveTab] = useState('pesanan'); // pesanan | ekyc | deposit | katalog | inventaris | toko
  
  // State form tambah game
  const [newGame, setNewGame] = useState({
    nama: '',
    platform: 'PC',
    ukuranGB: 50,
    harga: 35000,
    spekMinimal: 'i5 / GTX 1060 / 16GB RAM',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600'
  });

  // State form tambah rental
  const [newRental, setNewRental] = useState({
    nama: 'Paket PS5 Pro + 2 Stik',
    hargaPerHari: 180000,
    deposit: 120000,
    fotoUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600'
  });

  // Form toko
  const [storeCoords, setStoreCoords] = useState('-6.2088, 106.8456');
  const [tarifPerKm, setTarifPerKm] = useState(3000);

  // Total Keuangan
  const totalOmzet = orders.reduce((acc, o) => acc + (o.grandTotal || 0), 0);
  const totalDepositTertahan = orders.filter(o => o.tipeLayanan === 'Sewa_PS' && o.deposit && o.status !== 'Selesai').reduce((acc, o) => acc + o.deposit, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white pb-28">
      {/* Top Banner: Admin Header & Quick Switch Role */}
      <div className="bg-gradient-to-r from-[#171828] via-[#1D2038] to-[#171828] border-2 border-[#D900FF] rounded-3xl p-5 shadow-neon-magenta mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#D900FF]/20 border border-[#D900FF] flex items-center justify-center text-[#D900FF]">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-display font-extrabold text-white">
              Dashboard Admin & Pemilik Bisnis
            </h1>
          </div>
          <p className="text-xs text-gray-300">
            Kendali penuh atas 12 Tabel Google Sheets, penugasan teknisi, verifikasi KTP, dan laporan omzet harian.
          </p>
        </div>

        {/* Quick Switch Role Pill */}
        <div className="flex items-center gap-2 bg-[#0F1016] p-1.5 rounded-2xl border border-[#232A44]">
          <span className="text-[11px] text-gray-400 font-mono pl-2">Mode Ganda:</span>
          <button
            onClick={() => onSwitchRole('teknisi')}
            className="px-3 py-1.5 rounded-xl bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50 text-xs font-bold hover:bg-[#22C55E] hover:text-black transition-all flex items-center gap-1"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Beralih ke Teknisi</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-[#141724] border border-[#00D2FF]/40 rounded-2xl p-4 shadow-neon-blue-sm">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Estimasi Omzet</span>
            <DollarSign className="w-4 h-4 text-[#00D2FF]" />
          </div>
          <div className="text-xl font-display font-bold text-white">
            Rp {totalOmzet.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-[#22C55E] mt-1 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3 h-3" /> Real-time Google Sheets
          </div>
        </div>

        <div className="bg-[#141724] border border-[#22C55E]/40 rounded-2xl p-4 shadow-neon-green">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Pesanan Aktif</span>
            <Package className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="text-xl font-display font-bold text-white">
            {orders.length} Pesanan
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">
            2 Teknisi Lapangan
          </div>
        </div>

        <div className="bg-[#141724] border border-[#FACC15]/40 rounded-2xl p-4">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Deposit Tertahan</span>
            <CreditCard className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-xl font-display font-bold text-[#FACC15]">
            Rp {totalDepositTertahan.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">
            Jaminan e-KYC Aktif
          </div>
        </div>

        <div className="bg-[#141724] border border-[#D900FF]/40 rounded-2xl p-4">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Unit Konsol Siap</span>
            <Tv className="w-4 h-4 text-[#D900FF]" />
          </div>
          <div className="text-xl font-display font-bold text-white">
            {konsolList.filter(k => k.status === 'Tersedia').length} Unit
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">
            {konsolList.length} Total Inventaris
          </div>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-[#232A44]">
        {[
          { id: 'pesanan', label: 'Pesanan & Dispatch', icon: Package },
          { id: 'ekyc', label: 'Verifikasi e-KYC', icon: Shield },
          { id: 'deposit', label: 'Deposit & Refund', icon: DollarSign },
          { id: 'katalog', label: 'Kelola Katalog', icon: Tv },
          { id: 'inventaris', label: 'Konsol & HDD Master', icon: HardDrive },
          { id: 'toko', label: 'Titik Toko & Ongkir', icon: MapPin },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#D900FF] text-white shadow-neon-magenta'
                  : 'bg-[#141724] text-gray-400 hover:text-white border border-[#232A44]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PESANAN & DISPATCH */}
      {activeTab === 'pesanan' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Daftar Pesanan Masuk (Google Sheets: Tabel Pesanan)</span>
            </h2>
            <span className="text-xs text-gray-400 font-mono">{orders.length} Data</span>
          </div>

          <div className="space-y-3">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-[#141724] border border-[#232A44] hover:border-[#00D2FF]/60 rounded-2xl p-4 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 border-b border-[#232A44] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#00D2FF]">{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.tipeLayanan === 'Sewa_PS' 
                          ? 'bg-[#D900FF]/20 text-[#D900FF] border border-[#D900FF]/40' 
                          : 'bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40'
                      }`}>
                        {order.tipeLayanan === 'Sewa_PS' ? 'Sewa Konsol PS' : 'Instalasi Game'}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">
                      {order.customerName} • <span className="font-mono text-xs text-gray-300">{order.noWhatsApp}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00D2FF]" />
                      <span>{order.alamat}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono text-gray-400">{order.jadwalKunjungan}</div>
                    <div className="text-sm font-bold text-[#FACC15] font-mono mt-0.5">
                      Rp {(order.grandTotal || 0).toLocaleString('id-ID')}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 font-mono">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Dispatch & Assign Teknisi */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">Teknisi Ditugaskan:</span>
                    <span className="font-bold text-white bg-[#0F1016] px-2.5 py-1 rounded-lg border border-[#232A44] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      {order.teknisi || 'Andi'} (T01)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Pesanan ${order.id} berhasil ditugaskan ke Teknisi Andi`)}
                      className="px-3 py-1.5 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] hover:bg-[#00D2FF] hover:text-black text-xs font-bold transition-all"
                    >
                      Tugaskan Andi (T01)
                    </button>
                    <button
                      onClick={() => alert(`Pesanan ${order.id} berhasil ditugaskan ke Teknisi Budi`)}
                      className="px-3 py-1.5 rounded-xl bg-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E] hover:text-black text-xs font-bold transition-all"
                    >
                      Tugaskan Budi (T02)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIKASI E-KYC KTP */}
      {activeTab === 'ekyc' && (
        <div className="space-y-4">
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00D2FF]" />
              <span>Verifikasi Berkas Identitas KTP Pelanggan (Google Drive Privat)</span>
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Admin memeriksa keaslian KTP sebelum pesanan sewa konsol PS disetujui. Berkas tersimpan di Google Drive aman dengan audit trail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.filter(o => o.tipeLayanan === 'Sewa_PS').map(order => (
                <div key={order.id} className="bg-[#0F1016] border border-[#232A44] rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-mono text-xs text-[#00D2FF] font-bold">{order.id}</div>
                      <div className="font-bold text-sm text-white">{order.customerName}</div>
                      <div className="text-xs text-gray-400 font-mono">{order.noWhatsApp}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.ktpVerified ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.ktpVerified ? '✓ Verified' : 'Pending Review'}
                    </span>
                  </div>

                  {/* Foto KTP Preview */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-[#232A44] mb-3">
                    <img
                      src={order.ktpPhotoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400'}
                      alt="KTP Pelanggan"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-gray-300">
                      Privat: Drive/eKYC_KTP
                    </div>
                  </div>

                  {/* Tombol Aksi Verifikasi */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onVerifyKTP(order.id, 'Verified')}
                      className="flex-1 py-2 rounded-xl bg-[#22C55E] text-[#0F1016] font-bold text-xs shadow-neon-green hover:brightness-110 flex items-center justify-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Setujui (Verified)</span>
                    </button>
                    <button
                      onClick={() => onVerifyKTP(order.id, 'Rejected')}
                      className="px-3 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold hover:bg-red-500 hover:text-white"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DEPOSIT & REFUND */}
      {activeTab === 'deposit' && (
        <div className="space-y-4">
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#FACC15]" />
              <span>Manajemen Deposit & Pengembalian Dana (Tabel: DepositJaminan)</span>
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Setelah unit konsol selesai dijemput teknisi dan lolos checklist fisik, admin dapat langsung memproses refund atau memotong denda keterlambatan/kerusakan.
            </p>

            <div className="space-y-3">
              {orders.filter(o => o.deposit > 0).map(order => (
                <div key={order.id} className="bg-[#0F1016] border border-[#232A44] rounded-2xl p-3.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#00D2FF]">{order.id}</div>
                    <div className="text-sm font-bold text-white">{order.customerName}</div>
                    <div className="text-xs text-gray-400">
                      Deposit Tertahan: <span className="font-bold text-[#FACC15] font-mono">Rp {order.deposit.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onProcessRefund(order.id, 0, 'Refund_Selesai')}
                      className="px-3.5 py-1.5 rounded-xl bg-[#22C55E] text-[#0F1016] text-xs font-bold shadow-neon-green hover:brightness-110"
                    >
                      Refund Penuh (Rp {order.deposit.toLocaleString('id-ID')})
                    </button>
                    <button
                      onClick={() => {
                        const fine = prompt('Masukkan nominal pemotongan denda (Rp):', '25000');
                        if (fine) onProcessRefund(order.id, Number(fine), 'Dipotong_Denda');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-yellow-500/20 text-[#FACC15] border border-yellow-500/40 text-xs font-bold hover:bg-yellow-500 hover:text-black"
                    >
                      Potong Denda
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KELOLA KATALOG (CRUD) */}
      {activeTab === 'katalog' && (
        <div className="space-y-6">
          {/* Form Tambah Game Baru */}
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#D900FF]" />
              <span>Tambah Game Baru ke Katalog_Game</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
              <div>
                <label className="text-gray-400 block mb-1">Judul Game:</label>
                <input
                  type="text"
                  placeholder="Contoh: EA FC 25"
                  value={newGame.nama}
                  onChange={(e) => setNewGame({ ...newGame, nama: e.target.value })}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Platform:</label>
                <select
                  value={newGame.platform}
                  onChange={(e) => setNewGame({ ...newGame, platform: e.target.value })}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white"
                >
                  <option value="PC">PC</option>
                  <option value="PS4">PS4</option>
                  <option value="PS5">PS5</option>
                  <option value="Switch">Nintendo Switch</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Ukuran (GB):</label>
                <input
                  type="number"
                  value={newGame.ukuranGB}
                  onChange={(e) => setNewGame({ ...newGame, ukuranGB: e.target.value })}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!newGame.nama) return alert('Nama game wajib diisi!');
                onAddGame(newGame);
                setNewGame({ ...newGame, nama: '' });
                alert('Game berhasil ditambahkan ke Google Sheets!');
              }}
              className="py-2 px-4 rounded-xl bg-[#D900FF] text-white text-xs font-bold shadow-neon-magenta hover:bg-[#B300D4]"
            >
              Simpan Game Baru
            </button>
          </div>

          {/* Form Tambah Paket Rental */}
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00D2FF]" />
              <span>Tambah Paket Baru ke Katalog_RentalPS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
              <div>
                <label className="text-gray-400 block mb-1">Nama Paket:</label>
                <input
                  type="text"
                  value={newRental.nama}
                  onChange={(e) => setNewRental({ ...newRental, nama: e.target.value })}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Harga / Hari (Rp):</label>
                <input
                  type="number"
                  value={newRental.hargaPerHari}
                  onChange={(e) => setNewRental({ ...newRental, hargaPerHari: e.target.value })}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Deposit (Rp):</label>
                <input
                  type="number"
                  value={newRental.deposit}
                  onChange={(e) => setNewRental({ ...newRental, deposit: e.target.value })}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <button
              onClick={() => {
                onAddRental(newRental);
                alert('Paket rental berhasil ditambahkan!');
              }}
              className="py-2 px-4 rounded-xl bg-[#00D2FF] text-[#0F1016] text-xs font-bold shadow-neon-blue"
            >
              Simpan Paket Rental
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: INVENTARIS KONSOL & MASTER HDD */}
      {activeTab === 'inventaris' && (
        <div className="space-y-6">
          {/* Inventaris Konsol */}
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#00D2FF]" />
              <span>Tabel: Inventaris_Konsol (Nomor Seri, Fisik, Kelengkapan)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0F1016] text-gray-400 font-mono">
                  <tr>
                    <th className="p-2.5 rounded-l-lg">Nomor Seri</th>
                    <th className="p-2.5">Tipe Konsol</th>
                    <th className="p-2.5">Kondisi Fisik</th>
                    <th className="p-2.5">Stik</th>
                    <th className="p-2.5">Kelengkapan</th>
                    <th className="p-2.5 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232A44]">
                  {konsolList.map(item => (
                    <tr key={item.nomorSeri} className="hover:bg-[#161928]">
                      <td className="p-2.5 font-mono text-[#00D2FF] font-bold">{item.nomorSeri}</td>
                      <td className="p-2.5">{item.tipe}</td>
                      <td className="p-2.5 text-[#22C55E]">{item.kondisi}</td>
                      <td className="p-2.5">{item.stick} Unit</td>
                      <td className="p-2.5 text-gray-400">{item.kabel}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Tersedia' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventaris Master HDD */}
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#22C55E]" />
              <span>Tabel: Inventaris_HDD (Master Game Teknisi)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {hddList.map(hdd => (
                <div key={hdd.nomorHDD} className="bg-[#0F1016] border border-[#232A44] rounded-xl p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-white">{hdd.nomorHDD}</span>
                    <span className="text-[10px] text-[#22C55E] font-mono">{hdd.kapasitas}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mb-2 line-clamp-2">
                    {hdd.daftarGame}
                  </div>
                  <div className="text-[10px] text-[#00D2FF] font-semibold">
                    Status: {hdd.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TITIK TOKO & ONGKIR */}
      {activeTab === 'toko' && (
        <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-4">
          <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00D2FF]" />
            <span>Pengaturan Titik Toko & Tarif Ongkir per KM</span>
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            Titik koordinat GPS toko digunakan untuk menghitung jarak KM otomatis saat pelanggan memesan layanan home service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
            <div>
              <label className="text-gray-400 block mb-1">Koordinat Toko (Latitude, Longitude):</label>
              <input
                type="text"
                value={storeCoords}
                onChange={(e) => setStoreCoords(e.target.value)}
                className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Tarif Ongkir per KM (Rp):</label>
              <input
                type="number"
                value={tarifPerKm}
                onChange={(e) => setTarifPerKm(Number(e.target.value))}
                className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={() => alert('Pengaturan koordinat toko dan tarif ongkir berhasil disimpan!')}
            className="py-2 px-5 rounded-xl bg-[#00D2FF] text-[#0F1016] text-xs font-bold shadow-neon-blue"
          >
            Simpan Pengaturan
          </button>
        </div>
      )}
    </div>
  );
}
