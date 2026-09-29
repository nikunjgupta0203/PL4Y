import { Venue, Game, PlayerProfile, CommunityClub, Tournament, Booking, TimeSlot } from '../types';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'apex-padel',
    name: 'Apex Padel Arena',
    tagline: 'Premier panoramic glass courts & player lounge',
    location: 'Central Sports Quarter, London',
    distance: '1.2 km away',
    rating: 4.9,
    reviewCount: 380,
    sports: ['padel', 'pickleball'],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Pro Court Surface', 'Equipment Rental', 'Showers & Lockers', 'Player Lounge', 'Bar & Cafe', 'Free Parking'],
    openHours: '07:00 - 23:00',
    featured: true,
    courts: [
      { id: 'c1', name: 'Court 1 (Centre Glass Court)', sport: 'padel', surface: 'Mondo Supercourt XN', indoor: true, hourlyRate: 48, active: true },
      { id: 'c2', name: 'Court 2 (Panoramica Indoor)', sport: 'padel', surface: 'Mondo Supercourt XN', indoor: true, hourlyRate: 44, active: true },
      { id: 'c3', name: 'Court 3 (Outdoor Skyline)', sport: 'padel', surface: 'Pro Turf Glass', indoor: false, hourlyRate: 36, active: true },
      { id: 'c4', name: 'Court 4 (Pickleball Multi)', sport: 'pickleball', surface: 'Cushioned Acrylic', indoor: true, hourlyRate: 32, active: true },
    ]
  },
  {
    id: 'urban-fives',
    name: 'Urban Fives Turf & Courts',
    tagline: 'Next-gen 4G shockpad pitches & streetball cages',
    location: 'Eastside Industrial Basin',
    distance: '2.8 km away',
    rating: 4.8,
    reviewCount: 512,
    sports: ['football', 'basketball'],
    image: 'https://images.unsplash.com/photo-1529900241451-b857943615b9?auto=format&fit=crop&w=1000&q=80',
    amenities: ['4G Shockpad Turf', 'Night Floodlights', 'Referees on Call', 'Video Replay Cam', 'Sports Bar'],
    openHours: '08:00 - 23:30',
    featured: true,
    courts: [
      { id: 'u1', name: 'Pitch 1 (4G Arena Roofed)', sport: 'football', surface: '4G Hybrid Turf', indoor: true, hourlyRate: 75, active: true },
      { id: 'u2', name: 'Pitch 2 (Open Air Floodlit)', sport: 'football', surface: '4G Hybrid Turf', indoor: false, hourlyRate: 65, active: true },
      { id: 'u3', name: 'Pitch 3 (Sprint 5s)', sport: 'football', surface: '4G Hybrid Turf', indoor: false, hourlyRate: 60, active: true },
      { id: 'u4', name: 'Hoops Cage A (Glassboard 3v3)', sport: 'basketball', surface: 'Polyurethane Court', indoor: true, hourlyRate: 40, active: true },
    ]
  },
  {
    id: 'vanguard-hub',
    name: 'Vanguard Pickleball & Padel',
    tagline: 'High-speed dedicated racket sports complex',
    location: 'Northside Athletic Park',
    distance: '3.6 km away',
    rating: 4.9,
    reviewCount: 220,
    sports: ['pickleball', 'padel', 'badminton'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    amenities: ['6 Pickleball Courts', 'Coaching Academy', 'Ball Machine Rentals', 'Recovery Saunas'],
    openHours: '06:30 - 22:30',
    featured: false,
    courts: [
      { id: 'v1', name: 'PB Court 1 (Tour Spec)', sport: 'pickleball', surface: 'Cushion Plus', indoor: true, hourlyRate: 28, active: true },
      { id: 'v2', name: 'PB Court 2 (Dink Arena)', sport: 'pickleball', surface: 'Cushion Plus', indoor: true, hourlyRate: 28, active: true },
      { id: 'v3', name: 'Padel Glass 1', sport: 'padel', surface: 'Mondo Turf', indoor: true, hourlyRate: 42, active: true },
      { id: 'v4', name: 'Badminton Hall A', sport: 'badminton', surface: 'Taraflex Wood', indoor: true, hourlyRate: 26, active: true },
    ]
  },
  {
    id: 'baseline-tennis',
    name: 'The Baseline Tennis Hub',
    tagline: 'Historic club with tour-grade red clay and hard courts',
    location: 'Parkside Green Reserve',
    distance: '4.5 km away',
    rating: 4.7,
    reviewCount: 195,
    sports: ['tennis'],
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Championship Clay', 'Stringing Service', 'Ball Boys for Tourneys', 'Clubhouse Terrace'],
    openHours: '07:00 - 22:00',
    featured: false,
    courts: [
      { id: 'b1', name: 'Clay Court 1 (Stadium)', sport: 'tennis', surface: 'European Red Clay', indoor: false, hourlyRate: 50, active: true },
      { id: 'b2', name: 'Clay Court 2', sport: 'tennis', surface: 'European Red Clay', indoor: false, hourlyRate: 45, active: true },
      { id: 'b3', name: 'Hard Court 1 (DecoTurf)', sport: 'tennis', surface: 'Acrylic Hard', indoor: true, hourlyRate: 40, active: true },
    ]
  }
];

