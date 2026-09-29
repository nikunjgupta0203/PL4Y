import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlayerTab, VenueTab } from '../../types';
import { ShieldCheck, Bell, Sparkles, Building2, UserCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    playerTab,
    setPlayerTab,
    venueTab,
    setVenueTab,
    venues,
    activeVenueId,
    setActiveVenueId,
    userProfile,
    addToast
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#141914]/95 backdrop-blur-md border-b border-[#293329]">
      {/* Top Banner Notice */}
      <div className="bg-[#1a221a] border-b border-[#263126] px-4 py-1.5 text-[11px] font-mono text-[#aeb4ac] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4ff1a] animate-pulse" />
            <span className="text-[#f5f8f4] font-semibold">PL4Y Interactive Product Preview</span>
            <span className="hidden sm:inline text-[#7f877d]">·</span>
            <span className="hidden sm:inline text-[#7f877d]">Multi-Sport Participation Platform</span>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="hidden md:inline text-[#aeb4ac]">
              Two-way live sync active (Player App ↔ Venue Portal)
            </span>
            <span className="px-2 py-0.5 rounded bg-[#222c22] text-[#c4ff1a] font-bold border border-[#354635]">
              PRE-LAUNCH SANDBOX
            </span>
          </div>
        </div>
      </div>

      {/* Main Website Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span
              onClick={() => {
                setViewMode('player');
                setPlayerTab('explore');
              }}
              className="font-heading font-black text-2xl sm:text-3xl tracking-tighter text-[#c4ff1a] cursor-pointer hover:opacity-90 transition-opacity"
            >
              PL4Y
            </span>
            <div className="hidden sm:block border-l border-[#2e3a2e] pl-3">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#f5f8f4] block leading-none">
                SPORTS PLATFORM
              </span>
              <span className="text-[10px] text-[#7f877d] block mt-0.5">
                Your sport. Your people. Your PL4Y.
              </span>
            </div>
          </div>

          {/* Mobile Profile Indicator */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b221b] border border-[#2e372e] text-xs">
              <span className="font-mono text-[#c4ff1a] font-bold">#{userProfile.foundingNumber}</span>
            </div>
          </div>
        </div>

        {/* Center: Switcher between Player Experience and Venue Partner Portal */}
        <div className="flex items-center p-1 rounded-xl bg-[#1b221b] border border-[#2f382f] shadow-inner w-full md:w-auto justify-center">
          <button
            onClick={() => setViewMode('player')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              viewMode === 'player'
                ? 'bg-[#c4ff1a] text-[#162402] font-black shadow-md'
                : 'text-[#aeb4ac] hover:text-[#f5f8f4] hover:bg-[#232b23]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Player Experience</span>
          </button>

          <button
            onClick={() => setViewMode('venue')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              viewMode === 'venue'
                ? 'bg-[#c4ff1a] text-[#162402] font-black shadow-md'
                : 'text-[#aeb4ac] hover:text-[#f5f8f4] hover:bg-[#232b23]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Venue Partner Portal</span>
          </button>
        </div>

        {/* Right: Venue selector or Player identity chip */}
        <div className="hidden md:flex items-center gap-3">
          {viewMode === 'venue' ? (
            <div className="flex items-center gap-2 bg-[#1b221b] px-3 py-1.5 rounded-xl border border-[#2f382f]">
              <span className="text-xs text-[#7f877d] font-mono">Managing:</span>
              <select
                value={activeVenueId}
                onChange={e => setActiveVenueId(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#f5f8f4] outline-none cursor-pointer"
              >
                {venues.map(v => (
                  <option key={v.id} value={v.id} className="bg-[#181f18] text-[#f5f8f4]">
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <button
              onClick={() => setPlayerTab('passport')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#1b221b] hover:bg-[#232b23] border border-[#2f382f] hover:border-[#3e4d3e] transition-all"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-7 h-7 rounded-full object-cover border border-[#c4ff1a]"
              />
              <div className="text-left">
                <span className="font-heading font-extrabold text-xs text-[#f5f8f4] block leading-none">
                  {userProfile.name}
                </span>
                <span className="text-[10px] font-mono text-[#c4ff1a]">
                  Founding #{userProfile.foundingNumber}
                </span>
              </div>
            </button>
          )}

          <button
            onClick={() =>
              addToast(
                'Live Notifications',
                'Your evening match at Apex Padel Arena is scheduled for 19:00.',
                'info'
              )
            }
            className="p-2 rounded-xl bg-[#1b221b] hover:bg-[#232b23] text-[#aeb4ac] hover:text-[#f5f8f4] border border-[#2f382f] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c4ff1a]" />
          </button>
        </div>
      </div>
    </header>
  );
};
