import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Sport } from '../../../types';
import { X, Trophy, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

export const CreateGameModal: React.FC = () => {
  const { isCreateGameOpen, setIsCreateGameOpen, venues, createGame } = useApp();

  const [sport, setSport] = useState<Sport>('padel');
  const [title, setTitle] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || 'apex-padel');
  const [time, setTime] = useState('19:00');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Intermediate');
  const [costPerPlayer, setCostPerPlayer] = useState(12);
  const [notes, setNotes] = useState('');

  if (!isCreateGameOpen) return null;

  const selectedVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createGame({
      title: title.trim(),
      sport,
      venueId: selectedVenue.id,
      venueName: selectedVenue.name,
      courtName: selectedVenue.courts[0]?.name || 'Court 1',
      date: 'Today',
      time,
      durationMinutes: 90,
      maxPlayers: Number(maxPlayers),
      level,
      format: sport === 'football' ? '5v5 Pick-up' : sport === 'padel' ? 'Doubles' : 'Open Run',
      costPerPlayer: Number(costPerPlayer),
      notes: notes.trim() || 'Join in! Balls & court reserved via PL4Y.'
    });

    setIsCreateGameOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#181e18] border border-[#343e34] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col text-[#f5f8f4]">
        {/* Header */}
        <div className="p-5 border-b border-[#2d362d] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c4ff1a]">
              Host A Match
            </span>
            <h3 className="font-heading font-extrabold text-lg text-[#f5f8f4]">
              Publish Open Run
            </h3>
          </div>
          <button
            onClick={() => setIsCreateGameOpen(false)}
            className="p-1.5 rounded-lg bg-[#222a22] text-[#aeb4ac] hover:text-[#f5f8f4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Sport selection */}
          <div>
            <label className="font-bold text-[#aeb4ac] block mb-1.5">Sport</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {(['padel', 'football', 'pickleball', 'basketball', 'tennis', 'badminton'] as Sport[]).map(s => (
                <button
                  type="button"
                  key={s}
                  onClick={() => {
                    setSport(s);
                    if (s === 'football') setMaxPlayers(10);
                    else if (s === 'basketball') setMaxPlayers(6);
                    else setMaxPlayers(4);
                  }}
                  className={`py-2 px-1 text-center capitalize rounded-xl font-bold border transition-colors ${
                    sport === s
                      ? 'bg-[#c4ff1a] text-[#162402] border-[#c4ff1a]'
                      : 'bg-[#1e251e] text-[#aeb4ac] border-[#2f392f] hover:text-[#f5f8f4]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Game Title */}
          <div>
            <label className="font-bold text-[#aeb4ac] block mb-1">Title</label>
            <input
              type="text"
              required
              placeholder={`e.g. Wednesday ${sport.charAt(0).toUpperCase() + sport.slice(1)} Competitive Run`}
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl px-3.5 py-2.5 text-xs text-[#f5f8f4] placeholder-[#5d685d] focus:outline-none focus:border-[#c4ff1a]"
            />
          </div>

          {/* Venue & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#aeb4ac] block mb-1">Venue</label>
              <select
                value={selectedVenueId}
                onChange={e => setSelectedVenueId(e.target.value)}
                className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl px-3 py-2.5 text-xs text-[#f5f8f4] focus:outline-none focus:border-[#c4ff1a]"
              >
                {venues.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-[#aeb4ac] block mb-1">Start Time</label>
              <select
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl px-3 py-2.5 text-xs text-[#f5f8f4] focus:outline-none focus:border-[#c4ff1a]"
              >
                {['17:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(t => (
                  <option key={t} value={t}>
                    {t} (Tonight)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Max Players & Cost per player */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="font-bold text-[#aeb4ac] block mb-1">Roster Size</label>
              <input
                type="number"
                min={2}
                max={22}
                value={maxPlayers}
                onChange={e => setMaxPlayers(Number(e.target.value))}
                className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl px-3 py-2.5 text-xs text-[#f5f8f4] font-mono focus:outline-none focus:border-[#c4ff1a]"
              />
            </div>
            <div>
              <label className="font-bold text-[#aeb4ac] block mb-1">Cost / Player ($)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={costPerPlayer}
                onChange={e => setCostPerPlayer(Number(e.target.value))}
                className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl px-3 py-2.5 text-xs text-[#f5f8f4] font-mono focus:outline-none focus:border-[#c4ff1a]"
              />
            </div>
            <div>
              <label className="font-bold text-[#aeb4ac] block mb-1">Skill Tier</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value as any)}
                className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl px-2.5 py-2.5 text-xs text-[#f5f8f4] focus:outline-none focus:border-[#c4ff1a]"
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold text-[#aeb4ac] block mb-1">Notes / Instructions</label>
            <textarea
              rows={2}
              placeholder="e.g. Competitive pace, Bring light & dark shirts, balls provided..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl p-3 text-xs text-[#f5f8f4] placeholder-[#5d685d] focus:outline-none focus:border-[#c4ff1a]"
            />
          </div>

          <div className="pt-3 border-t border-[#2d362d] flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateGameOpen(false)}
              className="py-2.5 px-4 rounded-xl bg-[#222a22] text-[#aeb4ac] hover:text-[#f5f8f4] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] font-heading font-black uppercase tracking-wider text-xs shadow-md transition-colors"
            >
              Publish Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
