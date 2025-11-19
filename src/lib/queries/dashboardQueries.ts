import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import { fetchDashboardMetrics } from '@/api/mockApi'
import type { DashboardMetricsResponse } from '@/types/api'
import type { MetricPeriod } from '@/types/metrics'

export function useDashboardMetrics(
  period?: MetricPeriod,
): UseQueryResult<DashboardMetricsResponse, Error> {
  return useQuery({
    queryKey: queryKeys.dashboard.metrics(period),
    queryFn: () => fetchDashboardMetrics(period),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