export const INITIAL_GAMES: Game[] = [
  {
    id: 'game-1',
    title: 'Tuesday Sunset Padel (3.5+ Match)',
    sport: 'padel',
    venueId: 'apex-padel',
    venueName: 'Apex Padel Arena',
    courtName: 'Court 1 (Centre Glass Court)',
    date: 'Today',
    time: '19:00',
    durationMinutes: 90,
    maxPlayers: 4,
    currentPlayers: 3,
    players: [
      { id: 'p1', name: 'Alex Mercer (You)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', rating: 3.8, isHost: true },
      { id: 'p2', name: 'Marcus Sterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', rating: 3.6 },
      { id: 'p3', name: 'Elena Ramos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', rating: 3.9 },
    ],
    level: 'Intermediate',
    format: 'Competitive Doubles',
    costPerPlayer: 12,
    status: 'open',
    notes: 'Fast paced, competitive but friendly vibes. Balls provided. 1 player needed!'
  },
  {
    id: 'game-2',
    title: 'Eastside 5v5 High-Intensity Pickup',
    sport: 'football',
    venueId: 'urban-fives',
    venueName: 'Urban Fives Turf & Courts',
    courtName: 'Pitch 1 (4G Arena Roofed)',
    date: 'Today',
    time: '20:30',
    durationMinutes: 60,
    maxPlayers: 10,
    currentPlayers: 9,
    players: [
      { id: 'p4', name: 'Tariq Al-Mansoor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', rating: 4.4, isHost: true },
      { id: 'p5', name: 'Leo Chen', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80', rating: 4.1 },
      { id: 'p6', name: 'Jordan Hayes', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', rating: 4.2 },
      { id: 'p7', name: 'Mateo Rossi', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', rating: 4.0 },
      { id: 'p8', name: 'Kavita Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', rating: 4.3 },
      { id: 'p9', name: 'Sammy Brooks', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', rating: 3.9 },
      { id: 'p10', name: 'Vikram Joshi', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', rating: 4.2 },
      { id: 'p11', name: 'Lucas Silva', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80', rating: 4.5 },
      { id: 'p12', name: 'David Ward', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80', rating: 3.8 },
    ],
    level: 'Advanced',
    format: '5v5 Pick-up',
    costPerPlayer: 7.5,
    status: 'open',
    notes: 'Keeper rotates every 10 min. Black shirts vs White shirts.'
  },
  {
    id: 'game-3',
    title: 'Vanguard Pickleball Social Scramble',
    sport: 'pickleball',
    venueId: 'vanguard-hub',
    venueName: 'Vanguard Pickleball & Padel',
    courtName: 'PB Court 1 (Tour Spec)',
    date: 'Tomorrow',
    time: '18:00',
    durationMinutes: 90,
    maxPlayers: 8,
    currentPlayers: 6,
    players: [
      { id: 'p13', name: 'Chloe Vance', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', rating: 3.5, isHost: true },
      { id: 'p14', name: 'Noah Green', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', rating: 3.2 },
      { id: 'p15', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80', rating: 3.4 },
      { id: 'p16', name: 'Liam O’Connor', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80', rating: 3.6 },
      { id: 'p17', name: 'Zoe Becker', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=80', rating: 3.3 },
      { id: 'p18', name: 'Finn Walker', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80', rating: 3.5 },
    ],
    level: 'Intermediate',
    format: 'King of Court Rotations',
    costPerPlayer: 6,
    status: 'open',
    notes: '2 courts reserved. Rotate partners every 11 points. All intermediate players welcome.'
  },
  {
    id: 'game-4',
    title: 'Saturday Morning Clay Tennis Singles',
    sport: 'tennis',
    venueId: 'baseline-tennis',
    venueName: 'The Baseline Tennis Hub',
    courtName: 'Clay Court 1 (Stadium)',
    date: 'Saturday',
    time: '09:00',
    durationMinutes: 120,
    maxPlayers: 2,
    currentPlayers: 1,
    players: [
      { id: 'p19', name: 'Julian Thorne', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80', rating: 4.0, isHost: true },
    ],
    level: 'Advanced',
    format: 'Best of 3 Sets Singles',
    costPerPlayer: 25,
    status: 'open',
    notes: 'Looking for a solid 3.8 - 4.5 hitting partner for full match play.'
  }
];

export const INITIAL_USER_PROFILE: PlayerProfile = {
  id: 'alex-0412',
  name: 'Alex Mercer',
  username: 'alex_pl4y',
  foundingNumber: 412,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  location: 'London, UK',
  bio: 'Multi-sport player. Obsessed with high-tempo padel points and Friday night 5-a-side. Always down for competitive runs.',
  memberSince: 'March 2026',
  preferredHand: 'Right-handed',
  preferredSide: 'Left / Aggressive Drive',
  ratings: [
    { sport: 'padel', rating: 3.8, tier: 'Intermediate Tier III', matches: 38, winRate: 71 },
    { sport: 'football', rating: 4.2, tier: 'Division II Playmaker', matches: 26, winRate: 65 },
    { sport: 'pickleball', rating: 3.4, tier: 'Intermediate All-Court', matches: 14, winRate: 64 },
    { sport: 'tennis', rating: 3.1, tier: 'Club Competitor', matches: 8, winRate: 50 },
  ],
  stats: {
    totalMatches: 86,
    hoursOnCourt: 114,
    winRate: 67,
    venuesVisited: 14,
    fairPlayScore: 4.95,
    streak: 4
  },
  badges: [
    { id: 'b-founding', name: 'Founding Player #0412', desc: 'Registered before public rollout. Lifetime priority access.', iconName: 'ShieldCheck', unlockedAt: 'March 2026' },
    { id: 'b-multisport', name: 'Multi-Sport Dynamo', desc: 'Active in 4+ sports with verified matches on PL4Y.', iconName: 'Flame', unlockedAt: 'March 2026' },
    { id: 'b-streak', name: '4-Match Win Streak', desc: 'Won 4 consecutive ranked matches across Padel and Football.', iconName: 'TrendingUp', unlockedAt: 'Last week' },
    { id: 'b-fairplay', name: 'Pristine Conduct', desc: '100% positive opponent ratings for sportsmanship & punctuality.', iconName: 'HeartHandshake', unlockedAt: 'This month' },
  ],
  matchHistory: [
    { id: 'm1', sport: 'padel', date: 'Yesterday', venueName: 'Apex Padel Arena', result: 'W', score: '6-4, 7-5', partner: 'Marcus S.', opponents: 'Chen & Ward', ratingDelta: '+0.08' },
    { id: 'm2', sport: 'football', date: '3 days ago', venueName: 'Urban Fives Turf', result: 'W', score: '7 - 4', opponents: 'Northside FC', ratingDelta: '+0.12' },
    { id: 'm3', sport: 'padel', date: '5 days ago', venueName: 'Apex Padel Arena', result: 'L', score: '4-6, 5-7', partner: 'Elena R.', opponents: 'Diaz & Vega', ratingDelta: '-0.05' },
    { id: 'm4', sport: 'pickleball', date: '1 week ago', venueName: 'Vanguard Hub', result: 'W', score: '11-8, 11-9', opponents: 'Liam & Zoe', ratingDelta: '+0.06' },
  ]
};

export const INITIAL_CLUBS: CommunityClub[] = [
  {
    id: 'club-1',
    name: 'Apex Padel Collective',
    sport: 'padel',
    membersCount: 284,
    location: 'Central Sports Quarter',
    description: 'The heartbeat of evening competitive padel in London. Weekly Tuesday runs, Friday King of Courts, and monthly ladders.',
    weeklyRuns: 'Tue & Thu 19:00, Sat 10:00',
    logo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=200&q=80',
    isJoined: true,
    activePlayersToday: 18
  },
  {
    id: 'club-2',
    name: 'Eastside Fives Underground',
    sport: 'football',
    membersCount: 412,
    location: 'Eastside Basin',
    description: 'No referees, high intensity, pure football. Weekly pickup rotations and seasonal squad tournaments.',
    weeklyRuns: 'Mon, Wed, Fri 20:30',
    logo: 'https://images.unsplash.com/photo-1529900241451-b857943615b9?auto=format&fit=crop&w=200&q=80',
    isJoined: true,
    activePlayersToday: 24
  },
  {
    id: 'club-3',
    name: 'Dink & Drive Pickleball Crew',
    sport: 'pickleball',
    membersCount: 168,
    location: 'Northside Athletic Park',
    description: 'Fast hands, good music, great dinks. Social drop-ins and tournament drills for all skill ranges.',
    weeklyRuns: 'Wed 18:30, Sun 11:00',
    logo: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=200&q=80',
    isJoined: false,
    activePlayersToday: 12
  }
];

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 'tourney-1',
    title: 'PL4Y Metro Padel Open 2026',
    sport: 'padel',
    date: 'Oct 17 - 19, 2026',
    venue: 'Apex Padel Arena',
    teamsCount: 28,
    maxTeams: 32,
    prize: '$3,500 + Custom Gear Kit',
    status: 'registering',
    foundingPerk: 'Founding Players receive guaranteed seed & free warm-up court',
    format: 'Group Stage + Gold/Silver Double Elimination',
    entryFee: '$60 / team',
    isRegistered: true
  },
  {
    id: 'tourney-2',
    title: 'Founders 5v5 Turf Series',
    sport: 'football',
    date: 'Nov 07 - 08, 2026',
    venue: 'Urban Fives Turf & Courts',
    teamsCount: 14,
    maxTeams: 16,
    prize: '$2,000 + PL4Y Shield',
    status: 'registering',
    foundingPerk: 'Priority squad registration 48h before general public',
    format: 'World Cup Style (4 groups of 4)',
    entryFee: '$120 / squad',
    isRegistered: false
  },
  {
    id: 'tourney-3',
    title: 'The Autumn Dink Scramble',
    sport: 'pickleball',
    date: 'Nov 21, 2026',
    venue: 'Vanguard Pickleball & Padel',
    teamsCount: 24,
    maxTeams: 24,
    prize: 'Pro Carbon Paddles + $1,000',
    status: 'full',
    foundingPerk: 'Waitlist priority #1',
    format: 'Round Robin Scramble',
    entryFee: '$35 / player',
    isRegistered: false
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-9021',
    refCode: 'PL4Y-7821',
    venueId: 'apex-padel',
    venueName: 'Apex Padel Arena',
    courtId: 'c1',
    courtName: 'Court 1 (Centre Glass Court)',
    sport: 'padel',
    date: 'Today',
    time: '19:00',
    durationHours: 1.5,
    playerName: 'Alex Mercer',
    playerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    amount: 72,
    paymentStatus: 'paid',
    checkInStatus: 'pending',
    source: 'pl4y_app'
  },
  {
    id: 'b-9022',
    refCode: 'PL4Y-4419',
    venueId: 'urban-fives',
    venueName: 'Urban Fives Turf & Courts',
    courtId: 'u1',
    courtName: 'Pitch 1 (4G Arena Roofed)',
    sport: 'football',
    date: 'Today',
    time: '20:30',
    durationHours: 1,
    playerName: 'Tariq Al-Mansoor',
    playerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    amount: 75,
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    source: 'pl4y_app'
  },
  {
    id: 'b-9023',
    refCode: 'WALK-1082',
    venueId: 'apex-padel',
    venueName: 'Apex Padel Arena',
    courtId: 'c2',
    courtName: 'Court 2 (Panoramica Indoor)',
    sport: 'padel',
    date: 'Today',
    time: '17:00',
    durationHours: 1,
    playerName: 'Sebastian Vance (Walk-In)',
    amount: 44,
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    source: 'walk_in'
  },
  {
    id: 'b-9024',
    refCode: 'PL4Y-5520',
    venueId: 'apex-padel',
    venueName: 'Apex Padel Arena',
    courtId: 'c2',
    courtName: 'Court 2 (Panoramica Indoor)',
    sport: 'padel',
    date: 'Today',
    time: '20:00',
    durationHours: 1,
    playerName: 'Jessica Taylor',
    playerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    amount: 44,
    paymentStatus: 'paid',
    checkInStatus: 'pending',
    source: 'pl4y_app'
  }
];

export function generateInitialTimeSlots(): Record<string, TimeSlot[]> {
  const slots: Record<string, TimeSlot[]> = {};
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  
  INITIAL_VENUES.forEach(venue => {
    const venueSlots: TimeSlot[] = [];
    venue.courts.forEach(court => {
      hours.forEach(time => {
        let status: 'available' | 'booked_pl4y' | 'booked_walkin' | 'blocked' = 'available';
        let bookedBy: string | undefined = undefined;
        let blockReason: string | undefined = undefined;

        if (venue.id === 'apex-padel') {
          if (court.id === 'c1' && time === '19:00') {
            status = 'booked_pl4y';
            bookedBy = 'Alex Mercer (PL4Y Match)';
          } else if (court.id === 'c2' && time === '17:00') {
            status = 'booked_walkin';
            bookedBy = 'Sebastian Vance (Walk-In)';
          } else if (court.id === 'c2' && time === '20:00') {
            status = 'booked_pl4y';
            bookedBy = 'Jessica Taylor';
          } else if (court.id === 'c3' && time === '14:00') {
            status = 'blocked';
            blockReason = 'Glass Surface Cleaning & Maintenance';
          } else if (court.id === 'c1' && time === '18:00') {
            status = 'booked_pl4y';
            bookedBy = 'Junior Academy Training';
          }
        } else if (venue.id === 'urban-fives') {
          if (court.id === 'u1' && time === '20:30') {
            status = 'booked_pl4y';
            bookedBy = 'Tariq Al-Mansoor (5v5)';
          } else if (court.id === 'u2' && time === '19:00') {
            status = 'booked_walkin';
            bookedBy = 'Corporate League Match';
          }
        }

        venueSlots.push({
          id: `${venue.id}-${court.id}-${time}`,
          courtId: court.id,
          courtName: court.name,
          date: 'Today',
          time,
          price: court.hourlyRate,
          status,
          bookedBy,
          blockReason
        });
      });
    });
    slots[venue.id] = venueSlots;
  });

  return slots;
}
