import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlayerTab } from '../../types';
import {
  Compass,
  CalendarDays,
  Users,
  Trophy,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { ExploreTab } from './tabs/ExploreTab';
import { GamesTab } from './tabs/GamesTab';
import { CommunityTab } from './tabs/CommunityTab';
import { CompetitionsTab } from './tabs/CompetitionsTab';
import { PassportTab } from './tabs/PassportTab';
import { CourtBookingModal } from './modals/CourtBookingModal';
import { GameDetailModal } from './modals/GameDetailModal';
import { CreateGameModal } from './modals/CreateGameModal';

export const PlayerApp: React.FC = () => {
  const { playerTab, setPlayerTab, setIsCreateGameOpen, games, userProfile } = useApp();

  const upcomingCount = games.filter(g =>
    g.players.some(p => p.id === userProfile.id)
  ).length;

  const navItems: { tab: PlayerTab; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      tab: 'explore',
      label: 'Discover & Venues',
      icon: <Compass className="w-4 h-4" />
    },
    {
      tab: 'games',
      label: 'Open Runs & Matches',
      icon: <CalendarDays className="w-4 h-4" />,
      count: upcomingCount > 0 ? upcomingCount : undefined
    },
    {
      tab: 'community',
      label: 'Clubs & People',
      icon: <Users className="w-4 h-4" />
    },
    {
      tab: 'competitions',
      label: 'Competitions & Cups',
      icon: <Trophy className="w-4 h-4" />
    },
    {
      tab: 'passport',
      label: 'Sports Identity & Passport',
      icon: <ShieldCheck className="w-4 h-4" />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Sub Navigation Bar for Player Platform */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-[#252f25]">
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {navItems.map(item => {
            const isActive = playerTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setPlayerTab(item.tab)}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#c4ff1a] text-[#162402] font-black shadow-md'
                    : 'bg-[#181f18] text-[#aeb4ac] hover:text-[#f5f8f4] hover:bg-[#202920] border border-[#263126]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.count && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-[#162402] text-[#c4ff1a]' : 'bg-[#c4ff1a] text-[#162402]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <button
          onClick={() => setIsCreateGameOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#222c22] hover:bg-[#2d392d] text-[#c4ff1a] border border-[#394939] text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider transition-colors shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Run</span>
        </button>
      </div>

      {/* Main Tab Content View */}
      <main>
        {playerTab === 'explore' && <ExploreTab />}
        {playerTab === 'games' && <GamesTab />}
        {playerTab === 'community' && <CommunityTab />}
        {playerTab === 'competitions' && <CompetitionsTab />}
        {playerTab === 'passport' && <PassportTab />}
      </main>

      {/* Global Interactive Modals */}
      <CourtBookingModal />
      <GameDetailModal />
      <CreateGameModal />
    </div>
  );
};
