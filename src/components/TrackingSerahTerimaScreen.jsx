import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  HardDrive, 
  Tv, 
  Star, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Check, 
  RotateCcw, 
  Download, 
  FileText, 
  CheckCircle2,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function TrackingSerahTerimaScreen({
  order,
  onBack,
  onCompleteOrder
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(true); // default true with nice starter curve
  const [isCompleted, setIsCompleted] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Status Checklist State
  const [checklist, setChecklist] = useState({
    hdd: true,
    konsol: true
  });

  // Setup starter signature jika belum ada coretan
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    drawStarterSignature(ctx, canvas.width, canvas.height);
  }, []);

  const drawStarterSignature = (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#00D2FF';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw stylish starter signature cursive "Dimas"
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.55);
    ctx.bezierCurveTo(w * 0.25, h * 0.2, w * 0.35, h * 0.25, w * 0.35, h * 0.65);
    ctx.bezierCurveTo(w * 0.35, h * 0.85, w * 0.45, h * 0.5, w * 0.52, h * 0.5);
    ctx.bezierCurveTo(w * 0.58, h * 0.35, w * 0.65, h * 0.7, w * 0.75, h * 0.45);
    ctx.bezierCurveTo(w * 0.8, h * 0.3, w * 0.85, h * 0.55, w * 0.9, h * 0.5);
    ctx.stroke();

    // Underline flourish
    ctx.beginPath();
    ctx.moveTo(w * 0.25, h * 0.75);
    ctx.quadraticCurveTo(w * 0.55, h * 0.8, w * 0.85, h * 0.7);
    ctx.stroke();
  };

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  // Drawing event handlers for touch & mouse
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.strokeStyle = '#00D2FF';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleFinishConfirmation = () => {
    // Jalankan efek selebrasi confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setIsCompleted(true);
    setShowInvoiceModal(true);

    if (onCompleteOrder) {
      const canvas = canvasRef.current;
      const signatureBase64 = canvas ? canvas.toDataURL() : '';
      onCompleteOrder({
        orderId: order?.id || 'ORD-20261021-001',
        signatureBase64,
        checklist
      });
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-20 text-white">
      {/* 1. Header Sesuai Mockup Layar 3 */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-[#161928] border border-[#232A44] flex items-center justify-center text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold tracking-wide text-white">
          Lacak & Serah Terima
        </h1>
      </div>

      {/* 2. Stylized Tactical Route Map Widget (Sesuai Mockup Layar 3) */}
      <div className="px-4 mb-3.5">
        <div className="relative w-full h-[190px] rounded-3xl overflow-hidden bg-[#111422] border-2 border-[#00D2FF]/60 shadow-[0_0_18px_rgba(0,210,255,0.35)]">
          {/* Simulated Dark City Map SVG */}
          <svg className="w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Map Roads Grids */}
            <path d="M 0 50 Q 150 40 400 80" stroke="#1E2845" strokeWidth="12" fill="none" />
            <path d="M 50 0 L 80 200" stroke="#1E2845" strokeWidth="8" fill="none" />
            <path d="M 180 0 L 210 200" stroke="#1E2845" strokeWidth="14" fill="none" />
            <path d="M 320 0 L 300 200" stroke="#1E2845" strokeWidth="10" fill="none" />
            <path d="M 0 140 Q 200 160 400 130" stroke="#1E2845" strokeWidth="10" fill="none" />
            
            {/* Road Blocks */}
            <rect x="90" y="60" width="80" height="70" fill="#151A2E" rx="8" />
            <rect x="230" y="20" width="70" height="60" fill="#151A2E" rx="8" />
            <rect x="230" y="95" width="80" height="85" fill="#151A2E" rx="8" />
            <rect x="10" y="60" width="30" height="70" fill="#151A2E" rx="6" />

            {/* Glowing Neon Blue Delivery Route Path */}
            <path
              d="M 80 140 L 140 140 L 160 80 L 260 80 L 280 110"
              stroke="#00D2FF"
              strokeWidth="5"
              fill="none"
              strokeDasharray="6 3"
              className="animate-pulse"
              filter="drop-shadow(0 0 6px #00D2FF)"
            />

            {/* Start point (Technician current location) */}
            <circle cx="80" cy="140" r="7" fill="#00D2FF" filter="drop-shadow(0 0 8px #00D2FF)" />

            {/* Destination Point (House Pin) */}
            <circle cx="280" cy="110" r="9" fill="#D900FF" filter="drop-shadow(0 0 10px #D900FF)" />
            <circle cx="280" cy="110" r="4" fill="#FFFFFF" />
          </svg>

          {/* Floating Route Status Pill (Sesuai Mockup Layar 3) */}
          <div className="absolute top-3 inset-x-4 flex justify-center">
            <div className="bg-[#121626]/90 backdrop-blur-md border border-[#00D2FF]/80 rounded-full px-3.5 py-1.5 shadow-[0_0_14px_rgba(0,210,255,0.4)] flex items-center gap-2">
              <span className="text-base">🛵</span>
              <span className="text-xs font-bold text-[#22C55E] flex items-center gap-1 font-mono">
                Teknisi Menuju Rumah <span className="text-white">(15 mnt)</span>
              </span>
            </div>
          </div>

          {/* Quick Open Google Maps Button */}
          <div className="absolute bottom-3 right-3">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[#00D2FF] text-[10px] font-bold border border-[#00D2FF]/40 flex items-center gap-1 hover:bg-[#00D2FF] hover:text-black transition-colors"
            >
              <Navigation className="w-3 h-3" />
              <span>Buka Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Kartu Profil Teknisi (Sesuai Mockup Layar 3) */}
      <div className="px-4 mb-3.5">
        <div className="bg-[#141724] border-2 border-[#00D2FF]/60 rounded-2xl p-3 shadow-[0_0_12px_rgba(0,210,255,0.25)] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wide">
              Teknisi Anda: Andi
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex text-[#FACC15]">
                <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
                <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
                <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
                <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
              </div>
              <span className="text-xs font-bold text-gray-300 font-mono">4.0</span>
            </div>
          </div>

          {/* Avatar & Quick Contact */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6281298765432"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 flex items-center justify-center hover:scale-105 transition-transform"
              title="Chat WhatsApp Teknisi"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00D2FF] shadow-neon-blue">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                alt="Teknisi Andi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section Checklist Serah Terima (Sesuai Mockup Layar 3) */}
      <div className="px-4 mb-3.5">
        <div className="text-xs font-bold text-gray-300 mb-2">Checklist</div>
        <div className="space-y-2">
          {/* Item 1: HDD Master 01 */}
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1C2237] flex items-center justify-center border border-[#00D2FF]/30">
                <HardDrive className="w-4 h-4 text-[#00D2FF]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">HDD Master 01</span>
                <div className="text-[10px] text-gray-400">Penyimpanan Master Game 2TB</div>
              </div>
            </div>
            
            <button
              onClick={() => setChecklist(prev => ({ ...prev, hdd: !prev.hdd }))}
              className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 ${
                checklist.hdd 
                  ? 'bg-[#22C55E] text-[#0F1016] shadow-[0_0_10px_rgba(34,197,94,0.6)]' 
                  : 'bg-[#1C2237] text-gray-400'
              }`}
            >
              {checklist.hdd && <Check className="w-3 h-3 stroke-[3]" />}
              <span>OK</span>
            </button>
          </div>

          {/* Item 2: Konsol & 2 Stik */}
          <div className="bg-[#141724] border border-[#232A44] rounded-2xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1C2237] flex items-center justify-center border border-[#00D2FF]/30">
                <Tv className="w-4 h-4 text-[#00D2FF]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Konsol & 2 Stik</span>
                <div className="text-[10px] text-gray-400">Unit PS5 + 2 Stik DualSense Ori</div>
              </div>
            </div>

            <button
              onClick={() => setChecklist(prev => ({ ...prev, konsol: !prev.konsol }))}
              className={`px-3 py-1 rounded-full text-xs font-extrabold transition-all flex items-center gap-1 ${
                checklist.konsol 
                  ? 'bg-[#22C55E] text-[#0F1016] shadow-[0_0_10px_rgba(34,197,94,0.6)]' 
                  : 'bg-[#1C2237] text-gray-400'
              }`}
            >
              {checklist.konsol && <Check className="w-3 h-3 stroke-[3]" />}
              <span>OK</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Tanda Tangan Pelanggan Interactive Canvas (Sesuai Mockup Layar 3) */}
      <div className="px-4 mb-4">
        <div className="bg-[#141724] border-2 border-[#00D2FF]/70 rounded-2xl p-3 shadow-[0_0_14px_rgba(0,210,255,0.3)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">
              Tanda Tangan Pelanggan
            </span>
            <button
              onClick={handleClearSignature}
              className="text-[10px] text-gray-400 hover:text-white flex items-center gap-1 bg-[#1C2237] px-2 py-0.5 rounded-md"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Bersihkan</span>
            </button>
          </div>

          {/* Interactive Signature Pad Box */}
          <div className="relative w-full h-24 bg-[#0D101C] rounded-xl overflow-hidden border border-[#00D2FF]/40">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full signature-canvas"
            />
            {!hasSigned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs text-gray-500 font-mono">
                Sentuh & coret tanda tangan di sini...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Tombol Selesai & Konfirmasi (Gradasi Hijau ke Ungu Sesuai Mockup) */}
      <div className="px-4 mt-auto">
        <button
          onClick={handleFinishConfirmation}
          className="w-full py-3.5 px-6 rounded-full font-extrabold text-sm text-white btn-green-to-purple flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>Selesai & Konfirmasi</span>
        </button>
      </div>

      {/* Modal PDF Berita Acara & Invoice */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161928] border-2 border-[#22C55E] rounded-3xl max-w-sm w-full p-5 shadow-neon-green text-white relative">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center mx-auto mb-2 border border-[#22C55E]">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h3 className="font-bold text-lg text-white">Transaksi Selesai & Sah!</h3>
              <p className="text-xs text-gray-400 mt-1">
                Berita Acara Sewa & Invoice Digital telah tersimpan di Google Sheets & Google Drive.
              </p>
            </div>

            {/* Rincian Invoice Singkat */}
            <div className="bg-[#0F1016] p-3.5 rounded-2xl border border-[#232A44] text-xs space-y-1.5 mb-4 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">No. Order:</span>
                <span className="text-white font-bold">{order?.id || 'ORD-20261021-001'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Teknisi:</span>
                <span className="text-[#00D2FF]">Andi (T01)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Checklist:</span>
                <span className="text-[#22C55E] font-bold">Lengkap (OK)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tanda Tangan:</span>
                <span className="text-[#22C55E]">Tervalidasi Digital</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('Mengunduh Berita Acara & Invoice PDF resmi...');
                  setShowInvoiceModal(false);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#00D2FF] text-[#0F1016] shadow-neon-blue flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Unduh PDF Berita Acara</span>
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#1F2438] text-gray-300 hover:text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
