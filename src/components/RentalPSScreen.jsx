import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Upload, 
  Check, 
  Info,
  Calendar,
  Lock
} from 'lucide-react';

export function RentalPSScreen({
  rentals = [],
  onBack,
  onProceedRental,
  onOpenKYC
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [durasiHari, setDurasiHari] = useState(1);
  const [isKtpModalOpen, setIsKtpModalOpen] = useState(false);
  const [ktpUploaded, setKtpUploaded] = useState(true); // default demo verified

  const selectedRental = rentals[selectedIndex] || rentals[0];

  return (
    <div className="flex flex-col min-h-full pb-20 text-white">
      {/* 1. Header Sesuai Mockup Layar 2 */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-[#161928] border border-[#232A44] flex items-center justify-center text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold tracking-wide text-white">
          Sewa Konsol PS ke Rumah
        </h1>
      </div>

      {/* 2. Subtitle Section */}
      <div className="px-4 mb-3">
        <h2 className="text-sm font-semibold text-gray-300">
          Pilih Paket Rental
        </h2>
      </div>

      {/* 3. Cards / Carousel Sesuai Mockup Layar 2 */}
      <div className="px-4 mb-3">
        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory">
          {rentals.map((rental, idx) => {
            const isChosen = idx === selectedIndex;
            return (
              <div
                key={rental.id}
                onClick={() => setSelectedIndex(idx)}
                className={`snap-center shrink-0 w-[240px] rounded-3xl p-3.5 bg-[#141724] transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isChosen
                    ? 'border-[#00D2FF] shadow-[0_0_22px_rgba(0,210,255,0.6)] scale-[1.02]'
                    : 'border-[#00D2FF]/40 opacity-75 hover:opacity-100 hover:border-[#00D2FF]/80'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0A0D18] mb-3 flex items-center justify-center">
                  <img
                    src={rental.fotoUrl}
                    alt={rental.nama}
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute top-2 right-2 bg-[#22C55E] text-[#0F1016] font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-neon-green">
                    Tersedia
                  </div>
                </div>

                {/* Details Sesuai Mockup */}
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">
                    {rental.nama}
                  </h3>
                  
                  {/* Harga Sewa Warna Kuning */}
                  <div className="text-sm font-extrabold text-[#FACC15] font-mono mb-2">
                    Rp {rental.hargaPerHari.toLocaleString('id-ID')}{' '}
                    <span className="text-xs font-normal text-gray-400">/ Hari</span>
                  </div>

                  {/* Status Badge "Tersedia" Sesuai Mockup */}
                  <div className="mb-2">
                    <span className="inline-block bg-[#22C55E] text-[#0F1016] font-bold text-xs px-3 py-0.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      Tersedia
                    </span>
                  </div>

                  {/* Deposit Info Sesuai Mockup */}
                  <div className="text-[11px] text-gray-400 font-mono">
                    Deposit: Rp {rental.deposit.toLocaleString('id-ID')} (Aman)
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Slider Indicator Sesuai Mockup */}
        <div className="flex justify-center items-center gap-1.5 mt-2">
          {rentals.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === selectedIndex 
                  ? 'w-6 bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]' 
                  : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 4. Durasi Sewa Picker */}
      <div className="px-4 mb-4">
        <div className="bg-[#151928] border border-[#232A44] rounded-2xl p-3">
          <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
            <span className="font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00D2FF]" />
              Durasi Sewa:
            </span>
            <span className="text-[#FACC15] font-bold font-mono">
              Total: Rp {(selectedRental.hargaPerHari * durasiHari).toLocaleString('id-ID')}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 7].map(days => (
              <button
                key={days}
                onClick={() => setDurasiHari(days)}
                className={`py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
                  durasiHari === days
                    ? 'bg-[#00D2FF] text-[#0F1016] shadow-neon-blue font-bold'
                    : 'bg-[#1D2237] text-gray-300 hover:text-white'
                }`}
              >
                {days === 7 ? '1 Minggu' : `${days} Hari`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Widget Verifikasi KTP Jaminan (e-KYC) Sesuai Mockup Layar 2 */}
      <div className="px-4 mb-6">
        <div
          onClick={() => setIsKtpModalOpen(true)}
          className="relative bg-gradient-to-r from-[#17233B] via-[#1B2945] to-[#121A2E] border-2 border-[#00D2FF]/70 rounded-2xl p-3.5 shadow-[0_0_16px_rgba(0,210,255,0.3)] cursor-pointer hover:border-[#00D2FF] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {/* ID Card Graphic with Check */}
            <div className="relative w-12 h-9 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg p-1 shadow-md flex flex-col justify-between">
              <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
              <div className="space-y-0.5">
                <div className="w-6 h-1 bg-white/70 rounded-full" />
                <div className="w-4 h-1 bg-white/40 rounded-full" />
              </div>
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-[#22C55E] rounded-full flex items-center justify-center text-black shadow-sm">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Verifikasi KTP Jaminan (e-KYC)</span>
              </div>
              <div className="text-[10px] text-gray-300 mt-0.5 flex items-center gap-1">
                <span className="text-[#22C55E] font-semibold">
                  {ktpUploaded ? '✓ KTP Terunggah & Aman' : 'Klik untuk Unggah KTP'}
                </span>
              </div>
            </div>
          </div>

          {/* Secure-badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/40 text-[#22C55E] text-[10px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure-badge</span>
          </div>
        </div>
      </div>

      {/* 6. Tombol CTA Utama: "Sewa Ke Rumah" (Warna Magenta Sesuai Mockup) */}
      <div className="px-4 mt-auto">
        <button
          onClick={() => onProceedRental(selectedRental, durasiHari)}
          className="w-full py-3.5 px-6 rounded-full font-extrabold text-sm text-white bg-[#D900FF] hover:bg-[#B300D4] shadow-[0_0_22px_rgba(217,0,255,0.7)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Sewa Ke Rumah</span>
        </button>
      </div>

      {/* Modal e-KYC KTP */}
      {isKtpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161928] border-2 border-[#00D2FF] rounded-3xl max-w-sm w-full p-5 shadow-neon-blue-intense text-white relative">
            <button
              onClick={() => setIsKtpModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
              <h3 className="font-bold text-base text-white">Verifikasi Jaminan e-KYC</h3>
            </div>

            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              Demi keamanan bersama dan perlindungan aset konsol, penyewa wajib melampirkan foto KTP & selfie. Data tersimpan di folder Google Drive privat berenkripsi.
            </p>

            <div className="border-2 border-dashed border-[#00D2FF]/50 rounded-2xl p-4 text-center mb-4 bg-[#0F1016]/60">
              <Upload className="w-8 h-8 text-[#00D2FF] mx-auto mb-2" />
              <div className="text-xs font-semibold text-white">Foto KTP / Identitas Sah</div>
              <div className="text-[10px] text-gray-400 mt-1">Format JPG, PNG (Maksimal 5MB)</div>
              <div className="mt-3 inline-block px-3 py-1 bg-[#22C55E]/20 text-[#22C55E] rounded-full text-xs font-semibold">
                ✓ Identitas Terverifikasi
              </div>
            </div>

            <button
              onClick={() => {
                setKtpUploaded(true);
                setIsKtpModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#00D2FF] text-[#0F1016] shadow-neon-blue"
            >
              Simpan & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
