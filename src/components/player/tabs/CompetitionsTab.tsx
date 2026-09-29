import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Trophy, Award, Calendar, MapPin, Users, Sparkles, Check, ChevronRight } from 'lucide-react';

export const CompetitionsTab: React.FC = () => {
  const { tournaments, registerTournament } = useApp();
  const [selectedTourneyId, setSelectedTourneyId] = useState<string>('tourney-1');
  const [activeTab, setActiveTab] = useState<'tournaments' | 'bracket' | 'ladder'>('tournaments');

  const activeTourney = tournaments.find(t => t.id === selectedTourneyId) || tournaments[0];

  return (
    <div className="space-y-6 pb-16 text-[#f5f8f4]">
      {/* Header */}
      <div>
        <h2 className="font-heading font-black text-2xl text-[#f5f8f4] tracking-tight">
          Competitions & Sanctioned Cups
        </h2>
        <p className="text-xs sm:text-sm text-[#aeb4ac]">
          Sanctioned tournaments, ladders, and founding member cups with prize pools
        </p>
      </div>

      {/* Founding Perks Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#202b20] via-[#1a231a] to-[#141a14] border border-[#3b4c3b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#c4ff1a]/15 text-[#c4ff1a] flex items-center justify-center flex-shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-sm sm:text-base text-[#f5f8f4] block">
              Founding Player Priority Seeding
            </span>
            <p className="text-[#aeb4ac] text-xs sm:text-sm leading-relaxed max-w-xl">
              As Founding Player #0412, you bypass the public ballot and receive priority seeding and warm-up privileges into all PL4Y 2026 cups.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#c4ff1a] bg-[#141c14] px-3 py-1 rounded-full border border-[#2f3e2f] whitespace-nowrap">
          GUARANTEED SEED
        </span>
      </div>

      {/* Segmented sub tabs */}
      <div className="flex items-center p-1 rounded-xl bg-[#181f18] border border-[#2b352b] max-w-md">
        <button
          onClick={() => setActiveTab('tournaments')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            activeTab === 'tournaments'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          All Cups ({tournaments.length})
        </button>

        <button
          onClick={() => setActiveTab('bracket')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            activeTab === 'bracket'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          Live Bracket
        </button>

        <button
          onClick={() => setActiveTab('ladder')}
          className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
            activeTab === 'ladder'
              ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
              : 'text-[#aeb4ac] hover:text-[#f5f8f4]'
          }`}
        >
          City Ladder
        </button>
      </div>

      {/* TAB 1: TOURNAMENTS LIST */}
      {activeTab === 'tournaments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tournaments.map(tourney => (
            <div
              key={tourney.id}
              className="p-5 rounded-2xl bg-[#181f18] border border-[#2b352b] shadow-md hover:border-[#3e4e3e] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#202920] text-[#c4ff1a] font-bold border border-[#344434]">
                      {tourney.sport}
                    </span>
                    <span className="text-xs text-[#aeb4ac] font-medium">
                      {tourney.format}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#7f877d] block uppercase font-mono">Prize Pool</span>
                    <span className="font-mono text-xs font-bold text-[#c4ff1a]">
                      {tourney.prize}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-black text-lg text-[#f5f8f4]">
                  {tourney.title}
                </h3>

                <div className="space-y-1 text-xs text-[#aeb4ac] mt-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#7f877d]" />
                    <span>{tourney.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7f877d]" />
                    <span>{tourney.date}</span>
                  </div>
                </div>

                <div className="mt-3.5 p-3 rounded-xl bg-[#202820] border border-[#2d3a2d] flex items-center gap-2 text-xs text-[#aeb4ac]">
                  <Sparkles className="w-4 h-4 text-[#c4ff1a] flex-shrink-0" />
                  <span>{tourney.foundingPerk}</span>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#263126] flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono font-bold text-[#f5f8f4]">
                    {tourney.teamsCount}/{tourney.maxTeams} Teams
                  </span>
                  <span className="text-[10px] text-[#7f877d] block font-mono">
                    Entry: {tourney.entryFee}
                  </span>
                </div>

                {tourney.isRegistered ? (
                  <div className="flex items-center gap-1 py-2 px-3.5 rounded-xl bg-[#223022] text-[#c4ff1a] font-bold text-xs border border-[#3b4e3b]">
                    <Check className="w-4 h-4" />
                    <span>Registered</span>
                  </div>
                ) : tourney.status === 'full' ? (
                  <span className="text-xs text-[#7f877d] font-bold">Waitlist Only</span>
                ) : (
                  <button
                    onClick={() => registerTournament(tourney.id)}
                    className="py-2 px-4 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] font-heading font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    Register Team
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: LIVE BRACKET VIEWER */}
      {activeTab === 'bracket' && (
        <div className="bg-[#181f18] p-6 rounded-2xl border border-[#2b352b] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#263126] pb-4">
            <div>
              <span className="font-mono text-[#c4ff1a] text-xs uppercase font-bold block">
                OFFICIAL TOURNAMENT BRACKET
              </span>
              <h3 className="font-heading font-black text-xl text-[#f5f8f4] mt-0.5">
                PL4Y Metro Padel Open 2026 (Championship Gold Bracket)
              </h3>
            </div>
            <span className="text-xs font-mono text-[#aeb4ac]">8 Qualified Teams · Double Elimination</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Round 1 */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#c4ff1a] uppercase tracking-wider font-bold">
                Quarterfinals
              </div>

              {/* Match 1 */}
              <div className="p-4 rounded-xl bg-[#141a14] border border-[#2b352b] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#f5f8f4] font-bold">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#c4ff1a]">#1 Seed</span>
                    <span>Mercer & Sterling (You)</span>
                  </span>
                  <span className="font-mono text-[#c4ff1a]">6 · 6 (W)</span>
                </div>
                <div className="flex justify-between items-center text-[#7f877d]">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-mono">#8</span>
                    <span>Vance & Brooks</span>
                  </span>
                  <span className="font-mono">4 · 3</span>
                </div>
              </div>

              {/* Match 2 */}
              <div className="p-4 rounded-xl bg-[#141a14] border border-[#2b352b] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[#f5f8f4] font-bold">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#aeb4ac]">#4 Seed</span>
                    <span>Ramos & Vega</span>
                  </span>
                  <span className="font-mono text-[#c4ff1a]">7 · 6 (W)</span>
                </div>
                <div className="flex justify-between items-center text-[#7f877d]">
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-mono">#5</span>
                    <span>Chen & Rossi</span>
                  </span>
                  <span className="font-mono">5 · 4</span>
                </div>
              </div>
            </div>

            {/* Round 2 */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#c4ff1a] uppercase tracking-wider font-bold">
                Semifinals (Oct 18)
              </div>

              <div className="p-4 rounded-xl bg-[#1f281f] border border-[#3b4c3b] space-y-2.5 text-xs shadow-md">
                <div className="flex justify-between items-center text-[#f5f8f4] font-bold">
                  <span>Mercer & Sterling</span>
                  <span className="text-[10px] font-mono text-[#c4ff1a] bg-[#141b14] px-2 py-0.5 rounded">
                    SCHEDULED
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#aeb4ac]">
                  <span>Ramos & Vega</span>
                  <span className="text-[10px] font-mono text-[#7f877d]">Apex Court 1</span>
                </div>
              </div>
            </div>

            {/* Finals */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#ffd700] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Championship Final (Oct 19)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#181f18] border border-dashed border-[#3d4d3d] text-center text-xs text-[#7f877d] py-8">
                TBD vs TBD
                <span className="block text-[10px] font-mono text-[#c4ff1a] mt-1">$3,500 + Custom Trophy</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CITY LADDER */}
      {activeTab === 'ladder' && (
        <div className="bg-[#181f18] p-6 rounded-2xl border border-[#2b352b] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-black text-lg text-[#f5f8f4]">
              City Ladder Standings
            </h3>
            <span className="text-xs text-[#aeb4ac] font-mono">Updated after each verified run</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#263126] text-[#7f877d] font-mono uppercase text-[11px]">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Primary Sport</th>
                  <th className="py-2.5 px-3">Form Streak</th>
                  <th className="py-2.5 px-3 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Elena Ramos', sport: 'Padel', streak: 'W5', pts: '1,420' },
                  { rank: 2, name: 'Marcus Sterling', sport: 'Padel', streak: 'W3', pts: '1,385' },
                  { rank: 3, name: 'Alex Mercer (You)', sport: 'Padel', streak: 'W4', pts: '1,340', isUser: true },
                  { rank: 4, name: 'Sofia Alvarez', sport: 'Padel', streak: 'W2', pts: '1,290' },
                  { rank: 5, name: 'Lucas Silva', sport: 'Football', streak: 'W1', pts: '1,240' },
                  { rank: 6, name: 'Tariq Al-Mansoor', sport: 'Football', streak: 'W2', pts: '1,210' },
                ].map(item => (
                  <tr
                    key={item.rank}
                    className={`border-b border-[#202720] ${
                      item.isUser ? 'bg-[#222c22]/80 text-[#c4ff1a]' : 'hover:bg-[#1a211a]'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold">#{item.rank}</td>
                    <td className="py-3 px-3 font-bold text-[#f5f8f4] flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.isUser && (
                        <span className="text-[10px] bg-[#c4ff1a]/20 text-[#c4ff1a] px-1.5 py-0.2 rounded font-mono">
                          YOU
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 capitalize text-[#aeb4ac]">{item.sport}</td>
                    <td className="py-3 px-3 font-mono text-[#c4ff1a]">{item.streak}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#f5f8f4]">
                      {item.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
