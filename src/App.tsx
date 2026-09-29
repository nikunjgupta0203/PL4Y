import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/common/TopBar';
import { PlayerApp } from './components/player/PlayerApp';
import { VenueDashboard } from './components/venue/VenueDashboard';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#101410] text-[#f5f8f4] flex flex-col selection:bg-[#c4ff1a] selection:text-[#162402]">
      {/* Top Website Header & Mode Navigation */}
      <TopBar />

      {/* Main Responsive Website View */}
      <main className="flex-1 flex flex-col w-full">
        {viewMode === 'player' ? (
          <PlayerApp />
        ) : (
          <div className="flex-1 py-4 sm:py-6 w-full">
            <VenueDashboard />
          </div>
        )}
      </main>

      {/* Modern Website Footer */}
      <footer className="border-t border-[#222b22] bg-[#121612] py-8 px-4 sm:px-6 mt-16 text-xs text-[#7f877d]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-xl text-[#c4ff1a] tracking-tight">
              PL4Y
            </span>
            <span>·</span>
            <span>Multi-Sport Participation Platform</span>
          </div>

          <div className="text-center sm:text-right font-mono text-[11px] text-[#aeb4ac]">
            <span>Your sport. Your people. Your PL4Y.</span>
            <span className="block text-[#7f877d] text-[10px] mt-0.5">
              Prototype Demonstration · Real-time 2-Way Sync
            </span>
          </div>
        </div>
      </footer>

      {/* Interactive Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
