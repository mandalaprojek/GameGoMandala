import React, { useState } from 'react';
import { 
  Gamepad2, 
  HardDrive, 
  Check, 
  Plus, 
  Search, 
  Info, 
  Cpu, 
  Tv, 
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight,
  Disc3
} from 'lucide-react';

export function KatalogScreen({
  games = [],
  selectedGames = [],
  onToggleGame,
  hddCapacity = 500,
  setHddCapacity,
  onProceedToCheckout,
  onSwitchToRental
}) {
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailGame, setDetailGame] = useState(null);
  const [isSettingHdd, setIsSettingHdd] = useState(false);

  // Hitung total GB terpilih
  const totalGBSelected = selectedGames.reduce((acc, g) => acc + (g.ukuranGB || 0), 0);
  const isOverCapacity = totalGBSelected > hddCapacity;
  const percentageUsed = Math.min(100, Math.round((totalGBSelected / hddCapacity) * 100));

  // Filter games
  const filteredGames = games.filter(game => {
    const matchesPlatform = selectedPlatform === 'ALL' || game.platform === selectedPlatform;
    const matchesSearch = game.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (game.genre && game.genre.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesSearch;
  });

  const platforms = [
    { id: 'ALL', label: 'Semua' },
    { id: 'PC', label: 'PC', icon: '💻' },
    { id: 'PS4', label: 'PS4', icon: '🎮' },
    { id: 'PS5', label: 'PS5', icon: '⚡' },
    { id: 'Switch', label: 'Switch', icon: '🔴' },
  ];

  const hddPresets = [256, 500, 1000, 2000];

  return (
    <div className="flex flex-col min-h-full pb-24 text-white">
      {/* 1. Header Identitas Sesuai Mockup */}
      <div className="pt-2 pb-3 px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <Gamepad2 className="w-7 h-7 text-[#00D2FF] drop-shadow-[0_0_8px_#00D2FF]" />
          <h1 className="text-2xl font-display font-extrabold tracking-wide text-[#00D2FF] drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]">
            GameGoMandala
          </h1>
        </div>
      </div>

      {/* 2. Sticky Kapasitas HDD Widget (Sesuai Mockup Layar 1) */}
      <div className="px-4 mb-4">
        <div className={`rounded-2xl p-3.5 transition-all ${
          isOverCapacity 
            ? 'bg-[#181116] border-2 border-[#EF4444] shadow-[0_0_18px_rgba(239,68,68,0.5)]' 
            : 'bg-[#151928] border-2 border-[#00D2FF] shadow-[0_0_16px_rgba(0,210,255,0.45)]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className={`w-4 h-4 ${isOverCapacity ? 'text-[#EF4444]' : 'text-[#00D2FF]'}`} />
              <span className="text-sm font-semibold tracking-wide">
                Kapasitas HDD:
              </span>
              <span className={`text-sm font-bold font-mono ${isOverCapacity ? 'text-[#EF4444] animate-pulse' : 'text-[#22C55E]'}`}>
                {totalGBSelected} GB
              </span>
              <span className="text-gray-400 text-xs">/</span>
              <button
                onClick={() => setIsSettingHdd(!isSettingHdd)}
                title="Klik untuk ubah ukuran HDD/SSD Anda"
                className="text-sm font-bold text-gray-200 hover:text-[#00D2FF] underline decoration-dotted flex items-center gap-1 font-mono"
              >
                {hddCapacity} GB
                <SlidersHorizontal className="w-3 h-3 text-[#00D2FF]" />
              </button>
            </div>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
              isOverCapacity 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-green-500/20 text-[#22C55E]'
            }`}>
              {percentageUsed}%
            </span>
          </div>

          {/* Progress Bar Neon Hijau (atau Merah jika Penuh) */}
          <div className="w-full h-3.5 bg-[#0B0D14] rounded-full overflow-hidden p-0.5 border border-[#232A44]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isOverCapacity
                  ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_12px_#EF4444]'
                  : 'bg-gradient-to-r from-[#22C55E] to-[#4ADE80] shadow-[0_0_12px_#22C55E]'
              }`}
              style={{ width: `${Math.min(100, (totalGBSelected / hddCapacity) * 100)}%` }}
            />
          </div>

          {/* Peringatan jika melebihi kapasitas */}
          {isOverCapacity && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-800/60">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>
                <strong>Melebihi Kapasitas!</strong> Kurangi game sebanyak{' '}
                <span className="font-bold underline">{totalGBSelected - hddCapacity} GB</span>.
              </span>
            </div>
          )}

          {/* Preset Selector Dropdown */}
          {isSettingHdd && (
            <div className="mt-3 pt-3 border-t border-[#232A44] flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">Pilih Ukuran HDD/SSD Anda:</span>
              {hddPresets.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setHddCapacity(size);
                    setIsSettingHdd(false);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                    hddCapacity === size
                      ? 'bg-[#00D2FF] text-[#0F1016]'
                      : 'bg-[#1E2336] text-gray-300 hover:text-white'
                  }`}
                >
                  {size >= 1000 ? `${size / 1000} TB` : `${size} GB`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Tab Switcher: "Install Game" vs "Sewa PS" (Sesuai Mockup Layar 1) */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-2 gap-3 p-1 bg-[#121522] rounded-2xl border border-[#232A44]">
          <button
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-sm transition-all bg-[#1A2035] text-white border-2 border-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.4)]"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00D2FF] to-[#D900FF] flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-[#0F1016] rounded-full flex items-center justify-center">
                <Gamepad2 className="w-3.5 h-3.5 text-[#00D2FF]" />
              </div>
            </div>
            <span>Install Game</span>
          </button>

          <button
            onClick={onSwitchToRental}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-sm transition-all text-gray-400 hover:text-white hover:bg-[#1A2035]/50 border border-transparent"
          >
            <Tv className="w-4 h-4 text-gray-400" />
            <span>Sewa PS</span>
          </button>
        </div>
      </div>

      {/* 4. Filter Platform Chips (PC, PS4, PS5, Switch) Sesuai Mockup */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {platforms.map(p => {
            const isActive = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#18233C] text-[#00D2FF] border border-[#00D2FF] shadow-[0_0_10px_rgba(0,210,255,0.4)]'
                    : 'bg-[#151824] text-gray-400 border border-[#232A44] hover:text-gray-200'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Pencarian Ringan */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari game favorit (Spiderman, GTA, FC 24...)"
            className="w-full bg-[#151824] border border-[#232A44] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00D2FF]"
          />
        </div>
      </div>

      {/* 6. Grid 2 Kolom Kartu Game (Sesuai Mockup Layar 1) */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3.5">
          {filteredGames.map(game => {
            const isSelected = selectedGames.some(g => g.id === game.id);
            return (
              <div
                key={game.id}
                className={`group relative bg-[#151824] rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'border-[#00D2FF] shadow-[0_0_16px_rgba(0,210,255,0.55)] scale-[1.01]'
                    : 'border-[#00D2FF]/60 shadow-[0_0_10px_rgba(0,210,255,0.25)] hover:border-[#00D2FF]'
                }`}
              >
                {/* Cover Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#0A0C14]">
                  <img
                    src={game.coverUrl}
                    alt={game.nama}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151824] via-transparent to-transparent opacity-80" />

                  {/* Badge Ukuran GB di Pojok Kanan Atas (Kuning Sesuai Mockup) */}
                  <div className="absolute top-2 right-2 bg-[#FACC15] text-[#0F1016] font-display font-extrabold text-[11px] px-2 py-0.5 rounded-md shadow-md tracking-wider flex items-center gap-0.5">
                    <span>{game.ukuranGB} GB</span>
                  </div>

                  {/* Platform Badge Kecil Pojok Kiri Atas */}
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-gray-200 font-mono text-[9px] px-1.5 py-0.5 rounded border border-white/10 uppercase">
                    {game.platform}
                  </div>

                  {/* Tombol Info / Spek */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailGame(game);
                    }}
                    title="Cek Spek Minimal"
                    className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white border border-white/20"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content & Action Button */}
                <div className="p-2.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-white line-clamp-1 group-hover:text-[#00D2FF] transition-colors">
                      {game.nama}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="text-[#00D2FF] font-semibold">
                        Rp {game.harga.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Tombol Aksi "+ Pilih" Warna Ungu/Magenta (Sesuai Mockup) */}
                  <button
                    onClick={() => onToggleGame(game)}
                    className={`mt-2 w-full py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-[#22C55E] text-[#0F1016] shadow-[0_0_12px_rgba(34,197,94,0.6)] font-extrabold'
                        : 'bg-[#D900FF] hover:bg-[#B300D4] text-white shadow-[0_0_14px_rgba(217,0,255,0.5)] active:scale-95'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Terpilih</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>+ Pilih</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Checkout Bar Jika Ada Game Terpilih */}
      {selectedGames.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 max-w-md mx-auto p-4 z-40 bg-gradient-to-t from-[#0F1016] via-[#0F1016]/95 to-transparent">
          <div className="bg-[#161A2B] border-2 border-[#00D2FF] rounded-2xl p-3 shadow-[0_0_20px_rgba(0,210,255,0.4)] flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-gray-300">
                <span className="font-bold text-white">{selectedGames.length} Game</span> •{' '}
                <span className={isOverCapacity ? 'text-red-400 font-bold' : 'text-[#22C55E] font-bold'}>
                  {totalGBSelected} GB
                </span>
              </div>
              <div className="text-sm font-bold text-[#FACC15]">
                Rp {selectedGames.reduce((acc, g) => acc + g.harga, 0).toLocaleString('id-ID')}
              </div>
            </div>

            <button
              disabled={isOverCapacity}
              onClick={onProceedToCheckout}
              className={`py-2 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                isOverCapacity
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#D900FF] hover:bg-[#B300D4] text-white shadow-neon-magenta active:scale-95'
              }`}
            >
              <span>Lanjut Pesan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal Detail Spek Game */}
      {detailGame && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161928] border-2 border-[#00D2FF] rounded-3xl max-w-sm w-full p-5 shadow-neon-blue-intense text-white relative">
            <button
              onClick={() => setDetailGame(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={detailGame.coverUrl}
                alt={detailGame.nama}
                className="w-14 h-14 rounded-xl object-cover border border-[#00D2FF]"
              />
              <div>
                <h3 className="font-bold text-base text-white">{detailGame.nama}</h3>
                <span className="text-xs text-[#FACC15] font-bold font-mono">
                  {detailGame.ukuranGB} GB • {detailGame.platform}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-4 leading-relaxed">
              {detailGame.deskripsi || 'Game seru dengan grafik memukau dan performa optimal.'}
            </p>

            <div className="bg-[#0F1016] p-3 rounded-xl border border-[#232A44] mb-4">
              <div className="flex items-center gap-1.5 text-xs text-[#00D2FF] font-semibold mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Spesifikasi Minimal / Syarat Perangkat:</span>
              </div>
              <p className="text-xs text-gray-300 font-mono">
                {detailGame.spekMinimal}
              </p>
            </div>

            <button
              onClick={() => {
                onToggleGame(detailGame);
                setDetailGame(null);
              }}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#D900FF] hover:bg-[#B300D4] text-white shadow-neon-magenta"
            >
              {selectedGames.some(g => g.id === detailGame.id) ? 'Hapus dari Pilihan' : '+ Pilih Game Ini'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
