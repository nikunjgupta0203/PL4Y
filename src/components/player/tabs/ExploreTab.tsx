import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Sport } from '../../../types';
import {
  Compass,
  MapPin,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Flame,
  Calendar,
  Sparkles,
  Plus,
  QrCode,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ExploreTab: React.FC = () => {
  const {
    userProfile,
    selectedSportFilter,
    setSelectedSportFilter,
    games,
    venues,
    tournaments,
    setBookingModalVenue,
    setSelectedGameDetail,
    setIsCreateGameOpen,
    registerTournament,
    setPlayerTab
  } = useApp();

  const sportsList: { id: Sport | 'all'; label: string }[] = [
    { id: 'all', label: 'All Sports' },
    { id: 'padel', label: 'Padel' },
    { id: 'football', label: 'Football' },
    { id: 'pickleball', label: 'Pickleball' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'badminton', label: 'Badminton' },
  ];

  const filteredGames = games.filter(
    g => selectedSportFilter === 'all' || g.sport === selectedSportFilter
  );

  const filteredVenues = venues.filter(
    v => selectedSportFilter === 'all' || v.sports.includes(selectedSportFilter as Sport)
  );

  const filteredTournaments = tournaments.filter(
    t => selectedSportFilter === 'all' || t.sport === selectedSportFilter
  );

  // User's next game
  const nextGame = games.find(g => g.players.some(p => p.id === userProfile.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Interactive Banner */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#1b231b] via-[#1f281f] to-[#161c16] border border-[#2f3b2f] p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4ff1a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold text-[#c4ff1a] tracking-widest uppercase bg-[#141b14] px-3 py-1 rounded-full border border-[#2e3c2e]">
              FOUNDING PLAYER #{userProfile.foundingNumber}
            </span>
            <span className="text-xs text-[#7f877d]">·</span>
            <span className="text-xs text-[#aeb4ac] font-mono">
              Rating 3.8 (Padel) · 4.2 (Football)
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f8f4] tracking-tight leading-tight">
            Discover. Play. Connect. <span className="text-[#c4ff1a]">Compete.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#aeb4ac] mt-2 sm:mt-3 leading-relaxed max-w-2xl">
            PL4Y is the modern sports identity and participation platform. Book premium courts, join competitive pickup runs, connect with local sports communities, and build your multi-sport passport.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => setBookingModalVenue(venues[0])}
              className="py-3 px-6 rounded-xl bg-[#c4ff1a] hover:bg-[#b5f012] text-[#162402] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#c4ff1a]/20 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Court</span>
            </button>

            <button
              onClick={() => setPlayerTab('games')}
              className="py-3 px-6 rounded-xl bg-[#222b22] hover:bg-[#2c372c] text-[#f5f8f4] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#374537] transition-all cursor-pointer flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-[#c4ff1a]" />
              <span>Join Open Runs ({games.length})</span>
            </button>

            <button
              onClick={() => setIsCreateGameOpen(true)}
              className="py-3 px-6 rounded-xl bg-[#1a221a] hover:bg-[#242e24] text-[#aeb4ac] hover:text-[#f5f8f4] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#2b352b] transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Host a Run</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sport Selector Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-b border-[#242e24] pb-4">
        <span className="text-xs font-mono text-[#7f877d] uppercase mr-1">Filter Sport:</span>
        {sportsList.map(sportItem => (
          <button
            key={sportItem.id}
            onClick={() => setSelectedSportFilter(sportItem.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedSportFilter === sportItem.id
                ? 'bg-[#c4ff1a] text-[#162402] font-black shadow-md'
                : 'bg-[#181f18] text-[#aeb4ac] hover:text-[#f5f8f4] border border-[#283228] hover:border-[#384638]'
            }`}
          >
            {sportItem.label}
          </button>
        ))}
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-10">
          {/* SECTION 1: Happening Today & Open Pickup Runs */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#f5f8f4] tracking-tight">
                  Open Runs & Pickup Matches
                </h2>
                <p className="text-xs sm:text-sm text-[#aeb4ac]">
                  Drop-in competitive and social games looking for players tonight
                </p>
              </div>
              <button
                onClick={() => setPlayerTab('games')}
                className="text-xs font-bold text-[#c4ff1a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All ({filteredGames.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGames.length === 0 ? (
                <div className="col-span-2 p-8 text-center rounded-2xl bg-[#181f18] border border-[#2b352b] text-[#aeb4ac] text-xs">
                  No open runs for {selectedSportFilter} scheduled. Be the first to host one!
                </div>
              ) : (
                filteredGames.map(game => {
                  const spotsLeft = game.maxPlayers - game.currentPlayers;
                  const isJoined = game.players.some(p => p.id === userProfile.id);

                  return (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGameDetail(game)}
                      className="p-5 rounded-2xl bg-[#181f18] border border-[#2b352b] hover:border-[#425042] transition-all cursor-pointer shadow-md group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#202920] text-[#c4ff1a] font-bold border border-[#344434]">
                              {game.sport}
                            </span>
                            <span className="text-xs text-[#aeb4ac] font-medium">
                              {game.level} Tier
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] font-mono text-[#c4ff1a] font-bold bg-[#141b14] px-2.5 py-0.5 rounded-md border border-[#2a362a]">
                            <Users className="w-3.5 h-3.5" />
                            <span>{spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} left` : 'Roster Full'}</span>
                          </div>
                        </div>

                        <h3 className="font-heading font-black text-base text-[#f5f8f4] group-hover:text-[#c4ff1a] transition-colors leading-snug">
                          {game.title}
                        </h3>

                        <div className="text-xs text-[#aeb4ac] mt-2.5 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#7f877d] flex-shrink-0" />
                            <span className="truncate">{game.venueName} · {game.courtName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#7f877d] flex-shrink-0" />
                            <span>{game.date} · {game.time} ({game.durationMinutes} mins)</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-[#263126] flex justify-between items-center">
                        <div className="flex items-center -space-x-1.5">
                          {game.players.slice(0, 4).map((p, idx) => (
                            <img
                              key={p.id || idx}
                              src={p.avatar}
                              alt={p.name}
                              className="w-7 h-7 rounded-full border-2 border-[#181f18] object-cover"
                            />
                          ))}
                          {spotsLeft > 0 && (
                            <div className="w-7 h-7 rounded-full bg-[#222c22] border-2 border-[#181f18] flex items-center justify-center text-[10px] text-[#c4ff1a] font-mono font-bold">
                              +{spotsLeft}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-[#f5f8f4]">
                            ${game.costPerPlayer}/player
                          </span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedGameDetail(game);
                            }}
                            className={`py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isJoined
                                ? 'bg-[#223022] text-[#c4ff1a] border border-[#3a4e3a]'
                                : 'bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] shadow-sm'
                            }`}
                          >
                            {isJoined ? 'Confirmed' : 'Join Run'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* SECTION 2: Top Sports Venues */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#f5f8f4] tracking-tight">
                  Partner Sports Venues
                </h2>
                <p className="text-xs sm:text-sm text-[#aeb4ac]">
                  Real-time court availability, professional surfaces, and instant bookings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredVenues.map(venue => (
                <div
                  key={venue.id}
                  className="rounded-2xl bg-[#181f18] border border-[#2b352b] overflow-hidden shadow-lg hover:border-[#3e4d3e] transition-all flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181f18] via-transparent to-black/40" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {venue.sports.map(s => (
                        <span
                          key={s}
                          className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#c4ff1a] font-bold border border-white/10"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-mono text-[#f5f8f4] flex items-center gap-1 border border-white/10">
                      <span className="text-[#c4ff1a]">★</span>
                      <span className="font-bold">{venue.rating}</span>
                      <span className="text-[10px] text-[#7f877d]">({venue.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-heading font-black text-lg text-[#f5f8f4]">
                        {venue.name}
                      </h3>
                      <p className="text-xs text-[#aeb4ac] mt-0.5">
                        {venue.location} · {venue.distance}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {venue.amenities.map(amenity => (
                        <span
                          key={amenity}
                          className="text-[10px] text-[#aeb4ac] bg-[#202720] px-2.5 py-1 rounded-md border border-[#2a342a]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#263126] flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-[#7f877d] uppercase tracking-wider block font-mono">
                          Court Pricing
                        </span>
                        <span className="font-mono text-sm font-black text-[#c4ff1a]">
                          From ${venue.courts[0]?.hourlyRate || 35} / hour
                        </span>
                      </div>

                      <button
                        onClick={() => setBookingModalVenue(venue)}
                        className="py-2 px-5 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] text-xs font-heading font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                      >
                        Reserve Court
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column Sidebar (1/3 width on desktop) */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Active Next Match Digital Pass */}
          {nextGame ? (
            <div className="rounded-2xl bg-[#181f18] border border-[#334233] p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-mono text-[#c4ff1a] uppercase tracking-wider font-bold">
                  YOUR NEXT SCHEDULED RUN
                </span>
                <span className="text-xs font-mono font-bold text-[#f5f8f4]">
                  {nextGame.time} Tonight
                </span>
              </div>

              <h3 className="font-heading font-black text-base text-[#f5f8f4]">
                {nextGame.title}
              </h3>
              <p className="text-xs text-[#aeb4ac] mt-1">
                {nextGame.venueName} · {nextGame.courtName}
              </p>

              <div className="my-4 p-3 bg-white rounded-xl flex items-center justify-between text-black">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#777]">DIGITAL MATCH PASS</div>
                  <div className="font-heading font-black text-base text-[#111]">
                    PL4Y-7821
                  </div>
                  <div className="text-[10px] text-[#555] mt-0.5">Turnstile & Lights QR Active</div>
                </div>
                <QrCode className="w-12 h-12 text-black" />
              </div>

              <div className="text-xs text-[#aeb4ac] flex justify-between items-center">
                <span>Roster: {nextGame.currentPlayers}/{nextGame.maxPlayers} confirmed</span>
                <button
                  onClick={() => setSelectedGameDetail(nextGame)}
                  className="font-bold text-[#c4ff1a] hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          ) : null}

          {/* Multi-Sport Passport Snapshot */}
          <div className="rounded-2xl bg-[#181f18] border border-[#2b352b] p-5 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7f877d]">
                  SPORTS PASSPORT
                </span>
                <h3 className="font-heading font-extrabold text-base text-[#f5f8f4]">
                  {userProfile.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#c4ff1a] font-bold bg-[#141b14] px-2 py-0.5 rounded border border-[#2a362a]">
                #{userProfile.foundingNumber}
              </span>
            </div>

            <div className="space-y-2">
              {userProfile.ratings.map(r => (
                <div
                  key={r.sport}
                  className="p-2.5 rounded-xl bg-[#141a14] border border-[#242e24] flex justify-between items-center text-xs"
                >
                  <span className="capitalize font-bold text-[#f5f8f4]">{r.sport}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#7f877d]">{r.tier}</span>
                    <span className="font-mono font-bold text-[#c4ff1a] bg-[#1a221a] px-2 py-0.5 rounded">
                      {r.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPlayerTab('passport')}
              className="w-full py-2.5 rounded-xl bg-[#222b22] hover:bg-[#2b372b] text-xs font-bold text-[#c4ff1a] border border-[#354435] transition-colors"
            >
              Open Full Sports Identity →
            </button>
          </div>

          {/* Founding Player Perks Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1c241c] to-[#141914] border border-[#324032] p-5 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-[#c4ff1a]">
              <Sparkles className="w-4 h-4" />
              <span className="font-heading font-extrabold text-xs uppercase tracking-wider">
                Founding Member Perks
              </span>
            </div>
            <p className="text-xs text-[#aeb4ac] leading-relaxed">
              As one of the first 1,000 PL4Y players, you get early access to tournaments, seed priority, and free equipment rentals across all partner arenas.
            </p>
            <div className="space-y-1.5 text-xs text-[#f5f8f4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c4ff1a]" />
                <span>Priority entry in Metro Padel Open 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c4ff1a]" />
                <span>Zero service fees on court bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c4ff1a]" />
                <span>Verified digital sports passport badge</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
