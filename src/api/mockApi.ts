// Mock API functions - simulates backend API calls
// These will be replaced with real API calls when backend is ready

import type {
  DashboardMetricsResponse,
  SearchEventsResponse,
  TransactionEventsResponse,
} from '@/types/api'
import type {
  SearchEventFilters,
  TransactionEventFilters,
} from '@/types/events'
import type { MetricPeriod } from '@/types/metrics'
import { mockDashboardMetrics } from '@/constants/mockMetrics'
import { mockSearchEvents } from '@/constants/mockSearchEvents'
import { mockTransactionEvents } from '@/constants/mockTransactionEvents'

// Simulate network delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Fetch dashboard metrics
export async function fetchDashboardMetrics(
  period?: MetricPeriod,
): Promise<DashboardMetricsResponse> {
  await delay(500)

  return {
    data: mockDashboardMetrics,
    status: 200,
    message: 'Dashboard metrics retrieved successfully',
  }
}

// Fetch search events
export async function fetchSearchEvents(
  filters: SearchEventFilters = {},
): Promise<SearchEventsResponse> {
  await delay(400)

  let filteredEvents = [...mockSearchEvents]

  // Apply filters
  if (filters.searchTerm) {
    filteredEvents = filteredEvents.filter((event) =>
      event.searchTerm
        .toLowerCase()
        .includes(filters.searchTerm!.toLowerCase()),
    )
  }

  if (filters.startDate) {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.timestamp) >= filters.startDate!,
    )
  }

  if (filters.endDate) {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.timestamp) <= filters.endDate!,
    )
  }

  const limit = filters.limit ?? 10
  const paginatedEvents = filteredEvents.slice(0, limit)

  return {
    data: {
      data: paginatedEvents,
      pagination: {
        page: 1,
        pageSize: limit,
        totalCount: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / limit),
        hasNextPage: filteredEvents.length > limit,
        hasPreviousPage: false,
      },
    },
    status: 200,
    message: 'Search events retrieved successfully',
  }
}

// Fetch transaction events
export async function fetchTransactionEvents(
  filters: TransactionEventFilters = {},
): Promise<TransactionEventsResponse> {
  await delay(400)

  let filteredEvents = [...mockTransactionEvents]

  // Apply filters
  if (filters.productId) {
    filteredEvents = filteredEvents.filter(
      (event) => event.productId === filters.productId,
    )
  }

  if (filters.productSlug) {
    filteredEvents = filteredEvents.filter(
      (event) => event.productSlug === filters.productSlug,
    )
  }

  if (filters.seller) {
    filteredEvents = filteredEvents.filter((event) =>
      event.seller?.toLowerCase().includes(filters.seller!.toLowerCase()),
    )
  }

  if (filters.startDate) {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.timestamp) >= filters.startDate!,
    )
  }

  if (filters.endDate) {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.timestamp) <= filters.endDate!,
    )
  }

  const limit = filters.limit ?? 10
  const paginatedEvents = filteredEvents.slice(0, limit)

  return {
    data: {
      data: paginatedEvents,
      pagination: {
        page: 1,
        pageSize: limit,
        totalCount: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / limit),
        hasNextPage: filteredEvents.length > limit,
        hasPreviousPage: false,
      },
    },
    status: 200,
    message: 'Transaction events retrieved successfully',
  }
}
