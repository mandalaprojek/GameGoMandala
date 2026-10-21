import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { KatalogScreen } from './components/KatalogScreen';
import { RentalPSScreen } from './components/RentalPSScreen';
import { TrackingSerahTerimaScreen } from './components/TrackingSerahTerimaScreen';
import { MockupShowcase } from './components/MockupShowcase';
import { AdminDashboard } from './components/AdminDashboard';
import { TeknisiDashboard } from './components/TeknisiDashboard';
import { CustomerPortal } from './components/CustomerPortal';
import { CheckoutModal } from './components/CheckoutModal';
import { apiService } from './services/api';

export default function App() {
  // Roles: 'pelanggan' | 'admin' | 'teknisi'
  const [activeRole, setActiveRole] = useState('pelanggan');

  // Customer sub-navigation tabs: 'katalog' | 'rental' | 'tracking' | 'portal'
  const [activeTab, setActiveTab] = useState('katalog');

  // View Mode: 'showcase' (3 screens mockup) | 'mobile' (single iPhone frame) | 'full' (desktop wide)
  const [viewMode, setViewMode] = useState('showcase');

  // State data
  const [games, setGames] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [konsolList, setKonsolList] = useState([]);
  const [hddList, setHddList] = useState([]);
  const [teknisiList, setTeknisiList] = useState([]);

  // Pilihan game & kalkulator kapasitas
  const [selectedGames, setSelectedGames] = useState([]);
  const [hddCapacity, setHddCapacity] = useState(500);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutServiceType, setCheckoutServiceType] = useState('Install_Game');
  const [selectedRentalForCheckout, setSelectedRentalForCheckout] = useState(null);
  const [rentalDurationForCheckout, setRentalDurationForCheckout] = useState(1);

  // Active tracking order
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  // Load data awal
  useEffect(() => {
    async function loadData() {
      const data = await apiService.getInitialData();
      setGames(data.katalogGame || []);
      setRentals(data.katalogRental || []);
      setOrders(data.pesanan || []);
      setKonsolList(data.inventarisKonsol || []);
      setHddList(data.inventarisHDD || []);
      setTeknisiList(data.teknisi || []);

      if (data.pesanan && data.pesanan.length > 0) {
        setActiveTrackingOrder(data.pesanan[0]);
      }

      // Default pilih 1-2 game agar kalkulator langsung terisi mirip mockup (185 GB / 500 GB)
      if (data.katalogGame && data.katalogGame.length >= 2) {
        const defaultSelected = data.katalogGame.filter(g => g.id === 'G001' || g.id === 'G002');
        setSelectedGames(defaultSelected);
      }
    }
    loadData();
  }, []);

  // Toggle pilihan game
  const handleToggleGame = (game) => {
    if (selectedGames.some(g => g.id === game.id)) {
      setSelectedGames(selectedGames.filter(g => g.id !== game.id));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  // Mulai checkout install game
  const handleProceedToCheckout = () => {
    setCheckoutServiceType('Install_Game');
    setIsCheckoutOpen(true);
  };

  // Mulai checkout rental PS
  const handleProceedRental = (rental, durasi) => {
    setCheckoutServiceType('Sewa_PS');
    setSelectedRentalForCheckout(rental);
    setRentalDurationForCheckout(durasi);
    setIsCheckoutOpen(true);
  };

  // Konfirmasi Pesanan Baru
  const handleConfirmOrder = async (payload) => {
    const res = await apiService.createPesanan(payload);
    if (res.status === 'success') {
      const updatedOrders = [res.order, ...orders];
      setOrders(updatedOrders);
      setActiveTrackingOrder(res.order);
      setIsCheckoutOpen(false);
      setSelectedGames([]);
      setActiveTab('tracking');
      alert(`Pesanan ${res.orderId} berhasil dibuat! Beralih ke layar Lacak & Serah Terima.`);
    }
  };

  // Selesaikan Serah Terima
  const handleCompleteOrder = async (payload) => {
    await apiService.submitSerahTerima(payload);
    const updated = orders.map(o => o.id === payload.orderId ? { ...o, status: 'Selesai', statusCode: 'COMPLETED' } : o);
    setOrders(updated);
  };

  // Verifikasi KTP (Admin)
  const handleVerifyKTP = async (orderId, status) => {
    await apiService.verifyKTP(orderId, status);
    setOrders(orders.map(o => o.id === orderId ? { ...o, ktpVerified: status === 'Verified' } : o));
  };

  // Refund Deposit (Admin)
  const handleProcessRefund = async (orderId, fine, status) => {
    await apiService.processDepositRefund(orderId, fine, status);
    setOrders(orders.map(o => o.id === orderId ? { ...o, statusRefund: status, potonganDenda: fine } : o));
    alert('Status refund deposit berhasil diperbarui!');
  };

  // Tambah Game (Admin)
  const handleAddGame = async (game) => {
    const newG = await apiService.addGame(game);
    setGames([newG, ...games]);
  };

  // Tambah Rental (Admin)
  const handleAddRental = async (rental) => {
    const newR = await apiService.addRental(rental);
    setRentals([newR, ...rentals]);
  };

  // Render Konten berdasarkan Active Role & Active Tab
  const renderCustomerContent = () => {
    // Mode 3-Screens Mockup Showcase (Persis Gambar Referensi)
    if (viewMode === 'showcase') {
      return (
        <MockupShowcase
          games={games}
          selectedGames={selectedGames}
          onToggleGame={handleToggleGame}
          hddCapacity={hddCapacity}
          setHddCapacity={setHddCapacity}
          rentals={rentals}
          order={activeTrackingOrder}
          onProceedToCheckout={handleProceedToCheckout}
          onSwitchToRental={() => setActiveTab('rental')}
          onProceedRental={handleProceedRental}
          onCompleteOrder={handleCompleteOrder}
        />
      );
    }

    // Mode Single Mobile Frame (iPhone 15 Pro Wrapper)
    if (viewMode === 'mobile') {
      return (
        <div className="py-6 px-4 flex justify-center">
          <div className="mobile-frame-container shadow-neon-blue-intense border-[#1E2336]">
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" />
              <div className="w-2 h-2 rounded-full bg-[#0B2545]" />
            </div>

            {/* Sub-nav mobile inside frame */}
            <div className="px-4 py-2 border-b border-[#232A44] flex items-center justify-between text-xs bg-[#121522]">
              <button
                onClick={() => setActiveTab('katalog')}
                className={`font-bold transition-colors ${activeTab === 'katalog' ? 'text-[#00D2FF]' : 'text-gray-400'}`}
              >
                1. Katalog
              </button>
              <button
                onClick={() => setActiveTab('rental')}
                className={`font-bold transition-colors ${activeTab === 'rental' ? 'text-[#D900FF]' : 'text-gray-400'}`}
              >
                2. Rental PS
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`font-bold transition-colors ${activeTab === 'tracking' ? 'text-[#22C55E]' : 'text-gray-400'}`}
              >
                3. Lacak
              </button>
              <button
                onClick={() => setActiveTab('portal')}
                className={`font-bold transition-colors ${activeTab === 'portal' ? 'text-[#FACC15]' : 'text-gray-400'}`}
              >
                4. Akun
              </button>
            </div>

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto pt-2 scrollbar-none">
              {activeTab === 'katalog' && (
                <KatalogScreen
                  games={games}
                  selectedGames={selectedGames}
                  onToggleGame={handleToggleGame}
                  hddCapacity={hddCapacity}
                  setHddCapacity={setHddCapacity}
                  onProceedToCheckout={handleProceedToCheckout}
                  onSwitchToRental={() => setActiveTab('rental')}
                />
              )}
              {activeTab === 'rental' && (
                <RentalPSScreen
                  rentals={rentals}
                  onBack={() => setActiveTab('katalog')}
                  onProceedRental={handleProceedRental}
                />
              )}
              {activeTab === 'tracking' && (
                <TrackingSerahTerimaScreen
                  order={activeTrackingOrder}
                  onBack={() => setActiveTab('katalog')}
                  onCompleteOrder={handleCompleteOrder}
                />
              )}
              {activeTab === 'portal' && (
                <CustomerPortal
                  orders={orders}
                  onOpenTrackingScreen={(ord) => {
                    setActiveTrackingOrder(ord);
                    setActiveTab('tracking');
                  }}
                />
              )}
            </div>

            {/* Home Bar Indicator */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-2 shrink-0" />
          </div>
        </div>
      );
    }

    // Mode Wide / Desktop Responsive
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Sub-nav pills */}
        <div className="flex items-center gap-2 mb-6 bg-[#161928] p-1.5 rounded-2xl border border-[#232A44] w-fit mx-auto">
          <button
            onClick={() => setActiveTab('katalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'katalog' ? 'bg-[#00D2FF] text-[#0F1016] shadow-neon-blue' : 'text-gray-400 hover:text-white'
            }`}
          >
            Layar 1: Katalog Game & Kalkulator
          </button>
          <button
            onClick={() => setActiveTab('rental')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rental' ? 'bg-[#D900FF] text-white shadow-neon-magenta' : 'text-gray-400 hover:text-white'
            }`}
          >
            Layar 2: Sewa Konsol PS ke Rumah
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tracking' ? 'bg-[#22C55E] text-[#0F1016] shadow-neon-green' : 'text-gray-400 hover:text-white'
            }`}
          >
            Layar 3: Lacak & Serah Terima
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'portal' ? 'bg-[#FACC15] text-[#0F1016] shadow-neon-yellow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Area Pelanggan & Garansi
          </button>
        </div>

        {activeTab === 'katalog' && (
          <KatalogScreen
            games={games}
            selectedGames={selectedGames}
            onToggleGame={handleToggleGame}
            hddCapacity={hddCapacity}
            setHddCapacity={setHddCapacity}
            onProceedToCheckout={handleProceedToCheckout}
            onSwitchToRental={() => setActiveTab('rental')}
          />
        )}
        {activeTab === 'rental' && (
          <RentalPSScreen
            rentals={rentals}
            onBack={() => setActiveTab('katalog')}
            onProceedRental={handleProceedRental}
          />
        )}
        {activeTab === 'tracking' && (
          <TrackingSerahTerimaScreen
            order={activeTrackingOrder}
            onBack={() => setActiveTab('katalog')}
            onCompleteOrder={handleCompleteOrder}
          />
        )}
        {activeTab === 'portal' && (
          <CustomerPortal
            orders={orders}
            onOpenTrackingScreen={(ord) => {
              setActiveTrackingOrder(ord);
              setActiveTab('tracking');
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F1016] text-white flex flex-col font-sans selection:bg-[#D900FF] selection:text-white">
      {/* Header Utama dengan Role Switcher & View Switcher */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        cartCount={selectedGames.length}
        totalGB={selectedGames.reduce((acc, g) => acc + (g.ukuranGB || 0), 0)}
        capacityLimit={hddCapacity}
      />

      {/* Main Body sesuai Active Role */}
      <main className="flex-1">
        {activeRole === 'pelanggan' && renderCustomerContent()}
        {activeRole === 'admin' && (
          <AdminDashboard
            orders={orders}
            games={games}
            rentals={rentals}
            konsolList={konsolList}
            hddList={hddList}
            teknisiList={teknisiList}
            onVerifyKTP={handleVerifyKTP}
            onProcessRefund={handleProcessRefund}
            onAddGame={handleAddGame}
            onAddRental={handleAddRental}
            onSwitchRole={(role) => setActiveRole(role)}
          />
        )}
        {activeRole === 'teknisi' && (
          <TeknisiDashboard
            orders={orders}
            onOpenTrackingScreen={(ord) => {
              setActiveTrackingOrder(ord);
              setActiveRole('pelanggan');
              setActiveTab('tracking');
            }}
            onSwitchRole={(role) => setActiveRole(role)}
          />
        )}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        serviceType={checkoutServiceType}
        selectedGames={selectedGames}
        selectedRental={selectedRentalForCheckout}
        durasiHari={rentalDurationForCheckout}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  );
}
