import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  CreditCard, 
  Upload, 
  CheckCircle2, 
  Phone, 
  User, 
  ShieldCheck, 
  HardDrive,
  FileText
} from 'lucide-react';

export function CheckoutModal({
  isOpen,
  onClose,
  serviceType, // 'Install_Game' atau 'Sewa_PS'
  selectedGames = [],
  selectedRental = null,
  durasiHari = 1,
  onConfirmOrder
}) {
  const [formData, setFormData] = useState({
    nama: 'Dimas Wicaksono',
    noWhatsApp: '0813-1122-3344',
    alamat: 'Jl. Melati No. 14, RT 03/RW 05, Cilandak, Jakarta Selatan',
    jarakKM: 5,
    slotWaktu: 'Pagi (09:00 - 12:00)',
    metodeBayar: 'Transfer Bank (BCA / Mandiri / QRIS)',
    statusBayar: 'DP 50%',
    dxdiagUploaded: false,
    otpCode: '',
    otpSent: false,
    otpVerified: true
  });

  if (!isOpen) return null;

  const tarifPerKM = 3000;
  const ongkir = formData.jarakKM * tarifPerKM;

  const subtotal = serviceType === 'Install_Game'
    ? selectedGames.reduce((acc, g) => acc + (g.harga || 0), 0)
    : (selectedRental?.hargaPerHari || 0) * durasiHari;

  const deposit = serviceType === 'Sewa_PS' ? (selectedRental?.deposit || 100000) : 0;
  const grandTotal = subtotal + ongkir + deposit;
  const totalGB = selectedGames.reduce((acc, g) => acc + (g.ukuranGB || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.noWhatsApp || !formData.alamat) {
      alert('Harap lengkapi semua data formulir pengiriman!');
      return;
    }

    onConfirmOrder({
      nama: formData.nama,
      noWhatsApp: formData.noWhatsApp,
      alamat: formData.alamat,
      tipeLayanan: serviceType,
      items: serviceType === 'Install_Game' 
        ? selectedGames 
        : [{ nama: selectedRental.nama, spec: `${durasiHari} Hari Sewa`, harga: subtotal }],
      totalGB: totalGB,
      totalHarga: subtotal,
      deposit: deposit,
      ongkir: ongkir,
      jarakKM: formData.jarakKM,
      jadwalKunjungan: `Hari ini, ${formData.slotWaktu}`,
      slotWaktu: formData.slotWaktu,
      metodeBayar: formData.metodeBayar,
      statusBayar: formData.statusBayar,
      dxdiagPhotoUrl: formData.dxdiagUploaded ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400' : null
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-[#141724] border-2 border-[#00D2FF] rounded-3xl max-w-md w-full p-5 shadow-neon-blue-intense text-white relative my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 mb-1.5 uppercase font-mono">
            {serviceType === 'Install_Game' ? 'Instalasi Game Offline' : 'Rental Konsol PS Door-to-Door'}
          </div>
          <h2 className="text-xl font-display font-bold text-white">
            Form Pemesanan & Jadwal Kunjungan
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Data Pelanggan */}
          <div className="space-y-2.5 bg-[#0F1016] p-3 rounded-2xl border border-[#232A44]">
            <span className="font-bold text-gray-300 flex items-center gap-1.5 text-xs text-[#00D2FF]">
              <User className="w-3.5 h-3.5" />
              Identitas Pemesan
            </span>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Nama Lengkap:</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full bg-[#161928] border border-[#232A44] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
              />
            </div>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1">No. WhatsApp (Notifikasi & OTP):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={formData.noWhatsApp}
                  onChange={(e) => setFormData({ ...formData, noWhatsApp: e.target.value })}
                  className="flex-1 bg-[#161928] border border-[#232A44] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
                />
                <div className="px-2.5 py-1.5 bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 rounded-xl flex items-center gap-1 font-bold text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Terverifikasi</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Alamat Lengkap Kunjungan:</label>
              <textarea
                rows={2}
                required
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="w-full bg-[#161928] border border-[#232A44] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
              />
            </div>
          </div>

          {/* Ongkir & Simulasi Jarak */}
          <div className="bg-[#0F1016] p-3 rounded-2xl border border-[#232A44] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#00D2FF] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Estimasi Ongkir Jarak
              </span>
              <span className="font-mono text-[#FACC15] font-bold">
                {formData.jarakKM} KM = Rp {ongkir.toLocaleString('id-ID')}
              </span>
            </div>
            
            <input
              type="range"
              min="1"
              max="25"
              value={formData.jarakKM}
              onChange={(e) => setFormData({ ...formData, jarakKM: Number(e.target.value) })}
              className="w-full accent-[#00D2FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>Dekat (1 KM)</span>
              <span>Tarif Rp 3.000 / KM</span>
              <span>Jauh (25 KM)</span>
            </div>
          </div>

          {/* Slot Jadwal Kunjungan */}
          <div className="bg-[#0F1016] p-3 rounded-2xl border border-[#232A44] space-y-2">
            <span className="font-bold text-[#00D2FF] flex items-center gap-1 text-xs">
              <Clock className="w-3.5 h-3.5" />
              Pilih Slot Waktu Kunjungan Teknisi
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                'Pagi (09:00 - 12:00)',
                'Siang (13:00 - 16:00)',
                'Sore (16:00 - 19:00)'
              ].map(slot => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setFormData({ ...formData, slotWaktu: slot })}
                  className={`p-1.5 rounded-xl text-[10px] font-semibold transition-all border ${
                    formData.slotWaktu === slot
                      ? 'bg-[#00D2FF]/20 text-[#00D2FF] border-[#00D2FF] shadow-neon-blue'
                      : 'bg-[#161928] text-gray-400 border-[#232A44] hover:text-white'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Screenshot DxDiag / Sisa Memori (Khusus Install Game) */}
          {serviceType === 'Install_Game' && (
            <div className="bg-[#0F1016] p-3 rounded-2xl border border-[#232A44] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-300 flex items-center gap-1.5 text-xs text-[#00D2FF]">
                  <HardDrive className="w-3.5 h-3.5" />
                  Cek Spek: Screenshot dxdiag / Sisa Disk
                </span>
              </div>
              <div 
                onClick={() => setFormData({ ...formData, dxdiagUploaded: !formData.dxdiagUploaded })}
                className="border border-dashed border-[#00D2FF]/40 rounded-xl p-2.5 text-center cursor-pointer hover:bg-[#161928] transition-colors"
              >
                {formData.dxdiagUploaded ? (
                  <div className="text-[#22C55E] flex items-center justify-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Screenshot dxdiag terlampir (Spek Cocok!)</span>
                  </div>
                ) : (
                  <div className="text-gray-400 flex items-center justify-center gap-1.5">
                    <Upload className="w-4 h-4 text-[#00D2FF]" />
                    <span>Klik untuk lampirkan foto spek (Opsional)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rincian Biaya */}
          <div className="bg-[#0F1016] p-3.5 rounded-2xl border border-[#232A44] space-y-1.5 font-mono">
            <div className="flex justify-between text-gray-300">
              <span>Layanan ({serviceType === 'Install_Game' ? `${selectedGames.length} Game` : `${durasiHari} Hari Sewa`}):</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Ongkir Home Service ({formData.jarakKM} KM):</span>
              <span>Rp {ongkir.toLocaleString('id-ID')}</span>
            </div>
            {deposit > 0 && (
              <div className="flex justify-between text-[#22C55E]">
                <span>Deposit Jaminan (Aman & Kembali):</span>
                <span>Rp {deposit.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="border-t border-[#232A44] pt-2 flex justify-between text-sm font-bold text-[#FACC15]">
              <span>Grand Total:</span>
              <span className="text-base">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Tombol Konfirmasi Akhir */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl font-bold text-sm text-white btn-green-to-purple shadow-neon-green flex items-center justify-center gap-2"
          >
            <span>Konfirmasi Pesanan & Lacak Teknisi</span>
          </button>
        </form>
      </div>
    </div>
  );
}
