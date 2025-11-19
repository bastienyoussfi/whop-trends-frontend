// Centralized query key factory for TanStack Query
// Following best practices: https://tkdodo.eu/blog/effective-react-query-keys

import type {
  SearchEventFilters,
  TransactionEventFilters,
} from '@/types/events'
import type { MetricPeriod } from '@/types/metrics'

export const queryKeys = {
  // Dashboard keys
  dashboard: {
    all: ['dashboard'] as const,
    metrics: (period?: MetricPeriod) =>
      [...queryKeys.dashboard.all, 'metrics', period] as const,
  },

  // Search events keys
  searchEvents: {
    all: ['searchEvents'] as const,
    lists: () => [...queryKeys.searchEvents.all, 'list'] as const,
    list: (filters: SearchEventFilters) =>
      [...queryKeys.searchEvents.lists(), filters] as const,
    details: () => [...queryKeys.searchEvents.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.searchEvents.details(), id] as const,
  },

  // Transaction events keys
  transactionEvents: {
    all: ['transactionEvents'] as const,
    lists: () => [...queryKeys.transactionEvents.all, 'list'] as const,
    list: (filters: TransactionEventFilters) =>
      [...queryKeys.transactionEvents.lists(), filters] as const,
    details: () => [...queryKeys.transactionEvents.all, 'detail'] as const,
    detail: (id: number) =>
      [...queryKeys.transactionEvents.details(), id] as const,
  },
}
