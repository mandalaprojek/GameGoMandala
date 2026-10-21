import React, { useState } from 'react';
import { 
  Clock, 
  RotateCw, 
  DollarSign, 
  AlertCircle, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Tv, 
  HardDrive,
  MessageSquarePlus,
  Send
} from 'lucide-react';

export function CustomerPortal({
  orders = [],
  onOpenTrackingScreen
}) {
  const [complaintModal, setComplaintModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [complaintText, setComplaintText] = useState('');
  const [rating, setRating] = useState(5);
  const [successToast, setSuccessToast] = useState('');

  const activeRentals = orders.filter(o => o.tipeLayanan === 'Sewa_PS');

  const handleExtendRental = (orderId) => {
    setSuccessToast(`Permintaan perpanjangan sewa untuk ${orderId} berhasil dikirim ke Admin!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleRequestRefund = (orderId) => {
    setSuccessToast(`Pengajuan refund deposit ${orderId} sedang diproses oleh Admin.`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    setSuccessToast(`Tiket garansi berhasil dibuat untuk ${selectedOrder?.id}. Teknisi akan segera menghubungi Anda.`);
    setComplaintModal(false);
    setComplaintText('');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-white pb-24">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#22C55E] text-[#0F1016] px-4 py-3 rounded-2xl font-bold text-xs shadow-neon-green flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 stroke-[3]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Portal Pelanggan */}
      <div className="bg-[#141724] border-2 border-[#00D2FF]/60 rounded-3xl p-5 shadow-neon-blue mb-6">
        <h1 className="text-xl font-display font-extrabold text-white mb-1">
          Area Pelanggan GameGoMandala
        </h1>
        <p className="text-xs text-gray-300">
          Pantau status pesanan instalasi, hitung mundur masa sewa PS, ajukan perpanjangan atau refund deposit, dan klaim garansi servis.
        </p>
      </div>

      {/* Active PS Rentals Countdown Card */}
      {activeRentals.length > 0 && (
        <div className="mb-6 space-y-4">
          <h2 className="text-sm font-bold text-[#FACC15] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FACC15]" />
            <span>Sewa Konsol PS Sedang Berjalan:</span>
          </h2>

          {activeRentals.map(rental => (
            <div
              key={rental.id}
              className="bg-gradient-to-r from-[#171D30] to-[#141828] border-2 border-[#00D2FF] rounded-3xl p-4 shadow-neon-blue"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#00D2FF]">{rental.id}</span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E]">
                      Unit Aktif
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    {rental.items?.[0]?.nama || 'Paket PS5 + 2 Stik'}
                  </h3>
                  <div className="text-xs text-gray-400">
                    Alamat: {rental.alamat}
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-[#0F1016] border border-[#232A44] rounded-2xl p-3 flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold font-mono text-[#FACC15]">22</div>
                    <div className="text-[9px] text-gray-400 uppercase">Jam</div>
                  </div>
                  <span className="text-[#FACC15] font-bold">:</span>
                  <div className="text-center">
                    <div className="text-lg font-bold font-mono text-[#FACC15]">45</div>
                    <div className="text-[9px] text-gray-400 uppercase">Menit</div>
                  </div>
                  <span className="text-[#FACC15] font-bold">:</span>
                  <div className="text-center">
                    <div className="text-lg font-bold font-mono text-[#FACC15]">18</div>
                    <div className="text-[9px] text-gray-400 uppercase">Detik</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Perpanjang & Refund */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#232A44]">
                <button
                  onClick={() => handleExtendRental(rental.id)}
                  className="px-4 py-2 rounded-xl bg-[#D900FF] hover:bg-[#B300D4] text-white font-bold text-xs shadow-neon-magenta flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Perpanjang Sewa</span>
                </button>

                <button
                  onClick={() => handleRequestRefund(rental.id)}
                  className="px-4 py-2 rounded-xl bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/50 hover:bg-[#22C55E] hover:text-black font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Ajukan Refund Deposit (Rp {(rental.deposit || 100000).toLocaleString('id-ID')})</span>
                </button>

                <button
                  onClick={() => onOpenTrackingScreen(rental)}
                  className="px-4 py-2 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/50 font-bold text-xs hover:bg-[#00D2FF] hover:text-black transition-all"
                >
                  Lacak Teknisi / Serah Terima
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Riwayat Pesanan & Form Garansi */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Riwayat Pesanan & Garansi Instalasi (7 Hari Bebas Error)</span>
        </h2>

        <div className="space-y-3">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-[#141724] border border-[#232A44] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#00D2FF] font-bold">{order.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A2238] text-gray-300">
                    {order.tipeLayanan === 'Sewa_PS' ? 'Rental PS' : 'Instal Game'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E]">
                    {order.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  {order.items?.map(i => i.nama).join(', ') || 'Layanan Game'}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Total: <span className="text-[#FACC15] font-mono font-bold">Rp {(order.grandTotal || 0).toLocaleString('id-ID')}</span> • Teknisi: {order.teknisi || 'Andi'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setComplaintModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1E253E] text-gray-300 hover:text-white border border-[#232A44] text-xs font-semibold flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Klaim Garansi / Komplain</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Komplain Garansi */}
      {complaintModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161928] border-2 border-yellow-400/80 rounded-3xl max-w-sm w-full p-5 text-white relative shadow-neon-yellow">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-base">Klaim Garansi & Kendala Game</h3>
            </div>

            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              Garansi resmi instalasi berlaku 7 hari. Jika game crash, error directX, atau butuh bantuan setting, teknisi kami siap melakukan kunjungan ulang gratis!
            </p>

            <form onSubmit={handleSubmitComplaint} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">ID Pesanan:</label>
                <input
                  type="text"
                  disabled
                  value={selectedOrder?.id || ''}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl px-3 py-2 text-gray-400 font-mono"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Deskripsi Masalah / Error:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Game GTA V muncul error DLL saat dibuka..."
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  className="w-full bg-[#0F1016] border border-[#232A44] rounded-xl p-3 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Tiket Garansi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setComplaintModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#232A44] text-gray-300 text-xs"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
