import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Venue, Sport, TimeSlot } from '../../../types';
import { X, Clock, MapPin, CheckCircle, QrCode, Users, CreditCard } from 'lucide-react';

export const CourtBookingModal: React.FC = () => {
  const {
    bookingModalVenue,
    setBookingModalVenue,
    timeSlots,
    bookCourtSlot,
    setActiveVenueId,
    setViewMode,
    setVenueTab
  } = useApp();

  const venue = bookingModalVenue;
  const [selectedCourtId, setSelectedCourtId] = useState<string>(venue?.courts[0]?.id || '');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [splitPayment, setSplitPayment] = useState<boolean>(true);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  if (!venue) return null;

  const currentCourt = venue.courts.find(c => c.id === selectedCourtId) || venue.courts[0];
  const venueSlots: TimeSlot[] = timeSlots[venue.id] || [];
  const courtSlots = venueSlots.filter(s => s.courtId === currentCourt?.id);

  const handleBooking = () => {
    if (!selectedTime || !currentCourt) return;
    const booking = bookCourtSlot(
      venue.id,
      currentCourt.id,
      selectedTime,
      currentCourt.sport,
      splitPayment
    );
    setBookingSuccess(booking);
  };

  const handleClose = () => {
    setBookingModalVenue(null);
    setBookingSuccess(null);
    setSelectedTime('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#181e18] border border-[#343e34] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col text-[#f5f8f4]">
        {/* Header */}
        <div className="sticky top-0 bg-[#181e18]/95 backdrop-blur-md px-5 py-4 border-b border-[#2d362d] flex items-center justify-between z-10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#c4ff1a]">
              Reserve Court Slot
            </span>
            <h3 className="font-heading font-extrabold text-lg text-[#f5f8f4]">
              {venue.name}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-[#222a22] text-[#aeb4ac] hover:text-[#f5f8f4] hover:bg-[#2b352b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {bookingSuccess ? (
          <div className="p-6 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#c4ff1a]/15 text-[#c4ff1a] flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-heading text-xl font-black text-[#f5f8f4]">
              Court Reserved!
            </h4>
            <p className="text-xs text-[#aeb4ac] mt-1 max-w-xs">
              Your match slot is locked in. Show this digital pass or reference upon venue arrival.
            </p>

            {/* Digital Pass Card */}
            <div className="w-full bg-[#1e251e] border border-[#3b473b] rounded-xl p-4 my-5 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c4ff1a]/5 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-mono text-[#aeb4ac]">MATCH PASS</div>
                  <div className="font-heading font-black text-lg text-[#c4ff1a] tracking-tight">
                    {bookingSuccess.refCode}
                  </div>
                </div>
                <div className="p-2 bg-white rounded-lg">
                  <QrCode className="w-8 h-8 text-black" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2f392f] grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#7f877d] block text-[10px]">COURT</span>
                  <span className="font-bold text-[#f5f8f4]">{bookingSuccess.courtName}</span>
                </div>
                <div>
                  <span className="text-[#7f877d] block text-[10px]">TIME</span>
                  <span className="font-bold text-[#f5f8f4]">Today · {bookingSuccess.time}</span>
                </div>
                <div>
                  <span className="text-[#7f877d] block text-[10px]">SPORT</span>
                  <span className="font-bold capitalize text-[#f5f8f4]">{bookingSuccess.sport}</span>
                </div>
                <div>
                  <span className="text-[#7f877d] block text-[10px]">PAYMENT</span>
                  <span className="font-bold text-[#c4ff1a]">
                    {bookingSuccess.paymentStatus === 'split_pending'
                      ? `$${bookingSuccess.amount / 4} (Split 4-ways)`
                      : `$${bookingSuccess.amount} (Paid)`}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full">
              <button
                onClick={() => {
                  handleClose();
                  setActiveVenueId(venue.id);
                  setVenueTab('schedule');
                  setViewMode('venue');
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#222922] hover:bg-[#2c362c] text-xs font-semibold text-[#aeb4ac] hover:text-[#f5f8f4] border border-[#3b473b] transition-colors"
              >
                Inspect in Venue Timetable ↗
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#c4ff1a] hover:bg-[#b2eb14] text-xs font-bold text-[#162402] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {/* Step 1: Select Court */}
            <div>
              <label className="text-xs font-semibold text-[#aeb4ac] block mb-2">
                1. Select Court / Pitch
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {venue.courts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCourtId(c.id);
                      setSelectedTime('');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCourtId === c.id
                        ? 'bg-[#222a22] border-[#c4ff1a] ring-1 ring-[#c4ff1a]'
                        : 'bg-[#1b221b] border-[#2f382f] hover:border-[#414d41]'
                    }`}
                  >
                    <div className="font-heading font-bold text-sm text-[#f5f8f4] flex justify-between">
                      <span>{c.name}</span>
                    </div>
                    <div className="text-[11px] text-[#aeb4ac] mt-1 flex items-center gap-1.5">
                      <span>{c.surface}</span>
                      <span>·</span>
                      <span>{c.indoor ? 'Indoor' : 'Outdoor'}</span>
                      <span>·</span>
                      <span className="font-mono text-[#c4ff1a] font-bold">${c.hourlyRate}/h</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Slot */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#aeb4ac]">
                  2. Select Time Slot (Today)
                </label>
                <span className="text-[11px] text-[#7f877d]">60 min match</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {courtSlots.map(slot => {
                  const isAvailable = slot.status === 'available';
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.id}
                      disabled={!isAvailable}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-1 rounded-xl text-center border font-mono transition-all ${
                        isSelected
                          ? 'bg-[#c4ff1a] text-[#162402] border-[#c4ff1a] font-bold shadow-md'
                          : isAvailable
                          ? 'bg-[#1b221b] text-[#f5f8f4] border-[#2f382f] hover:border-[#c4ff1a]'
                          : slot.status === 'blocked'
                          ? 'bg-[#201818] text-[#ff5247]/60 border-[#382020] cursor-not-allowed opacity-60'
                          : 'bg-[#161a16] text-[#7f877d] border-[#262c26] cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="text-xs font-bold">{slot.time}</div>
                      <div className="text-[10px]">
                        {isAvailable ? `$${slot.price}` : slot.status === 'blocked' ? 'Maintenance' : 'Booked'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Payment Split */}
            <div className="bg-[#1b221b] border border-[#2f382f] rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#c4ff1a]" />
                <div>
                  <div className="text-xs font-bold text-[#f5f8f4]">PL4Y Split Pay</div>
                  <div className="text-[11px] text-[#aeb4ac]">
                    Invite 3 players to pay their share ($
                    {currentCourt ? Math.round(currentCourt.hourlyRate / 4) : 10} each)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSplitPayment(!splitPayment)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  splitPayment ? 'bg-[#c4ff1a]' : 'bg-[#2f382f]'
                }`}
              >
                <div
                  className={`bg-[#121612] w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    splitPayment ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Summary & Reserve Button */}
            <div className="pt-2 border-t border-[#2d362d] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#7f877d] uppercase tracking-wider block">Total</span>
                <span className="font-heading font-black text-xl text-[#f5f8f4]">
                  {splitPayment
                    ? `$${currentCourt ? Math.round(currentCourt.hourlyRate / 4) : 12}`
                    : `$${currentCourt?.hourlyRate || 48}`}
                </span>
                {splitPayment && <span className="text-[10px] text-[#aeb4ac] ml-1">/ your share</span>}
              </div>

              <button
                disabled={!selectedTime}
                onClick={handleBooking}
                className={`py-3 px-6 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition-all ${
                  selectedTime
                    ? 'bg-[#c4ff1a] hover:bg-[#b5f012] text-[#162402] shadow-lg shadow-[#c4ff1a]/20 cursor-pointer'
                    : 'bg-[#232b23] text-[#7f877d] cursor-not-allowed'
                }`}
              >
                Confirm Court
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
