import React, { createContext, useContext, useState } from 'react';
import {
  AppViewMode,
  PlayerTab,
  VenueTab,
  Sport,
  Venue,
  Game,
  PlayerProfile,
  CommunityClub,
  Tournament,
  Booking,
  TimeSlot,
} from '../types';
import {
  INITIAL_VENUES,
  INITIAL_GAMES,
  INITIAL_USER_PROFILE,
  INITIAL_CLUBS,
  INITIAL_TOURNAMENTS,
  INITIAL_BOOKINGS,
  generateInitialTimeSlots
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warn';
}

interface AppContextType {
  // Navigation & Mode
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  playerTab: PlayerTab;
  setPlayerTab: (tab: PlayerTab) => void;
  venueTab: VenueTab;
  setVenueTab: (tab: VenueTab) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;

  // Selected filters
  selectedSportFilter: Sport | 'all';
  setSelectedSportFilter: (sport: Sport | 'all') => void;

  // Venue state
  venues: Venue[];
  activeVenueId: string;
  setActiveVenueId: (id: string) => void;
  timeSlots: Record<string, TimeSlot[]>;

  // Games & Community & Tournaments
  games: Game[];
  userProfile: PlayerProfile;
  clubs: CommunityClub[];
  tournaments: Tournament[];
  bookings: Booking[];

