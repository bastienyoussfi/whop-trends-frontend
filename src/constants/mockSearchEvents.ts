import type { SearchEvent } from '../types/events'

// Mock search event data - simulates real search patterns on Whop
export const mockSearchEvents: SearchEvent[] = [
  // Recent searches (last 7 days)
  {
    id: 1,
    type: 'search',
    searchTerm: 'discord bot',
    timestamp: new Date('2025-11-19T10:30:00Z'),
  },
  {
    id: 2,
    type: 'search',
    searchTerm: 'trading signals',
    timestamp: new Date('2025-11-19T09:15:00Z'),
  },
  {
    id: 3,
    type: 'search',
    searchTerm: 'forex course',
    timestamp: new Date('2025-11-19T08:45:00Z'),
  },
  {
    id: 4,
    type: 'search',
    searchTerm: 'nft alpha',
    timestamp: new Date('2025-11-18T22:30:00Z'),
  },
  {
    id: 5,
    type: 'search',
    searchTerm: 'copywriting',
    timestamp: new Date('2025-11-18T20:15:00Z'),
  },
  {
    id: 6,
    type: 'search',
    searchTerm: 'discord bot',
    timestamp: new Date('2025-11-18T18:00:00Z'),
  },
  {
    id: 7,
    type: 'search',
    searchTerm: 'crypto signals',
    timestamp: new Date('2025-11-18T16:45:00Z'),
  },
  {
    id: 8,
    type: 'search',
    searchTerm: 'ecommerce',
    timestamp: new Date('2025-11-18T14:30:00Z'),
  },
  {
    id: 9,
    type: 'search',
    searchTerm: 'fitness coaching',
    timestamp: new Date('2025-11-18T12:00:00Z'),
  },
  {
    id: 10,
    type: 'search',
    searchTerm: 'trading signals',
    timestamp: new Date('2025-11-18T10:30:00Z'),
  },
  {
    id: 11,
    type: 'search',
    searchTerm: 'dropshipping',
    timestamp: new Date('2025-11-17T22:00:00Z'),
  },
  {
    id: 12,
    type: 'search',
    searchTerm: 'ai tools',
    timestamp: new Date('2025-11-17T20:15:00Z'),
  },
  {
    id: 13,
    type: 'search',
    searchTerm: 'discord bot',
    timestamp: new Date('2025-11-17T18:30:00Z'),
  },
  {
    id: 14,
    type: 'search',
    searchTerm: 'stock alerts',
    timestamp: new Date('2025-11-17T16:00:00Z'),
  },
  {
    id: 15,
    type: 'search',
    searchTerm: 'reselling',
    timestamp: new Date('2025-11-17T14:20:00Z'),
  },
  {
    id: 16,
    type: 'search',
    searchTerm: 'trading course',
    timestamp: new Date('2025-11-17T12:00:00Z'),
  },
  {
    id: 17,
    type: 'search',
    searchTerm: 'marketing agency',
    timestamp: new Date('2025-11-17T10:45:00Z'),
  },
  {
    id: 18,
    type: 'search',
    searchTerm: 'forex signals',
    timestamp: new Date('2025-11-16T22:30:00Z'),
  },
  {
    id: 19,
    type: 'search',
    searchTerm: 'ai chatbot',
    timestamp: new Date('2025-11-16T20:00:00Z'),
  },
  {
    id: 20,
    type: 'search',
    searchTerm: 'crypto trading',
    timestamp: new Date('2025-11-16T18:15:00Z'),
  },

  // Older searches (8-14 days ago)
  {
    id: 21,
    type: 'search',
    searchTerm: 'discord bot',
    timestamp: new Date('2025-11-15T16:00:00Z'),
  },
  {
    id: 22,
    type: 'search',
    searchTerm: 'nft flipping',
    timestamp: new Date('2025-11-15T14:30:00Z'),
  },
  {
    id: 23,
    type: 'search',
    searchTerm: 'stock scanner',
    timestamp: new Date('2025-11-15T12:00:00Z'),
  },
  {
    id: 24,
    type: 'search',
    searchTerm: 'social media',
    timestamp: new Date('2025-11-14T22:00:00Z'),
  },
  {
    id: 25,
    type: 'search',
    searchTerm: 'day trading',
    timestamp: new Date('2025-11-14T20:30:00Z'),
  },
  {
    id: 26,
    type: 'search',
    searchTerm: 'amazon fba',
    timestamp: new Date('2025-11-14T18:00:00Z'),
  },
  {
    id: 27,
    type: 'search',
    searchTerm: 'options trading',
    timestamp: new Date('2025-11-14T16:15:00Z'),
  },
  {
    id: 28,
    type: 'search',
    searchTerm: 'shopify store',
    timestamp: new Date('2025-11-14T14:00:00Z'),
  },
  {
    id: 29,
    type: 'search',
    searchTerm: 'smma course',
    timestamp: new Date('2025-11-13T22:30:00Z'),
  },
  {
    id: 30,
    type: 'search',
    searchTerm: 'trading signals',
    timestamp: new Date('2025-11-13T20:00:00Z'),
  },
  {
    id: 31,
    type: 'search',
    searchTerm: 'betting tips',
    timestamp: new Date('2025-11-13T18:30:00Z'),
  },
  {
    id: 32,
    type: 'search',
    searchTerm: 'growth hacking',
    timestamp: new Date('2025-11-13T16:00:00Z'),
  },
  {
    id: 33,
    type: 'search',
    searchTerm: 'discord bot',
    timestamp: new Date('2025-11-12T14:45:00Z'),
  },
  {
    id: 34,
    type: 'search',
    searchTerm: 'youtube course',
    timestamp: new Date('2025-11-12T12:30:00Z'),
  },
  {
    id: 35,
    type: 'search',
    searchTerm: 'email marketing',
    timestamp: new Date('2025-11-12T10:00:00Z'),
  },
]

// Top trending search terms aggregated
export const topSearchTerms = [
  { term: 'discord bot', count: 5 },
  { term: 'trading signals', count: 3 },
  { term: 'forex course', count: 1 },
  { term: 'nft alpha', count: 1 },
  { term: 'crypto signals', count: 1 },
  { term: 'ai tools', count: 1 },
  { term: 'dropshipping', count: 1 },
  { term: 'ecommerce', count: 1 },
]
