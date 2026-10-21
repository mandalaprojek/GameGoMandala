import React from 'react';
import { KatalogScreen } from './KatalogScreen';
import { RentalPSScreen } from './RentalPSScreen';
import { TrackingSerahTerimaScreen } from './TrackingSerahTerimaScreen';

export function MockupShowcase({
  games,
  selectedGames,
  onToggleGame,
  hddCapacity,
  setHddCapacity,
  rentals,
  order,
  onProceedToCheckout,
  onSwitchToRental,
  onProceedRental,
  onCompleteOrder
}) {
  return (
    <div className="w-full py-8 px-4 flex flex-col items-center">
      {/* Title Showcase */}
      <div className="text-center mb-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF] text-xs font-mono font-bold mb-3">
          <span>✨ 3-Screen Live Mockup Showcase</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">
          Desain Visual Sesuai Mockup Referensi
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          Tampilan 3 layar aplikasi GameGoMandala berdampingan dalam bingkai iPhone 15 Pro, interaktif dan responsif secara real-time.
        </p>
      </div>

      {/* Grid 3 Mockup Phones */}
      <div className="w-full flex flex-wrap justify-center items-start gap-8 lg:gap-10">
        {/* PHONE 1: KATALOG & KALKULATOR HDD */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono font-bold text-[#00D2FF] mb-2 uppercase tracking-wider">
            Layar 1: Katalog & Kalkulator
          </div>
          <div className="mobile-frame-container shadow-[0_0_40px_rgba(0,210,255,0.25)] border-[#1F263E]">
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <div className="w-2 h-2 rounded-full bg-[#0B2545]" />
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto pt-2 scrollbar-none">
              <KatalogScreen
                games={games}
                selectedGames={selectedGames}
                onToggleGame={onToggleGame}
                hddCapacity={hddCapacity}
                setHddCapacity={setHddCapacity}
                onProceedToCheckout={onProceedToCheckout}
                onSwitchToRental={onSwitchToRental}
              />
            </div>

            {/* Home Bar Indicator */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-2 shrink-0" />
          </div>
        </div>

        {/* PHONE 2: SEWA KONSOL PS KE RUMAH */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono font-bold text-[#D900FF] mb-2 uppercase tracking-wider">
            Layar 2: Sewa Konsol PS ke Rumah
          </div>
          <div className="mobile-frame-container shadow-[0_0_40px_rgba(217,0,255,0.25)] border-[#1F263E]">
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <div className="w-2 h-2 rounded-full bg-[#0B2545]" />
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto pt-2 scrollbar-none">
              <RentalPSScreen
                rentals={rentals}
                onBack={onSwitchToRental}
                onProceedRental={onProceedRental}
              />
            </div>

            {/* Home Bar Indicator */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-2 shrink-0" />
          </div>
        </div>

        {/* PHONE 3: LACAK & SERAH TERIMA */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-mono font-bold text-[#22C55E] mb-2 uppercase tracking-wider">
            Layar 3: Lacak & Serah Terima
          </div>
          <div className="mobile-frame-container shadow-[0_0_40px_rgba(34,197,94,0.25)] border-[#1F263E]">
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <div className="w-2 h-2 rounded-full bg-[#0B2545]" />
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto pt-2 scrollbar-none">
              <TrackingSerahTerimaScreen
                order={order}
                onBack={onSwitchToRental}
                onCompleteOrder={onCompleteOrder}
              />
            </div>

            {/* Home Bar Indicator */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-2 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