  // Interactive Actions
  bookCourtSlot: (venueId: string, courtId: string, time: string, sport: Sport, isSplit: boolean) => Booking;
  joinGame: (gameId: string) => void;
  createGame: (game: Omit<Game, 'id' | 'currentPlayers' | 'players' | 'status'>) => void;
  checkInBooking: (bookingId: string) => void;
  blockSlot: (venueId: string, slotId: string, reason?: string) => void;
  unblockSlot: (venueId: string, slotId: string) => void;
  addManualWalkIn: (venueId: string, courtId: string, time: string, customerName: string, sport: Sport) => void;
  toggleCourtActive: (venueId: string, courtId: string) => void;
  toggleClubMembership: (clubId: string) => void;
  registerTournament: (tourneyId: string) => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'warn') => void;
  removeToast: (id: string) => void;

  // Quick modals
  bookingModalVenue: Venue | null;
  setBookingModalVenue: (venue: Venue | null) => void;
  selectedGameDetail: Game | null;
  setSelectedGameDetail: (game: Game | null) => void;
  isCreateGameOpen: boolean;
  setIsCreateGameOpen: (val: boolean) => void;
  selectedPlayerForModal: { name: string; avatar: string; rating: number; sport: Sport } | null;
  setSelectedPlayerForModal: (player: { name: string; avatar: string; rating: number; sport: Sport } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<AppViewMode>('player');
  const [playerTab, setPlayerTab] = useState<PlayerTab>('explore');
  const [venueTab, setVenueTab] = useState<VenueTab>('schedule');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [selectedSportFilter, setSelectedSportFilter] = useState<Sport | 'all'>('all');

  const [venues, setVenues] = useState<Venue[]>(INITIAL_VENUES);
  const [activeVenueId, setActiveVenueId] = useState<string>('apex-padel');
  const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlot[]>>(generateInitialTimeSlots);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [userProfile, setUserProfile] = useState<PlayerProfile>(INITIAL_USER_PROFILE);
  const [clubs, setClubs] = useState<CommunityClub[]>(INITIAL_CLUBS);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [bookingModalVenue, setBookingModalVenue] = useState<Venue | null>(null);
  const [selectedGameDetail, setSelectedGameDetail] = useState<Game | null>(null);
  const [isCreateGameOpen, setIsCreateGameOpen] = useState<boolean>(false);
  const [selectedPlayerForModal, setSelectedPlayerForModal] = useState<{ name: string; avatar: string; rating: number; sport: Sport } | null>(null);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'warn' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // BOOK A COURT SLOT (from Player App)
  const bookCourtSlot = (venueId: string, courtId: string, time: string, sport: Sport, isSplit: boolean): Booking => {
    const venue = venues.find(v => v.id === venueId);
    const court = venue?.courts.find(c => c.id === courtId);
    const courtName = court ? court.name : 'Court';
    const amount = court ? court.hourlyRate : 40;
    const refCode = `PL4Y-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      refCode,
      venueId,
      venueName: venue?.name || 'PL4Y Partner Venue',
      courtId,
      courtName,
      sport,
      date: 'Today',
      time,
      durationHours: 1,
      playerName: userProfile.name,
      playerAvatar: userProfile.avatar,
      amount,
      paymentStatus: isSplit ? 'split_pending' : 'paid',
      checkInStatus: 'pending',
      source: 'pl4y_app'
    };

    // Update time slots
    setTimeSlots(prev => {
      const currentVenueSlots = prev[venueId] || [];
      const updated = currentVenueSlots.map(slot => {
        if (slot.courtId === courtId && slot.time === time) {
          return {
            ...slot,
            status: 'booked_pl4y' as const,
            bookedBy: `${userProfile.name} (PL4Y Booking)`
          };
        }
        return slot;
      });
      return { ...prev, [venueId]: updated };
    });

    // Add to bookings list
    setBookings(prev => [newBooking, ...prev]);

    // Update user stats
    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        hoursOnCourt: prev.stats.hoursOnCourt + 1,
        totalMatches: prev.stats.totalMatches + 1
      }
    }));

    addToast(
      'Court Reserved!',
      `${courtName} at ${venue?.name} booked for ${time}. Reference: ${refCode}`,
      'success'
    );

    return newBooking;
  };

  // JOIN OPEN RUN / GAME
  const joinGame = (gameId: string) => {
    setGames(prev =>
      prev.map(g => {
        if (g.id === gameId) {
          if (g.currentPlayers >= g.maxPlayers) return g;
          const alreadyIn = g.players.some(p => p.id === userProfile.id);
          if (alreadyIn) return g;

          const updatedPlayers = [
            ...g.players,
            {
              id: userProfile.id,
              name: userProfile.name,
              avatar: userProfile.avatar,
              rating: 3.8
            }
          ];

          return {
            ...g,
            currentPlayers: updatedPlayers.length,
            players: updatedPlayers,
            status: updatedPlayers.length >= g.maxPlayers ? 'full' : 'open'
          };
        }
        return g;
      })
    );

    addToast(
      'Spot Confirmed!',
      "You've joined the game roster. Directions & game chat are now active.",
      'success'
    );
  };

  // CREATE NEW GAME
  const createGame = (gameData: Omit<Game, 'id' | 'currentPlayers' | 'players' | 'status'>) => {
    const newGameId = `game-${Date.now()}`;
    const newGame: Game = {
      ...gameData,
      id: newGameId,
      currentPlayers: 1,
      status: 'open',
      players: [
        {
          id: userProfile.id,
          name: `${userProfile.name} (Host)`,
          avatar: userProfile.avatar,
          rating: 3.8,
          isHost: true
        }
      ]
    };

    setGames(prev => [newGame, ...prev]);

    // Reserve slot at the venue if exists
    if (gameData.venueId) {
      setTimeSlots(prev => {
        const venueSlots = prev[gameData.venueId] || [];
        const updated = venueSlots.map(slot => {
          if (slot.time === gameData.time) {
            return {
              ...slot,
              status: 'booked_pl4y' as const,
              bookedBy: `${userProfile.name} (Hosted Run)`,
              gameId: newGameId
            };
          }
          return slot;
        });
        return { ...prev, [gameData.venueId]: updated };
      });
    }

    addToast(
      'Run Published!',
      `Your ${gameData.sport.toUpperCase()} game is now discoverable by players nearby.`,
      'success'
    );
  };

  // VENUE: CHECK IN BOOKING
  const checkInBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, checkInStatus: 'checked_in' } : b))
    );
    addToast('Player Checked In', 'Pass validated. Court lights & access token verified.', 'info');
  };

  // VENUE: BLOCK SLOT
  const blockSlot = (venueId: string, slotId: string, reason = 'Facility Maintenance / Coaching') => {
    setTimeSlots(prev => {
      const vSlots = prev[venueId] || [];
      const updated = vSlots.map(s => (s.id === slotId ? { ...s, status: 'blocked' as const, blockReason: reason } : s));
      return { ...prev, [venueId]: updated };
    });
    addToast('Slot Blocked', `Court slot locked: ${reason}`, 'warn');
  };

  // VENUE: UNBLOCK SLOT
  const unblockSlot = (venueId: string, slotId: string) => {
    setTimeSlots(prev => {
      const vSlots = prev[venueId] || [];
      const updated = vSlots.map(s => (s.id === slotId ? { ...s, status: 'available' as const, blockReason: undefined } : s));
      return { ...prev, [venueId]: updated };
    });
    addToast('Slot Reopened', 'Court slot is now open for player reservations.', 'info');
  };

  // VENUE: ADD MANUAL WALK-IN
  const addManualWalkIn = (venueId: string, courtId: string, time: string, customerName: string, sport: Sport) => {
    const venue = venues.find(v => v.id === venueId);
    const court = venue?.courts.find(c => c.id === courtId);
    const courtName = court?.name || 'Court';
    const amount = court?.hourlyRate || 40;

    const newBooking: Booking = {
      id: `walkin-${Date.now()}`,
      refCode: `WALK-${Math.floor(1000 + Math.random() * 9000)}`,
      venueId,
      venueName: venue?.name || 'Apex Padel Arena',
      courtId,
      courtName,
      sport,
      date: 'Today',
      time,
      durationHours: 1,
      playerName: `${customerName} (Walk-In)`,
      amount,
      paymentStatus: 'paid',
      checkInStatus: 'checked_in',
      source: 'walk_in'
    };

    setBookings(prev => [newBooking, ...prev]);

    setTimeSlots(prev => {
      const vSlots = prev[venueId] || [];
      const updated = vSlots.map(s => {
        if (s.courtId === courtId && s.time === time) {
          return {
            ...s,
            status: 'booked_walkin' as const,
            bookedBy: `${customerName} (Walk-In)`
          };
        }
        return s;
      });
      return { ...prev, [venueId]: updated };
    });

    addToast('Walk-In Booked', `Logged ${customerName} onto ${courtName} at ${time}.`, 'success');
  };

  // TOGGLE COURT ACTIVE STATUS
  const toggleCourtActive = (venueId: string, courtId: string) => {
    setVenues(prev =>
      prev.map(v => {
        if (v.id === venueId) {
          return {
            ...v,
            courts: v.courts.map(c => (c.id === courtId ? { ...c, active: !c.active } : c))
          };
        }
        return v;
      })
    );
    addToast('Court Configuration Updated', 'Availability updated in real-time.', 'info');
  };

  // TOGGLE CLUB MEMBERSHIP
  const toggleClubMembership = (clubId: string) => {
    setClubs(prev =>
      prev.map(c => {
        if (c.id === clubId) {
          const nextState = !c.isJoined;
          addToast(
            nextState ? `Joined ${c.name}` : `Left ${c.name}`,
            nextState ? 'You will receive game notifications for this community.' : 'You have unsubscribed from this club.',
            'info'
          );
          return {
            ...c,
            isJoined: nextState,
            membersCount: nextState ? c.membersCount + 1 : c.membersCount - 1
          };
        }
        return c;
      })
    );
  };

  // REGISTER TOURNAMENT
  const registerTournament = (tourneyId: string) => {
    setTournaments(prev =>
      prev.map(t => {
        if (t.id === tourneyId) {
          addToast(
            'Founding Registration Confirmed',
            `You are registered for ${t.title}. Seed confirmation sent to your PL4Y passport.`,
            'success'
          );
          return { ...t, isRegistered: true, teamsCount: t.teamsCount + 1 };
        }
        return t;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        playerTab,
        setPlayerTab,
        venueTab,
        setVenueTab,
        isMobileFrame,
        setIsMobileFrame,
        selectedSportFilter,
        setSelectedSportFilter,
        venues,
        activeVenueId,
        setActiveVenueId,
        timeSlots,
        games,
        userProfile,
        clubs,
        tournaments,
        bookings,
        bookCourtSlot,
        joinGame,
        createGame,
        checkInBooking,
        blockSlot,
        unblockSlot,
        addManualWalkIn,
        toggleCourtActive,
        toggleClubMembership,
        registerTournament,
        toasts,
        addToast,
        removeToast,
        bookingModalVenue,
        setBookingModalVenue,
        selectedGameDetail,
        setSelectedGameDetail,
        isCreateGameOpen,
        setIsCreateGameOpen,
        selectedPlayerForModal,
        setSelectedPlayerForModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
