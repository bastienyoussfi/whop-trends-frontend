import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { fetchSearchEvents } from '@/api/mockApi'
import type { SearchEventsResponse } from '@/types/api'
import type { SearchEventFilters } from '@/types/events'

export function useSearchEvents(
  filters: SearchEventFilters = {},
): UseQueryResult<SearchEventsResponse, Error> {
  return useQuery({
    queryKey: queryKeys.searchEvents.list(filters),
    queryFn: () => fetchSearchEvents(filters),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}
