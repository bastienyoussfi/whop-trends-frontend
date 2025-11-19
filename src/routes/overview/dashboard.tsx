import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/components/site-header'
import { WelcomeSection } from '@/components/features/dashboard/welcome-section'
import { MetricsCards } from '@/components/features/dashboard/metrics-cards'
import { ShortcutCards } from '@/components/features/dashboard/shortcut-cards'

export const Route = createFileRoute('/overview/dashboard')({
  component: DashboardPage,
})

function DashboardPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <WelcomeSection userName="John" />
        <MetricsCards />
        <ShortcutCards />
      </main>
    </>
  )
}
