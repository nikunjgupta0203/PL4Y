import React from 'react';
import { useApp } from '../../../context/AppContext';
import { X, MapPin, Clock, Users, Shield, ArrowRight, Check } from 'lucide-react';

export const GameDetailModal: React.FC = () => {
  const {
    selectedGameDetail,
    setSelectedGameDetail,
    userProfile,
    joinGame,
    setBookingModalVenue,
    venues
  } = useApp();

  const game = selectedGameDetail;
  if (!game) return null;

  const isUserJoined = game.players.some(p => p.id === userProfile.id);
  const isFull = game.currentPlayers >= game.maxPlayers;
  const spotsLeft = game.maxPlayers - game.currentPlayers;

  const handleJoin = () => {
    joinGame(game.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#181e18] border border-[#343e34] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col text-[#f5f8f4]">
        {/* Header */}
        <div className="p-5 border-b border-[#2d362d] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#222a22] text-[#c4ff1a] border border-[#374437]">
                {game.sport.toUpperCase()} · {game.format}
              </span>
              <span className="text-[10px] font-mono text-[#aeb4ac]">
                {game.level} Tier
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-lg text-[#f5f8f4] leading-tight">
              {game.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedGameDetail(null)}
            className="p-1.5 rounded-lg bg-[#222a22] text-[#aeb4ac] hover:text-[#f5f8f4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Stats & Location */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#1e251e] p-3 rounded-xl border border-[#2f392f]">
              <span className="text-[10px] text-[#7f877d] block">VENUE & COURT</span>
              <span className="font-bold text-[#f5f8f4] block mt-0.5">{game.venueName}</span>
              <span className="text-[11px] text-[#aeb4ac]">{game.courtName}</span>
            </div>
            <div className="bg-[#1e251e] p-3 rounded-xl border border-[#2f392f]">
              <span className="text-[10px] text-[#7f877d] block">SCHEDULE</span>
              <span className="font-bold text-[#f5f8f4] block mt-0.5">{game.date} · {game.time}</span>
              <span className="text-[11px] text-[#aeb4ac]">{game.durationMinutes} mins match</span>
            </div>
          </div>

          {/* Host Notes */}
          {game.notes && (
            <div className="bg-[#1b221b] border border-[#2b352b] rounded-xl p-3 text-xs text-[#aeb4ac] leading-relaxed">
              <span className="font-bold text-[#f5f8f4] block mb-1">Host Notes</span>
              {game.notes}
            </div>
          )}

          {/* Confirmed Roster */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-[#f5f8f4]">
                Player Roster ({game.currentPlayers}/{game.maxPlayers})
              </span>
              <span className="text-[11px] font-mono text-[#c4ff1a]">
                {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} remaining` : 'Roster Full'}
              </span>
            </div>

            <div className="space-y-2">
              {game.players.map((player, idx) => (
                <div
                  key={player.id || idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#1e251e] border border-[#2f382f]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#3b473b]"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#f5f8f4] flex items-center gap-1.5">
                        <span>{player.name}</span>
                        {player.isHost && (
                          <span className="text-[9px] bg-[#c4ff1a]/15 text-[#c4ff1a] px-1.5 py-0.2 rounded font-mono">
                            HOST
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-[#aeb4ac]">
                        PL4Y Rating: {player.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-[#7f877d]">
                    Slot #{idx + 1}
                  </div>
                </div>
              ))}

              {/* Empty spots */}
              {Array.from({ length: spotsLeft }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-dashed border-[#343e34] bg-[#161a16]/50 text-xs text-[#7f877d]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-dashed border-[#445144] flex items-center justify-center text-[10px]">
                      +
                    </div>
                    <span>Open Player Slot</span>
                  </div>
                  <span className="text-[10px] font-mono">Available</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#2d362d] bg-[#181e18] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#7f877d] uppercase tracking-wider block">Player Share</span>
            <span className="font-heading font-black text-xl text-[#f5f8f4]">
              ${game.costPerPlayer}
            </span>
          </div>

          {isUserJoined ? (
            <div className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#222c22] text-[#c4ff1a] text-xs font-bold border border-[#394a39]">
              <Check className="w-4 h-4" />
              <span>You are on the roster</span>
            </div>
          ) : isFull ? (
            <button
              disabled
              className="py-2.5 px-5 rounded-xl bg-[#222822] text-[#7f877d] text-xs font-bold cursor-not-allowed"
            >
              Game is Full
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="py-2.5 px-6 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] font-heading font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-[#c4ff1a]/20 cursor-pointer"
            >
              Join Match (${game.costPerPlayer})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
