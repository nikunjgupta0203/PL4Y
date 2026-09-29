export type Sport = 'padel' | 'football' | 'pickleball' | 'basketball' | 'tennis' | 'badminton';

export interface Court {
  id: string;
  name: string;
  sport: Sport;
  surface: string;
  indoor: boolean;
  hourlyRate: number;
  active: boolean;
}

export type SlotStatus = 'available' | 'booked_pl4y' | 'booked_walkin' | 'blocked';

export interface TimeSlot {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  price: number;
  status: SlotStatus;
  bookedBy?: string;
  bookedUserId?: string;
  blockReason?: string;
  gameId?: string;
}

export interface Venue {
  id: string;
  name: string;
  tagline: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  sports: Sport[];
  image: string;
  amenities: string[];
  courts: Court[];
  openHours: string;
  featured: boolean;
}

export interface GamePlayer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  isHost?: boolean;
}

export interface Game {
  id: string;
  title: string;
  sport: Sport;
  venueId: string;
  venueName: string;
  courtName: string;
  date: string;
  time: string;
  durationMinutes: number;
  maxPlayers: number;
  currentPlayers: number;
  players: GamePlayer[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  format: string;
  costPerPlayer: number;
  status: 'open' | 'full' | 'in_progress' | 'completed';
  notes?: string;
}

export interface SportRating {
  sport: Sport;
  rating: number;
  tier: string;
  matches: number;
  winRate: number;
}

export interface PlayerStats {
  totalMatches: number;
  hoursOnCourt: number;
  winRate: number;
  venuesVisited: number;
  fairPlayScore: number;
  streak: number;
}

export interface PassportBadge {
  id: string;
  name: string;
  desc: string;
  iconName: string;
  unlockedAt: string;
}

export interface MatchHistoryItem {
  id: string;
  sport: Sport;
  date: string;
  venueName: string;
  result: 'W' | 'L';
  score: string;
  partner?: string;
  opponents: string;
  ratingDelta: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  username: string;
  foundingNumber: number;
  avatar: string;
  location: string;
  bio: string;
  memberSince: string;
  ratings: SportRating[];
  stats: PlayerStats;
  badges: PassportBadge[];
  matchHistory: MatchHistoryItem[];
  preferredHand: string;
  preferredSide: string;
}

export interface CommunityClub {
  id: string;
  name: string;
  sport: Sport;
  membersCount: number;
  location: string;
  description: string;
  weeklyRuns: string;
  logo: string;
  isJoined: boolean;
  activePlayersToday: number;
}

export interface Tournament {
  id: string;
  title: string;
  sport: Sport;
  date: string;
  venue: string;
  teamsCount: number;
  maxTeams: number;
  prize: string;
  status: 'registering' | 'full' | 'live';
  foundingPerk: string;
  format: string;
  entryFee: string;
  isRegistered?: boolean;
}

export interface Booking {
  id: string;
  refCode: string;
  venueId: string;
  venueName: string;
  courtId: string;
  courtName: string;
  sport: Sport;
  date: string;
  time: string;
  durationHours: number;
  playerName: string;
  playerAvatar?: string;
  amount: number;
  paymentStatus: 'paid' | 'split_pending';
  checkInStatus: 'pending' | 'checked_in';
  source: 'pl4y_app' | 'walk_in';
}

export type AppViewMode = 'player' | 'venue';
export type PlayerTab = 'explore' | 'games' | 'community' | 'competitions' | 'passport';
export type VenueTab = 'schedule' | 'bookings' | 'courts' | 'analytics';
