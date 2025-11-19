import { useTranslation } from 'react-i18next'
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react'
import { useDashboardMetrics } from '@/lib/queries/dashboardQueries'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MetricsCards(): React.ReactElement {
  const { t } = useTranslation('dashboard')
  const { data, isLoading, isError } = useDashboardMetrics()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">{t('common:status.error')}</p>
      </div>
    )
  }

  const { hotNiches, trendingKeywords } = data.data

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardDescription>
            {t('metrics.hotNiches.description')}
          </CardDescription>
          <CardTitle className="text-3xl font-bold">
            {hotNiches.current}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            {hotNiches.trend === 'up' ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
            <span
              className={
                hotNiches.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }
            >
              {t(
                `metrics.hotNiches.trend${hotNiches.trend === 'up' ? 'Up' : 'Down'}`,
                {
                  percent: Math.abs(hotNiches.percentageChange).toFixed(1),
                },
              )}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>
            {t('metrics.trendingKeywords.description')}
          </CardDescription>
          <CardTitle className="text-3xl font-bold">
            {trendingKeywords.current}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            {trendingKeywords.trend === 'up' ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
            <span
              className={
                trendingKeywords.trend === 'up'
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {t(
                `metrics.trendingKeywords.trend${trendingKeywords.trend === 'up' ? 'Up' : 'Down'}`,
                {
                  percent: Math.abs(trendingKeywords.percentageChange).toFixed(
                    1,
                  ),
                },
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCardSkeleton(): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-16" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  )
}
