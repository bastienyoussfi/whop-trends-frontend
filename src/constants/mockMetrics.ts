import type { DashboardMetrics } from '../types/metrics'

// Mock dashboard metrics - simulates aggregated data from search and transaction events
export const mockDashboardMetrics: DashboardMetrics = {
  hotNiches: {
    current: 12,
    previous: 9,
    percentageChange: 33.3,
    trend: 'up',
    topNiches: [
      {
        name: 'Trading & Investing',
        count: 156,
        percentageChange: 42.5,
        trend: 'up',
      },
      {
        name: 'Discord Tools',
        count: 134,
        percentageChange: 28.7,
        trend: 'up',
      },
      {
        name: 'E-commerce',
        count: 98,
        percentageChange: 15.3,
        trend: 'up',
      },
      {
        name: 'Business & Marketing',
        count: 87,
        percentageChange: 22.1,
        trend: 'up',
      },
      {
        name: 'NFT & Crypto',
        count: 76,
        percentageChange: -12.4,
        trend: 'down',
      },
    ],
  },
  trendingKeywords: {
    current: 247,
    previous: 198,
    percentageChange: 24.7,
    trend: 'up',
    topKeywords: [
      {
        term: 'discord bot',
        searchCount: 342,
        percentageChange: 67.3,
        trend: 'up',
      },
      {
        term: 'trading signals',
        searchCount: 289,
        percentageChange: 45.2,
        trend: 'up',
      },
      {
        term: 'crypto trading',
        searchCount: 234,
        percentageChange: 38.9,
        trend: 'up',
      },
      {
        term: 'nft alpha',
        searchCount: 198,
        percentageChange: 52.6,
        trend: 'up',
      },
      {
        term: 'dropshipping',
        searchCount: 176,
        percentageChange: 12.3,
        trend: 'up',
      },
      {
        term: 'forex course',
        searchCount: 165,
        percentageChange: 28.1,
        trend: 'up',
      },
      {
        term: 'ai tools',
        searchCount: 143,
        percentageChange: 89.4,
        trend: 'up',
      },
      {
        term: 'copywriting',
        searchCount: 127,
        percentageChange: -8.2,
        trend: 'down',
      },
    ],
  },
  lastUpdated: new Date('2025-11-19T10:30:00Z'),
}
