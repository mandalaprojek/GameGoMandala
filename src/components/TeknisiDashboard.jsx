import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Wallet, 
  HardDrive, 
  Tv, 
  Phone, 
  FileCheck,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';

export function TeknisiDashboard({
  orders = [],
  onOpenTrackingScreen,
  onSwitchRole
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [issueReason, setIssueReason] = useState('Rumah kosong / tidak ada orang');

  // Filter tugas untuk Teknisi Andi
  const myTasks = orders.filter(o => o.status !== 'Selesai');
  const completedTasks = orders.filter(o => o.status === 'Selesai');

  // Dompet Teknisi
  const totalKomisi = (completedTasks.length + 1) * 35000;
  const totalBensin = (completedTasks.length + 1) * 15000;

  const handleReportIssue = () => {
    alert(`Laporan kendala: "${issueReason}" berhasil dikirimkan ke Admin untuk dijadwalkan ulang!`);
    setIssueModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-white pb-28">
      {/* Top Banner Teknisi */}
      <div className="bg-gradient-to-r from-[#121A28] via-[#16243A] to-[#121A28] border-2 border-[#22C55E] rounded-3xl p-5 shadow-neon-green mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#22C55E] shadow-neon-green">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
              alt="Andi"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white">Teknisi: Andi Saputra</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E] text-[#0F1016]">
                Siap Bertugas
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono">
              ID: T01 • Plat: B 4128 KZM • ⭐ 4.0 Rating
            </p>
          </div>
        </div>

        {/* Switch Role Pill */}
        <div className="flex items-center gap-2 bg-[#0F1016] p-1.5 rounded-2xl border border-[#232A44]">
          <button
            onClick={() => onSwitchRole('admin')}
            className="px-3 py-1.5 rounded-xl bg-[#D900FF]/20 text-[#D900FF] border border-[#D900FF]/50 text-xs font-bold hover:bg-[#D900FF] hover:text-white transition-all flex items-center gap-1"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Mode Admin</span>
          </button>
        </div>
      </div>

      {/* Dompet & Rincian Penghasilan Teknisi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        <div className="bg-[#141724] border border-[#22C55E]/40 rounded-2xl p-4 shadow-neon-green">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>Dompet Komisi</span>
            <Wallet className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#22C55E]">
            Rp {totalKomisi.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Tarif Rp 35.000 / tugas selesai
          </div>
        </div>

        <div className="bg-[#141724] border border-[#00D2FF]/40 rounded-2xl p-4 shadow-neon-blue-sm">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>Uang Bensin Harian</span>
            <Navigation className="w-4 h-4 text-[#00D2FF]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#00D2FF]">
            Rp {totalBensin.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            Reimbursement otomatis per KM
          </div>
        </div>

        <div className="bg-[#141724] border border-[#FACC15]/40 rounded-2xl p-4">
          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
            <span>Tugas Selesai Hari Ini</span>
            <FileCheck className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {completedTasks.length + 1} Selesai
          </div>
          <div className="text-[10px] text-[#22C55E] mt-1">
            100% Kepuasan Pelanggan
          </div>
        </div>
      </div>

      {/* Checklist Otomatis Barang Bawaan Hari Ini (Packing List) */}
      <div className="bg-[#141724] border-2 border-[#00D2FF]/60 rounded-3xl p-4 shadow-neon-blue mb-6">
        <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-[#00D2FF]" />
          <span>Barang Wajib Bawa Hari Ini (Sesuai Pesanan Masuk):</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className="bg-[#0F1016] border border-[#232A44] rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <div className="font-bold text-xs text-white">HDD Master 01 (2 TB)</div>
                <div className="text-[10px] text-gray-400">Master Game: GTA V, Spiderman 2, FC 24</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold">
              ✓ Di Tas
            </span>
          </div>

          <div className="bg-[#0F1016] border border-[#232A44] rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D900FF]/20 text-[#D900FF] flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <div className="font-bold text-xs text-white">Unit PS5 Disc + 2 DualSense</div>
                <div className="text-[10px] text-gray-400">No. Seri: PS5-CFI1218-01 + Kabel Lengkap</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-bold">
              ✓ Siap Bawa
            </span>
          </div>
        </div>
      </div>

      {/* Daftar Tugas Hari Ini */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#00D2FF]" />
          <span>Tugas Kunjungan Rumah Hari Ini:</span>
        </h2>

        <div className="space-y-3">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-[#141724] border border-[#232A44] hover:border-[#00D2FF] rounded-2xl p-4 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#00D2FF]">{order.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D2FF]/20 text-[#00D2FF]">
                      {order.tipeLayanan === 'Sewa_PS' ? 'Sewa Konsol PS' : 'Instalasi Game'}
                    </span>
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    {order.customerName}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#00D2FF]" />
                    <span>{order.alamat}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Tombol Buka Rute Google Maps */}
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.alamat)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#00D2FF] text-[#0F1016] font-bold text-xs shadow-neon-blue flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Buka Rute Google Maps</span>
                  </a>

                  {/* Hubungi Pelanggan */}
                  <a
                    href={`https://wa.me/${order.noWhatsApp?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 font-bold text-xs flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WA Pelanggan</span>
                  </a>

                  {/* Buka Layar Serah Terima & Tanda Tangan */}
                  <button
                    onClick={() => onOpenTrackingScreen(order)}
                    className="px-3 py-2 rounded-xl bg-[#D900FF] text-white font-bold text-xs shadow-neon-magenta flex items-center gap-1.5"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Form Serah Terima (TTD)</span>
                  </button>

                  {/* Lapor Kendala Lapangan */}
                  <button
                    onClick={() => {
                      setSelectedTask(order);
                      setIssueModalOpen(true);
                    }}
                    className="px-3 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 font-bold text-xs hover:bg-red-500 hover:text-white"
                  >
                    Lapor Kendala
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lapor Kendala Lapangan */}
      {issueModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161928] border-2 border-red-500 rounded-3xl max-w-sm w-full p-5 text-white relative">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-base">Lapor Kendala Lapangan</h3>
            </div>

            <p className="text-xs text-gray-300 mb-3">
              Pilih alasan kendala yang ditemui di lokasi agar Admin dapat melakukan reschedule otomatis atau menghubungi pelanggan:
            </p>

            <div className="space-y-2 mb-4">
              {[
                'Rumah kosong / tidak ada orang di lokasi',
                'Mati lampu di area pelanggan',
                'Spek PC / Laptop tidak mendukung instalasi',
                'Kapasitas sisa penyimpanan pelanggan tidak cukup',
                'Pelanggan meminta penjadwalan ulang'
              ].map(reason => (
                <label
                  key={reason}
                  className={`block p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    issueReason === reason
                      ? 'bg-red-500/20 border-red-500 text-white font-semibold'
                      : 'bg-[#0F1016] border-[#232A44] text-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="issueReason"
                    checked={issueReason === reason}
                    onChange={() => setIssueReason(reason)}
                    className="mr-2"
                  />
                  {reason}
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleReportIssue}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs"
              >
                Kirim Laporan Kendala
              </button>
              <button
                onClick={() => setIssueModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#232A44] text-gray-300 text-xs"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
