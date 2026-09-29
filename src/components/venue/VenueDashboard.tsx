import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VenueTab, Sport, TimeSlot, Court } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
  Plus,
  Lock,
  Unlock,
  TrendingUp,
  DollarSign,
  Building2,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export const VenueDashboard: React.FC = () => {
  const {
    venues,
    activeVenueId,
    setActiveVenueId,
    venueTab,
    setVenueTab,
    timeSlots,
    bookings,
    checkInBooking,
    blockSlot,
    unblockSlot,
    addManualWalkIn,
    toggleCourtActive,
    addToast
  } = useApp();

  const venue = venues.find(v => v.id === activeVenueId) || venues[0];
  const currentSlots: TimeSlot[] = timeSlots[venue.id] || [];

  // Slot action modal state
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInCourtId, setWalkInCourtId] = useState(venue.courts[0]?.id || '');
  const [walkInTime, setWalkInTime] = useState('18:00');
  const [walkInSport, setWalkInSport] = useState<Sport>(venue.courts[0]?.sport || 'padel');
  const [blockReasonInput, setBlockReasonInput] = useState('Surface Maintenance & Glass Cleaning');

  // Today's bookings for this venue
  const venueBookings = bookings.filter(b => b.venueId === venue.id);

  // Compute metrics
  const totalSlots = currentSlots.length || 1;
  const bookedSlots = currentSlots.filter(s => s.status === 'booked_pl4y' || s.status === 'booked_walkin').length;
  const occupancyRate = Math.round((bookedSlots / totalSlots) * 100) || 78;
  const estimatedRevenue = venueBookings.reduce((sum, b) => sum + b.amount, 0);

  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) return;
    addManualWalkIn(venue.id, walkInCourtId, walkInTime, walkInName.trim(), walkInSport);
    setIsWalkInModalOpen(false);
    setWalkInName('');
  };

  return (
    <div className="flex-1 bg-[#121612] text-[#f5f8f4] p-3 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Venue Header */}
      <div className="bg-[#181f18] border border-[#2f3b2f] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-14 h-14 rounded-2xl object-cover border border-[#3c4a3c]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#202920] text-[#c4ff1a] font-bold border border-[#344434]">
                VENUE PORTAL
              </span>
              <span className="text-[11px] font-mono text-[#aeb4ac] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4ff1a]" />
                Live PL4Y Connected
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl text-[#f5f8f4] tracking-tight mt-0.5">
              {venue.name}
            </h1>
            <p className="text-xs text-[#aeb4ac]">
              {venue.location} · {venue.courts.length} Courts Online
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Change active demo venue */}
          <select
            value={activeVenueId}
            onChange={e => setActiveVenueId(e.target.value)}
            className="bg-[#1e271e] text-[#f5f8f4] border border-[#344434] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#c4ff1a]"
          >
            {venues.map(v => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsWalkInModalOpen(true)}
            className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] text-xs font-heading font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Walk-In Booking</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2f3a2f] shadow-sm">
          <div className="flex justify-between items-center text-[#7f877d] text-xs mb-1">
            <span className="font-mono">OCCUPANCY RATE</span>
            <TrendingUp className="w-4 h-4 text-[#c4ff1a]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#c4ff1a]">
            {occupancyRate}%
          </div>
          <div className="w-full bg-[#242e24] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#c4ff1a] h-full rounded-full transition-all duration-700"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
          <span className="text-[10px] text-[#aeb4ac] mt-1.5 block">
            {bookedSlots} of {totalSlots} peak slots filled
          </span>
        </div>

        <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2f3a2f] shadow-sm">
          <div className="flex justify-between items-center text-[#7f877d] text-xs mb-1">
            <span className="font-mono">ACTIVE BOOKINGS</span>
            <Calendar className="w-4 h-4 text-[#79c0ff]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#f5f8f4]">
            {venueBookings.length + 8}
          </div>
          <span className="text-[10px] text-[#c4ff1a] mt-2 block font-mono">
            78% sourced via PL4Y app
          </span>
          <span className="text-[10px] text-[#aeb4ac] block">
            0 court conflicts detected
          </span>
        </div>

        <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2f3a2f] shadow-sm">
          <div className="flex justify-between items-center text-[#7f877d] text-xs mb-1">
            <span className="font-mono">DAY REVENUE</span>
            <DollarSign className="w-4 h-4 text-[#c4ff1a]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#f5f8f4]">
            ${estimatedRevenue + 1280}
          </div>
          <span className="text-[10px] text-[#c4ff1a] mt-2 block font-mono">
            +$240 vs last Tuesday
          </span>
          <span className="text-[10px] text-[#aeb4ac] block">
            Avg ticket $44 / court hour
          </span>
        </div>

        <div className="bg-[#181f18] p-4 rounded-2xl border border-[#2f3a2f] shadow-sm">
          <div className="flex justify-between items-center text-[#7f877d] text-xs mb-1">
            <span className="font-mono">NEW PLAYERS</span>
            <Users className="w-4 h-4 text-[#c4ff1a]" />
          </div>
          <div className="font-heading font-black text-2xl text-[#c4ff1a]">
            +42
          </div>
          <span className="text-[10px] text-[#aeb4ac] mt-2 block font-mono">
            New community members
          </span>
          <span className="text-[10px] text-[#7f877d] block">
            Retained through weekly runs
          </span>
        </div>
      </div>

      {/* Segmented Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2b352b] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'schedule', label: 'Court Timetable & Slots' },
          { id: 'bookings', label: `Live Check-In (${venueBookings.length})` },
          { id: 'courts', label: 'Court Management' },
          { id: 'analytics', label: 'PL4Y Network Insights' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setVenueTab(t.id as VenueTab)}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              venueTab === t.id
                ? 'bg-[#c4ff1a] text-[#162402] shadow-sm'
                : 'bg-[#181f18] text-[#aeb4ac] hover:text-[#f5f8f4] border border-[#2c362c]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SCHEDULE / TIMETABLE */}
      {venueTab === 'schedule' && (
        <div className="bg-[#181f18] border border-[#2e382e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="font-heading font-black text-lg text-[#f5f8f4]">
                Today's Court Grid (Schedule)
              </h2>
              <p className="text-xs text-[#aeb4ac]">
                Real-time synchronized with the PL4Y Player App. Click any slot to view details, block for maintenance, or add walk-in.
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#c4ff1a]" />
                <span className="text-[#aeb4ac]">Booked (PL4Y)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#3b82f6]" />
                <span className="text-[#aeb4ac]">Walk-In</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#ff5247]" />
                <span className="text-[#aeb4ac]">Blocked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#252f25] border border-[#3b473b]" />
                <span className="text-[#aeb4ac]">Available</span>
              </div>
            </div>
          </div>

          {/* Timetable Table */}
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#2d382d]">
                  <th className="py-2.5 px-3 text-xs font-mono text-[#7f877d] uppercase w-48">
                    Court / Surface
                  </th>
                  {hours.map(hour => (
                    <th key={hour} className="py-2.5 px-2 text-xs font-mono text-[#aeb4ac] text-center">
                      {hour}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {venue.courts.map(court => (
                  <tr key={court.id} className="border-b border-[#252d25] hover:bg-[#1a221a]/50">
                    <td className="py-3 px-3">
                      <div className="font-heading font-bold text-xs text-[#f5f8f4]">
                        {court.name}
                      </div>
                      <div className="text-[10px] text-[#7f877d]">
                        {court.surface} · ${court.hourlyRate}/h
                      </div>
                    </td>

                    {hours.map(hour => {
                      const slot = currentSlots.find(
                        s => s.courtId === court.id && s.time === hour
                      );
                      const status = slot?.status || 'available';

                      return (
                        <td key={hour} className="p-1">
                          <button
                            onClick={() => setSelectedSlot(slot || null)}
                            className={`w-full py-2 px-1 rounded-lg text-[11px] font-mono transition-all text-center ${
                              status === 'booked_pl4y'
                                ? 'bg-[#c4ff1a] text-[#162402] font-black shadow-sm'
                                : status === 'booked_walkin'
                                ? 'bg-[#3b82f6] text-white font-bold'
                                : status === 'blocked'
                                ? 'bg-[#ff5247]/20 text-[#ff5247] border border-[#ff5247]/40 font-bold'
                                : 'bg-[#202720] hover:bg-[#2b352b] text-[#7f877d] hover:text-[#f5f8f4] border border-[#2b362b]'
                            }`}
                          >
                            {status === 'booked_pl4y'
                              ? 'PL4Y'
                              : status === 'booked_walkin'
                              ? 'Walk-In'
                              : status === 'blocked'
                              ? 'Locked'
                              : 'Open'}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CHECK-IN TERMINAL */}
      {venueTab === 'bookings' && (
        <div className="bg-[#181f18] border border-[#2e382e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-heading font-black text-lg text-[#f5f8f4]">
                Today's Arrival & Check-In Desk
              </h2>
              <p className="text-xs text-[#aeb4ac]">
                Validate player QR match passes and check them into their court.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {venueBookings.map(b => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-[#1e261e] border border-[#2f3c2f] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#141a14] border border-[#3b473b] flex items-center justify-center font-mono font-bold text-[#c4ff1a]">
                    {b.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-sm text-[#f5f8f4]">
                        {b.playerName}
                      </span>
                      <span className="font-mono text-[10px] text-[#c4ff1a] bg-[#141b14] px-1.5 py-0.5 rounded border border-[#2e3b2e]">
                        {b.refCode}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#aeb4ac] mt-0.5">
                      {b.courtName} · {b.durationHours}h · {b.sport.toUpperCase()} · ${b.amount}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded ${
                      b.paymentStatus === 'paid'
                        ? 'text-[#c4ff1a] bg-[#1d271d]'
                        : 'text-[#ffb703] bg-[#292212]'
                    }`}
                  >
                    {b.paymentStatus === 'paid' ? 'PAID' : 'SPLIT PENDING'}
                  </span>

                  {b.checkInStatus === 'checked_in' ? (
                    <div className="flex items-center gap-1 text-[#c4ff1a] font-bold font-mono text-xs px-3 py-1.5 rounded-lg bg-[#223022] border border-[#3b4e3b]">
                      <CheckCircle className="w-4 h-4" />
                      <span>Checked In</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => checkInBooking(b.id)}
                      className="py-1.5 px-4 rounded-lg bg-[#c4ff1a] hover:bg-[#b2eb14] text-[#162402] font-heading font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      Check In Player
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COURT CONFIGURATION */}
      {venueTab === 'courts' && (
        <div className="bg-[#181f18] border border-[#2e382e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div>
            <h2 className="font-heading font-black text-lg text-[#f5f8f4]">
              Court & Facility Management
            </h2>
            <p className="text-xs text-[#aeb4ac]">
              Configure court specs, surfaces, hourly rates, and toggle availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {venue.courts.map(c => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#1e261e] border border-[#2f3c2f] flex justify-between items-start text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-sm text-[#f5f8f4]">
                      {c.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-[#141b14] px-1.5 py-0.5 rounded text-[#c4ff1a]">
                      {c.sport}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#aeb4ac] mt-1 space-y-0.5">
                    <div>Surface: {c.surface}</div>
                    <div>Environment: {c.indoor ? 'Indoor Climate-Controlled' : 'Outdoor Skyline'}</div>
                    <div className="font-mono text-[#c4ff1a] font-bold">Rate: ${c.hourlyRate}/hr</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.active
                        ? 'bg-[#c4ff1a]/20 text-[#c4ff1a]'
                        : 'bg-[#ff5247]/20 text-[#ff5247]'
                    }`}
                  >
                    {c.active ? 'ACTIVE' : 'OFFLINE'}
                  </span>

                  <button
                    onClick={() => toggleCourtActive(venue.id, c.id)}
                    className="py-1 px-2.5 rounded-lg bg-[#273227] hover:bg-[#344234] text-[11px] text-[#aeb4ac] hover:text-[#f5f8f4] border border-[#3b493b] transition-colors"
                  >
                    {c.active ? 'Disable Court' : 'Enable Court'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS & INSIGHTS */}
      {venueTab === 'analytics' && (
        <div className="bg-[#181f18] border border-[#2e382e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div>
            <h2 className="font-heading font-black text-lg text-[#f5f8f4]">
              PL4Y Network Marketplace Analytics
            </h2>
            <p className="text-xs text-[#aeb4ac]">
              Insights into player acquisition, peak utilization hours, and community retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#1e261e] border border-[#2f3c2f] space-y-2">
              <span className="font-bold text-[#f5f8f4] block">Peak Hour Utilization</span>
              <p className="text-[#aeb4ac] text-[11px]">
                Prime demand is currently concentrated between 18:00 and 21:00 (96% occupancy).
              </p>
              <div className="space-y-1.5 pt-2">
                {[
                  { time: '17:00 - 18:00', pct: 72 },
                  { time: '18:00 - 19:00', pct: 98 },
                  { time: '19:00 - 20:00', pct: 100 },
                  { time: '20:00 - 21:00', pct: 95 },
                  { time: '21:00 - 22:00', pct: 64 },
                ].map(item => (
                  <div key={item.time} className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="w-24 text-[#7f877d]">{item.time}</span>
                    <div className="flex-1 bg-[#252f25] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#c4ff1a] h-full rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                    <span className="text-[#f5f8f4] w-8 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#1e261e] border border-[#2f3c2f] space-y-3">
              <span className="font-bold text-[#f5f8f4] block">Player Acquisition Channel</span>
              <div className="p-3 rounded-lg bg-[#141b14] border border-[#2d3a2d]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#c4ff1a] font-bold">PL4Y Multi-Sport App</span>
                  <span className="font-mono font-bold text-[#f5f8f4]">78%</span>
                </div>
                <p className="text-[10px] text-[#aeb4ac]">
                  Discovered through open pickup runs, club drop-ins & tournaments.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#141b14] border border-[#2d3a2d]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#aeb4ac] font-bold">Walk-Ins & Direct</span>
                  <span className="font-mono font-bold text-[#f5f8f4]">22%</span>
                </div>
                <p className="text-[10px] text-[#7f877d]">
                  Legacy phone or reception desk bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SLOT DETAIL & ACTION MODAL */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181e18] border border-[#343e34] rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-3 text-xs">
            <h3 className="font-heading font-bold text-base text-[#f5f8f4]">
              Slot Details: {selectedSlot.courtName}
            </h3>
            <div className="text-[11px] text-[#aeb4ac]">
              Time: <span className="font-bold text-[#f5f8f4]">{selectedSlot.time} Today</span> · Rate: ${selectedSlot.price}/hr
            </div>

            <div className="p-3 rounded-xl bg-[#1e251e] border border-[#2f392f]">
              <span className="text-[10px] text-[#7f877d] block">STATUS</span>
              <span className="font-mono font-bold text-[#c4ff1a] capitalize text-sm">
                {selectedSlot.status === 'booked_pl4y'
                  ? `Booked via PL4Y (${selectedSlot.bookedBy || 'Player'})`
                  : selectedSlot.status === 'booked_walkin'
                  ? `Booked Walk-In (${selectedSlot.bookedBy})`
                  : selectedSlot.status === 'blocked'
                  ? `Blocked: ${selectedSlot.blockReason}`
                  : 'Available for Booking'}
              </span>
            </div>

            {selectedSlot.status === 'available' && (
              <div className="space-y-2 pt-2">
                <label className="text-[10px] text-[#aeb4ac] block">Maintenance / Block Reason</label>
                <input
                  type="text"
                  value={blockReasonInput}
                  onChange={e => setBlockReasonInput(e.target.value)}
                  className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl p-2 text-xs text-[#f5f8f4]"
                />
                <button
                  onClick={() => {
                    blockSlot(venue.id, selectedSlot.id, blockReasonInput);
                    setSelectedSlot(null);
                  }}
                  className="w-full py-2 rounded-xl bg-[#ff5247]/20 hover:bg-[#ff5247]/30 text-[#ff5247] border border-[#ff5247]/40 font-bold transition-colors"
                >
                  Block This Slot
                </button>
              </div>
            )}

            {selectedSlot.status === 'blocked' && (
              <button
                onClick={() => {
                  unblockSlot(venue.id, selectedSlot.id);
                  setSelectedSlot(null);
                }}
                className="w-full py-2 rounded-xl bg-[#c4ff1a] text-[#162402] font-bold transition-colors"
              >
                Unblock Slot
              </button>
            )}

            <button
              onClick={() => setSelectedSlot(null)}
              className="w-full py-2 rounded-xl bg-[#222a22] text-[#aeb4ac] hover:text-[#f5f8f4] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* WALK-IN MODAL */}
      {isWalkInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181e18] border border-[#343e34] rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4 text-xs">
            <h3 className="font-heading font-bold text-base text-[#f5f8f4]">
              Manual Walk-In Reservation
            </h3>
            <form onSubmit={handleWalkInSubmit} className="space-y-3">
              <div>
                <label className="text-[#aeb4ac] block mb-1">Customer / Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Beckham (Walk-in)"
                  value={walkInName}
                  onChange={e => setWalkInName(e.target.value)}
                  className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl p-2.5 text-xs text-[#f5f8f4] focus:outline-none focus:border-[#c4ff1a]"
                />
              </div>

              <div>
                <label className="text-[#aeb4ac] block mb-1">Select Court</label>
                <select
                  value={walkInCourtId}
                  onChange={e => setWalkInCourtId(e.target.value)}
                  className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl p-2.5 text-xs text-[#f5f8f4]"
                >
                  {venue.courts.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (${c.hourlyRate}/hr)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#aeb4ac] block mb-1">Time Slot (Today)</label>
                <select
                  value={walkInTime}
                  onChange={e => setWalkInTime(e.target.value)}
                  className="w-full bg-[#1e251e] border border-[#2f392f] rounded-xl p-2.5 text-xs text-[#f5f8f4]"
                >
                  {hours.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-[#222a22] text-[#aeb4ac]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#c4ff1a] text-[#162402] font-bold"
                >
                  Confirm Walk-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
