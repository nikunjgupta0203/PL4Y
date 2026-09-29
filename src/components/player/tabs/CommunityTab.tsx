import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Sport } from '../../../types';
import { Users, MapPin, Award, MessageSquare, Plus, Check, Search, ShieldCheck } from 'lucide-react';

interface NearbyPlayer {
  id: string;
  name: string;
  avatar: string;
  sports: Sport[];
  mainRating: number;
  levelTitle: string;
  distance: string;
  availability: string;
  isInvited?: boolean;
}

export const CommunityTab: React.FC = () => {
  const { clubs, toggleClubMembership, addToast } = useApp();
  const [subTab, setSubTab] = useState<'clubs' | 'players' | 'feed'>('clubs');
  const [invitedPlayerIds, setInvitedPlayerIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const nearbyPlayers: NearbyPlayer[] = [
    {
      id: 'pl-1',
      name: 'Sofia Alvarez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      sports: ['padel', 'tennis'],
      mainRating: 3.9,
      levelTitle: 'Intermediate-Advanced',
      distance: '0.8 km away',
      availability: 'Weeknights after 18:30'
    },
    {
      id: 'pl-2',
      name: 'Marcus Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      sports: ['padel', 'pickleball'],
      mainRating: 3.6,
      levelTitle: 'Intermediate Tier II',
      distance: '1.4 km away',
      availability: 'Tuesdays & Thursdays'
    },
    {
      id: 'pl-3',
      name: 'Tariq Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      sports: ['football', 'basketball'],
      mainRating: 4.4,
      levelTitle: 'Competitive Striker',
      distance: '2.1 km away',
      availability: 'Fridays & Weekends'
    },
    {
      id: 'pl-4',
      name: 'Elena Ramos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      sports: ['padel', 'pickleball'],
      mainRating: 4.0,
      levelTitle: 'All-Court Player',
      distance: '3.0 km away',
      availability: 'Mornings & Weekends'
    }
  ];

  const handleInvite = (player: NearbyPlayer) => {
    if (invitedPlayerIds.includes(player.id)) return;
    setInvitedPlayerIds([...invitedPlayerIds, player.id]);
    addToast(
      'Match Invite Sent',
      `Invited ${player.name} to your upcoming PL4Y match at Apex Padel Arena.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-16 text-[#f5f8f4]">
      {/* Header */}
      <div>
        <h2 className="font-heading font-black text-2xl text-[#f5f8f4] tracking-tight">
          Your People & Sports Communities
        </h2>
        <p className="text-xs sm:text-sm text-[#aeb4ac]">
          Connect with dedicated sports clubs, discover local hitting partners, and join regular weekly runs
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center p-1 rounded-xl bg-[#181f18] border border-[#2b352b] max-w-md">
        <button
          onClick={() => setSubTab('clubs')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            subTab === 'clubs'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          Clubs & Crews
        </button>

        <button
          onClick={() => setSubTab('players')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            subTab === 'players'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          Find Players
        </button>

        <button
          onClick={() => setSubTab('feed')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            subTab === 'feed'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          Activity Feed
        </button>
      </div>

      {/* SUBTAB 1: CLUBS */}
      {subTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubs.map(club => (
            <div
              key={club.id}
              className="p-5 rounded-2xl bg-[#181f18] border border-[#2b352b] shadow-md hover:border-[#3e4e3e] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-14 h-14 rounded-xl object-cover border border-[#3b473b]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#202920] text-[#c4ff1a] font-bold border border-[#344434]">
                        {club.sport}
                      </span>
                      <span className="text-xs font-mono text-[#aeb4ac]">
                        {club.membersCount} Players
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-base text-[#f5f8f4] mt-1 truncate">
                      {club.name}
                    </h3>
                    <p className="text-xs text-[#7f877d] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{club.location}</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#aeb4ac] mt-3.5 leading-relaxed">
                  {club.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#263126] flex justify-between items-center text-xs">
                <div className="text-xs text-[#7f877d]">
                  <span className="text-[#aeb4ac] font-semibold">Runs:</span> {club.weeklyRuns}
                </div>

                <button
                  onClick={() => toggleClubMembership(club.id)}
                  className={`py-1.5 px-4 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    club.isJoined
                      ? 'bg-[#222c22] text-[#c4ff1a] border border-[#384838]'
                      : 'bg-[#c4ff1a] text-[#162402] hover:bg-[#b2eb14]'
                  }`}
                >
                  {club.isJoined ? 'Joined ✓' : 'Join Club'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 2: FIND PLAYERS */}
      {subTab === 'players' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#7f877d] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search players by name, sport, or skill tier..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#181f18] border border-[#2b352b] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#f5f8f4] placeholder-[#5c685c] focus:outline-none focus:border-[#c4ff1a]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyPlayers
              .filter(
                p =>
                  !searchQuery ||
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.sports.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map(player => {
                const isInvited = invitedPlayerIds.includes(player.id);
                return (
                  <div
                    key={player.id}
                    className="p-4 rounded-2xl bg-[#181f18] border border-[#2b352b] flex items-center justify-between gap-4 text-xs shadow-sm"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-[#384538]"
                      />
                      <div>
                        <div className="font-heading font-black text-sm text-[#f5f8f4] flex items-center gap-2">
                          <span>{player.name}</span>
                          <span className="text-[10px] font-mono text-[#c4ff1a] bg-[#141b14] px-1.5 py-0.5 rounded border border-[#2a362a]">
                            ★ {player.mainRating}
                          </span>
                        </div>
                        <div className="text-xs text-[#aeb4ac] mt-0.5">
                          {player.levelTitle} · {player.distance}
                        </div>
                        <div className="flex gap-1.5 mt-1.5">
                          {player.sports.map(s => (
                            <span
                              key={s}
                              className="text-[9px] font-mono uppercase bg-[#202920] text-[#aeb4ac] px-2 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInvite(player)}
                      disabled={isInvited}
                      className={`py-2 px-4 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                        isInvited
                          ? 'bg-[#222b22] text-[#7f877d] border border-[#303c30]'
                          : 'bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402]'
                      }`}
                    >
                      {isInvited ? 'Invited' : 'Invite'}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: ACTIVITY FEED */}
      {subTab === 'feed' && (
        <div className="max-w-2xl space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#181f18] border border-[#2b352b] flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#c4ff1a]/15 text-[#c4ff1a] flex items-center justify-center flex-shrink-0 text-base">
              🎾
            </div>
            <div>
              <p className="text-sm text-[#f5f8f4] leading-relaxed">
                <span className="font-bold">Apex Padel Collective</span> opened 4 spots for their Thursday Night Ladder at Apex Padel Arena.
              </p>
              <span className="text-xs font-mono text-[#7f877d] mt-1.5 block">18 mins ago</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#181f18] border border-[#2b352b] flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#c4ff1a]/15 text-[#c4ff1a] flex items-center justify-center flex-shrink-0 text-base">
              ⚽
            </div>
            <div>
              <p className="text-sm text-[#f5f8f4] leading-relaxed">
                <span className="font-bold">Marcus Sterling</span> just completed a 5v5 fixture at Urban Fives Turf. (Result: 7 - 5).
              </p>
              <span className="text-xs font-mono text-[#7f877d] mt-1.5 block">1 hour ago</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#181f18] border border-[#2b352b] flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#c4ff1a]/15 text-[#c4ff1a] flex items-center justify-center flex-shrink-0 text-base">
              🏆
            </div>
            <div>
              <p className="text-sm text-[#f5f8f4] leading-relaxed">
                <span className="font-bold">PL4Y Competitions</span> announced the seeds for the Metro Padel Open 2026. Founding players receive court warm-up priority.
              </p>
              <span className="text-xs font-mono text-[#7f877d] mt-1.5 block">3 hours ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
