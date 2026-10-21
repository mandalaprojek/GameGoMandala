import React from 'react';
import { Gamepad2, Shield, Wrench, User, Smartphone, LayoutGrid, Monitor } from 'lucide-react';

export function Header({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  cartCount,
  totalGB,
  capacityLimit
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0F1016]/95 backdrop-blur-md border-b border-[#232A44] px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo Game-Themed */}
        <div 
          onClick={() => setActiveTab('katalog')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0070D1] to-[#00D2FF] p-0.5 shadow-neon-blue">
            <div className="w-full h-full bg-[#0F1016] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-[#00D2FF] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="text-xl font-display font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D2FF] to-[#D900FF] neon-glow-text">
              GameGoMandala
            </div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
              Home Service & PS Rental
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle (Mockup 3-Screens vs Mobile Frame vs Desktop) */}
          <div className="hidden sm:flex items-center bg-[#161928] border border-[#232A44] rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode('showcase')}
              title="Tampilkan 3 Layar Mockup Persis Gambar Referensi"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                viewMode === 'showcase' 
                  ? 'bg-gradient-to-r from-[#00D2FF]/20 to-[#D900FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 font-semibold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>3 Mockup Layar</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              title="Tampilan Single Mobile Frame (iPhone View)"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                viewMode === 'mobile' 
                  ? 'bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 font-semibold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Frame</span>
            </button>
            <button
              onClick={() => setViewMode('full')}
              title="Mode Penuh Responsif"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                viewMode === 'full' 
                  ? 'bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40 font-semibold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Layar Lebar</span>
            </button>
          </div>

          {/* Role Switcher RBAC */}
          <div className="flex items-center bg-[#161928] border border-[#232A44] rounded-xl p-1">
            <button
              onClick={() => setActiveRole('pelanggan')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'pelanggan'
                  ? 'bg-[#00D2FF] text-[#0F1016] shadow-neon-blue'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pelanggan</span>
            </button>
            <button
              onClick={() => setActiveRole('teknisi')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'teknisi'
                  ? 'bg-[#22C55E] text-[#0F1016] shadow-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Teknisi</span>
            </button>
            <button
              onClick={() => setActiveRole('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeRole === 'admin'
                  ? 'bg-[#D900FF] text-white shadow-neon-magenta'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
