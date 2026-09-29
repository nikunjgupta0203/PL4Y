import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Game, Sport } from '../../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  QrCode,
  CheckCircle,
  Share2,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';

export const GamesTab: React.FC = () => {
  const {
    games,
    userProfile,
    setSelectedGameDetail,
    setIsCreateGameOpen,
    bookings,
    addToast
  } = useApp();

  const [segment, setSegment] = useState<'upcoming' | 'open' | 'history'>('upcoming');
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const [activePassBookingId, setActivePassBookingId] = useState<string | null>(null);
  const [scoreLogModalOpen, setScoreLogModalOpen] = useState(false);
  const [loggedScore, setLoggedScore] = useState({ sport: 'padel' as Sport, score: '6-3, 6-4', won: true });

  // Upcoming games that user is part of
  const upcomingGames = games.filter(g =>
    g.players.some(p => p.id === userProfile.id)
  );

  const openPickupRuns = games.filter(g =>
    (selectedSport === 'all' || g.sport === selectedSport) &&
    g.currentPlayers < g.maxPlayers &&
    !g.players.some(p => p.id === userProfile.id)
  );

  const handleLogScore = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      'Score Verified & Logged',
      `${loggedScore.sport.toUpperCase()} match recorded (${loggedScore.score}). PL4Y skill rating updated: +0.09.`,
      'success'
    );
    setScoreLogModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16 text-[#f5f8f4]">
      {/* Header with Host Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="font-heading font-black text-2xl text-[#f5f8f4] tracking-tight">
            Matches & Open Runs
          </h2>
          <p className="text-xs sm:text-sm text-[#aeb4ac]">
            Track your confirmed fixtures, discover open pickup runs, or log verified match results
          </p>
        </div>

        <button
          onClick={() => setIsCreateGameOpen(true)}
          className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] text-xs font-heading font-extrabold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Host a Run</span>
        </button>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center p-1 rounded-xl bg-[#181f18] border border-[#2b352b] max-w-md">
        <button
          onClick={() => setSegment('upcoming')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            segment === 'upcoming'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          My Runs ({upcomingGames.length})
        </button>

        <button
          onClick={() => setSegment('open')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            segment === 'open'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          Open Pickup ({openPickupRuns.length})
        </button>

        <button
          onClick={() => setSegment('history')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            segment === 'history'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          History & Scores
        </button>
      </div>

      {/* SEGMENT 1: MY RUNS & MATCHES */}
      {segment === 'upcoming' && (
        <div className="space-y-4">
          {upcomingGames.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#181f18] border border-[#2b352b] text-xs text-[#aeb4ac]">
              <Calendar className="w-10 h-10 text-[#7f877d] mx-auto mb-3" />
              <p className="font-bold text-[#f5f8f4] text-base">No upcoming matches</p>
              <p className="mt-1 max-w-md mx-auto">
                Join an open pickup game in your area or reserve a court at one of our partner venues.
              </p>
              <button
                onClick={() => setSegment('open')}
                className="mt-4 py-2 px-5 rounded-xl bg-[#c4ff1a] text-[#162402] font-bold text-xs"
              >
                Find Open Runs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingGames.map(game => (
                <div
                  key={game.id}
                  className="p-5 rounded-2xl bg-[#181f18] border border-[#2f3c2f] shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#202920] text-[#c4ff1a] font-bold border border-[#344434]">
                          {game.sport} · Confirmed
                        </span>
                        <span className="text-xs text-[#aeb4ac]">
                          {game.level} Tier
                        </span>
                      </div>

                      <span className="text-xs font-mono text-[#c4ff1a] font-bold">
                        Today · {game.time}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-lg text-[#f5f8f4]">
                      {game.title}
                    </h3>

                    <div className="text-xs text-[#aeb4ac] mt-2 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#7f877d]" />
                        <span>{game.venueName} ({game.courtName})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#7f877d]" />
                        <span>Duration: {game.durationMinutes} mins · {game.format}</span>
                      </div>
                    </div>
                  </div>

                  {/* Team roster preview */}
                  <div className="mt-4 pt-3.5 border-t border-[#263126]">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          {game.players.map((p, idx) => (
                            <img
                              key={p.id || idx}
                              src={p.avatar}
                              alt={p.name}
                              className="w-8 h-8 rounded-full border-2 border-[#181f18] object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#aeb4ac]">
                          {game.currentPlayers}/{game.maxPlayers} Players
                        </span>
                      </div>

                      <button
                        onClick={() => setActivePassBookingId(activePassBookingId === game.id ? null : game.id)}
                        className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-[#222b22] hover:bg-[#2b372b] text-xs font-mono text-[#c4ff1a] border border-[#374537] transition-colors cursor-pointer"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>{activePassBookingId === game.id ? 'Hide Pass' : 'Show Match Pass'}</span>
                      </button>
                    </div>

                    {/* Expandable Digital Match Pass */}
                    {activePassBookingId === game.id && (
                      <div className="mt-4 p-4 rounded-xl bg-[#141a14] border border-[#324032] text-center">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-[#aeb4ac]">TURNSTILE & LIGHTS ACCESS QR</span>
                          <span className="text-[10px] font-mono text-[#c4ff1a]">REF #PL4Y-7821</span>
                        </div>
                        <div className="p-3 bg-white rounded-lg inline-block my-2 shadow-md">
                          <QrCode className="w-28 h-28 text-black" />
                        </div>
                        <p className="text-xs text-[#aeb4ac]">
                          Scan at {game.venueName} entrance for smart court lighting & gate unlock.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 2: OPEN PICKUP GAMES */}
      {segment === 'open' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#aeb4ac]">
            <span className="font-semibold text-[#f5f8f4]">Filter by sport:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['all', 'padel', 'football', 'pickleball', 'basketball', 'tennis'] as (Sport | 'all')[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSport(s)}
                  className={`capitalize px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    selectedSport === s
                      ? 'bg-[#c4ff1a] text-[#162402] font-black'
                      : 'bg-[#181f18] text-[#aeb4ac] hover:text-[#f5f8f4] border border-[#2b352b]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {openPickupRuns.map(game => (
              <div
                key={game.id}
                onClick={() => setSelectedGameDetail(game)}
                className="p-5 rounded-2xl bg-[#181f18] border border-[#2b352b] hover:border-[#3e4e3e] transition-all cursor-pointer shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2.5">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#202920] text-[#c4ff1a] font-bold border border-[#344434]">
                      {game.sport} · {game.format}
                    </span>

                    <span className="text-[11px] font-mono text-[#c4ff1a] font-bold">
                      {game.maxPlayers - game.currentPlayers} spots remaining
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-base text-[#f5f8f4] leading-snug">
                    {game.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#aeb4ac] mt-2">
                    <span>{game.venueName}</span>
                    <span>·</span>
                    <span>{game.date} {game.time}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#263126] flex justify-between items-center text-xs">
                  <span className="font-mono font-bold text-[#f5f8f4] text-sm">
                    ${game.costPerPlayer} / player
                  </span>
                  <span className="text-xs font-bold text-[#c4ff1a] hover:underline">
                    View & Join →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEGMENT 3: HISTORY & SCORES */}
      {segment === 'history' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#181f18] p-5 rounded-2xl border border-[#2b352b]">
            <div>
              <span className="text-xs text-[#7f877d] block font-mono">PL4Y VERIFIED FORM</span>
              <div className="flex items-center gap-2 mt-1 font-heading font-black text-lg text-[#c4ff1a]">
                <span>W · W · L · W</span>
                <span className="text-xs text-[#f5f8f4] font-normal font-mono">(67% win rate over last 20 matches)</span>
              </div>
            </div>
            <button
              onClick={() => setScoreLogModalOpen(true)}
              className="py-2 px-4 rounded-xl bg-[#222b22] hover:bg-[#2b372b] text-xs font-bold text-[#c4ff1a] border border-[#364436] cursor-pointer"
            >
              + Log Verified Match Result
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.matchHistory.map(m => (
              <div
                key={m.id}
                className="p-4 rounded-2xl bg-[#181f18] border border-[#283228] flex items-center justify-between text-xs shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-heading font-black text-sm ${
                      m.result === 'W'
                        ? 'bg-[#c4ff1a]/15 text-[#c4ff1a] border border-[#c4ff1a]/30'
                        : 'bg-[#ff5247]/15 text-[#ff5247] border border-[#ff5247]/30'
                    }`}
                  >
                    {m.result}
                  </div>
                  <div>
                    <div className="font-bold text-[#f5f8f4] text-sm flex items-center gap-1.5">
                      <span className="capitalize">{m.sport}</span>
                      <span className="text-xs text-[#7f877d]">· {m.venueName}</span>
                    </div>
                    <div className="text-xs text-[#aeb4ac] mt-0.5">
                      vs {m.opponents} · <span className="font-mono font-bold text-[#f5f8f4]">{m.score}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono text-sm font-bold ${
                      m.result === 'W' ? 'text-[#c4ff1a]' : 'text-[#ff5247]'
                    }`}
                  >
                    {m.ratingDelta}
                  </span>
                  <span className="block text-[11px] text-[#7f877d]">{m.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Score Modal */}
          {scoreLogModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
              <div className="bg-[#181f18] border border-[#334233] rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4">
                <h3 className="font-heading font-black text-lg text-[#f5f8f4]">
                  Log Verified Match Result
                </h3>
                <form onSubmit={handleLogScore} className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#aeb4ac] block mb-1 font-semibold">Sport</label>
                    <select
                      value={loggedScore.sport}
                      onChange={e => setLoggedScore({ ...loggedScore, sport: e.target.value as Sport })}
                      className="w-full bg-[#121612] border border-[#2b352b] rounded-xl p-3 text-[#f5f8f4]"
                    >
                      <option value="padel">Padel</option>
                      <option value="football">Football</option>
                      <option value="pickleball">Pickleball</option>
                      <option value="tennis">Tennis</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[#aeb4ac] block mb-1 font-semibold">Scoreline (e.g. 6-4, 7-5)</label>
                    <input
                      type="text"
                      required
                      value={loggedScore.score}
                      onChange={e => setLoggedScore({ ...loggedScore, score: e.target.value })}
                      className="w-full bg-[#121612] border border-[#2b352b] rounded-xl p-3 text-[#f5f8f4] font-mono"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setScoreLogModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl bg-[#222b22] text-[#aeb4ac] hover:text-[#f5f8f4] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#c4ff1a] text-[#162402] font-heading font-black uppercase text-xs tracking-wider cursor-pointer"
                    >
                      Record Result
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
