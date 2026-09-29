import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Sport } from '../../../types';
import {
  ShieldCheck,
  Flame,
  Award,
  TrendingUp,
  HeartHandshake,
  QrCode,
  Share2,
  CheckCircle,
  Clock,
  MapPin,
  Sliders,
  Sparkles
} from 'lucide-react';

export const PassportTab: React.FC = () => {
  const { userProfile, addToast } = useApp();
  const [selectedSportIndex, setSelectedSportIndex] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const currentSportRating = userProfile.ratings[selectedSportIndex] || userProfile.ratings[0];

  const handleShareCard = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast(
      'Profile Link Copied',
      'Share your PL4Y Sports Identity with friends and teammates.',
      'info'
    );
  };

  return (
    <div className="space-y-8 pb-16 text-[#f5f8f4]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="font-heading font-black text-2xl text-[#f5f8f4] tracking-tight">
            Sports Identity & Digital Passport
          </h2>
          <p className="text-xs sm:text-sm text-[#aeb4ac]">
            Your universal player passport across all sports, venues, and competitions
          </p>
        </div>

        <button
          onClick={handleShareCard}
          className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#1b221b] hover:bg-[#252f25] text-[#c4ff1a] border border-[#344034] text-xs font-bold transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Sports Identity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Signature Digital Player Card */}
        <div className="lg:col-span-1 space-y-5">
          <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#242e24] via-[#1a221a] to-[#121612] border-2 border-[#455645] shadow-2xl overflow-hidden group">
            {/* Glow Accent */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#c4ff1a]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Card Bar */}
            <div className="flex justify-between items-center relative z-10 mb-5">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-2xl tracking-tighter text-[#c4ff1a]">
                  PL4Y
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase bg-[#182018] px-2.5 py-0.5 rounded text-[#aeb4ac] border border-[#303c30]">
                  PASSPORT
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#c4ff1a] bg-[#1a241a] px-3 py-1 rounded-full border border-[#3e503e]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c4ff1a]" />
                <span>FOUNDING #{userProfile.foundingNumber}</span>
              </div>
            </div>

            {/* Player Profile Details */}
            <div className="flex items-center gap-4 relative z-10 mb-6">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-18 h-18 rounded-2xl object-cover border-2 border-[#c4ff1a] shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 p-1 bg-[#121612] rounded-full">
                  <div className="w-4 h-4 rounded-full bg-[#c4ff1a] flex items-center justify-center text-[9px] font-black text-[#162402]">
                    ✓
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-black text-xl text-[#f5f8f4] truncate">
                  {userProfile.name}
                </h3>
                <div className="text-xs text-[#c4ff1a] font-mono font-medium">
                  @{userProfile.username}
                </div>
                <div className="text-xs text-[#aeb4ac] mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7f877d]" />
                  <span>{userProfile.location}</span>
                  <span>·</span>
                  <span className="text-[#7f877d]">{userProfile.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Selected Sport Level Highlight */}
            <div className="relative z-10 bg-[#161d16]/90 rounded-2xl p-4 border border-[#303d30] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-[#7f877d] uppercase tracking-wider">
                  PRIMARY DISCIPLINE
                </span>
                <span className="text-xs font-mono font-bold text-[#c4ff1a]">
                  LEVEL {currentSportRating.rating} / 5.0
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="capitalize font-heading font-extrabold text-lg text-[#f5f8f4] block">
                    {currentSportRating.sport}
                  </span>
                  <span className="text-xs text-[#aeb4ac]">{currentSportRating.tier}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-[#c4ff1a]">
                    {currentSportRating.winRate}%
                  </span>
                  <span className="text-[10px] text-[#7f877d] block font-mono">Win Rate</span>
                </div>
              </div>
            </div>

            {/* Card Footer Bar with QR Trigger */}
            <div className="mt-5 pt-3.5 border-t border-[#2b362b] flex justify-between items-center relative z-10 text-xs">
              <div className="text-xs text-[#7f877d] font-mono">
                ID: 0412-PL4Y-LON
              </div>

              <button
                onClick={() => setIsQrModalOpen(true)}
                className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-[#222c22] hover:bg-[#2d3a2d] text-[#c4ff1a] border border-[#3b4b3b] font-mono text-xs transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Show ID QR</span>
              </button>
            </div>
          </div>

          {/* Player Gear & Playstyle */}
          <div className="p-5 rounded-2xl bg-[#181f18] border border-[#2b352b] text-xs space-y-3">
            <h4 className="font-heading font-black text-sm text-[#f5f8f4]">
              Court Preferences & Gear
            </h4>
            <div className="grid grid-cols-2 gap-3 text-[#aeb4ac]">
              <div>
                <span className="text-[#7f877d] block text-[10px]">DOMINANT HAND</span>
                <span className="font-semibold text-[#f5f8f4] text-xs">{userProfile.preferredHand}</span>
              </div>
              <div>
                <span className="text-[#7f877d] block text-[10px]">PREFERRED COURT SIDE</span>
                <span className="font-semibold text-[#f5f8f4] text-xs">{userProfile.preferredSide}</span>
              </div>
            </div>
            <p className="text-xs text-[#7f877d] pt-2 border-t border-[#263126] leading-relaxed">
              Bio: {userProfile.bio}
            </p>
          </div>
        </div>

        {/* Right Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          {/* VERIFIED PERFORMANCE STATS GRID */}
          <section>
            <h3 className="font-heading font-black text-lg text-[#f5f8f4] mb-3">
              Verified Performance Statistics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2b352b]">
                <span className="text-xs text-[#7f877d] block font-mono">MATCHES</span>
                <span className="font-heading font-black text-2xl text-[#f5f8f4] mt-1 block">
                  {userProfile.stats.totalMatches}
                </span>
                <span className="text-xs text-[#c4ff1a] block mt-1 font-mono">Across 4 sports</span>
              </div>

              <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2b352b]">
                <span className="text-xs text-[#7f877d] block font-mono">COURT TIME</span>
                <span className="font-heading font-black text-2xl text-[#f5f8f4] mt-1 block">
                  {userProfile.stats.hoursOnCourt}h
                </span>
                <span className="text-xs text-[#aeb4ac] block mt-1 font-mono">Tracked on-court</span>
              </div>

              <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2b352b]">
                <span className="text-xs text-[#7f877d] block font-mono">WIN RATE</span>
                <span className="font-heading font-black text-2xl text-[#c4ff1a] mt-1 block">
                  {userProfile.stats.winRate}%
                </span>
                <span className="text-xs text-[#aeb4ac] block mt-1 font-mono">4-match win streak</span>
              </div>

              <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2b352b]">
                <span className="text-xs text-[#7f877d] block font-mono">FAIR PLAY SCORE</span>
                <span className="font-heading font-black text-2xl text-[#f5f8f4] mt-1 block">
                  {userProfile.stats.fairPlayScore}
                </span>
                <span className="text-xs text-[#79c0ff] block mt-1 font-mono">Pristine conduct</span>
              </div>
            </div>
          </section>

          {/* MULTI-SPORT SKILL MATRIX */}
          <section>
            <h3 className="font-heading font-black text-lg text-[#f5f8f4] mb-3">
              Multi-Sport Skill Ratings (PL4Y ELO)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProfile.ratings.map((r, idx) => (
                <div
                  key={r.sport}
                  onClick={() => setSelectedSportIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedSportIndex === idx
                      ? 'bg-[#1f281f] border-[#c4ff1a] shadow-md'
                      : 'bg-[#181f18] border-[#2b352b] hover:border-[#3d4d3d]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="capitalize font-heading font-black text-base text-[#f5f8f4]">
                      {r.sport}
                    </span>
                    <span className="font-mono font-black text-sm text-[#c4ff1a]">
                      Level {r.rating.toFixed(1)} / 5.0
                    </span>
                  </div>
                  <div className="text-xs text-[#aeb4ac] mb-2">{r.tier}</div>

                  <div className="w-full bg-[#121612] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#c4ff1a] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(r.rating / 5.0) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-[#7f877d] mt-2 font-mono">
                    <span>{r.matches} verified runs</span>
                    <span>{r.winRate}% win rate</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SPORTS PASSPORT BADGES */}
          <section>
            <h3 className="font-heading font-black text-lg text-[#f5f8f4] mb-3">
              Passport Verified Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProfile.badges.map(badge => (
                <div
                  key={badge.id}
                  className="p-4 rounded-2xl bg-[#181f18] border border-[#2b352b] flex items-start gap-3.5 text-xs shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#c4ff1a]/15 text-[#c4ff1a] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {badge.id === 'b-founding' ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : badge.id === 'b-multisport' ? (
                      <Flame className="w-5 h-5" />
                    ) : badge.id === 'b-streak' ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <HeartHandshake className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#f5f8f4] block">{badge.name}</span>
                    <p className="text-xs text-[#aeb4ac] mt-1 leading-relaxed">
                      {badge.desc}
                    </p>
                    <span className="text-[10px] font-mono text-[#7f877d] mt-1.5 block">
                      Unlocked {badge.unlockedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* QR Code Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181e18] border border-[#343e34] rounded-2xl w-full max-w-sm p-6 text-center shadow-2xl space-y-4">
            <h3 className="font-heading font-black text-lg text-[#f5f8f4]">
              PL4Y Player ID Pass
            </h3>
            <p className="text-xs text-[#aeb4ac]">
              Scan to exchange sports profiles or check in at partner venues.
            </p>
            <div className="p-4 bg-white rounded-2xl inline-block shadow-xl">
              <QrCode className="w-44 h-44 text-black" />
            </div>
            <div className="font-mono text-xs text-[#c4ff1a] font-bold">
              @alex_pl4y · #0412
            </div>
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#222a22] text-[#aeb4ac] hover:text-[#f5f8f4] text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
