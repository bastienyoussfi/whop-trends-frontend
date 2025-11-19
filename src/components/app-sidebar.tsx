import * as React from 'react'
import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  IconSettings,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react'

import { NavGroups } from '@/components/nav-groups'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/default.jpg',
  },
  navGroups: [
    {
      titleKey: 'overview',
      items: [
        {
          titleKey: 'dashboard',
          url: '/overview/dashboard',
          icon: IconDashboard,
        },
      ],
    },
    {
      titleKey: 'analyze',
      items: [
        {
          titleKey: 'trendingWhops',
          url: '/analyze/trending-whops',
          icon: IconTrendingUp,
        },
        {
          titleKey: 'keywordTrends',
          url: '/analyze/keyword-trends',
          icon: IconSearch,
        },
        {
          titleKey: 'nicheAnalytics',
          url: '/analyze/niche-analytics',
          icon: IconChartBar,
        },
        {
          titleKey: 'competitorTracking',
          url: '/analyze/competitor-tracking',
          icon: IconUsers,
        },
      ],
    },
  ],
  navSecondary: [
    {
      titleKey: 'labels.settings',
      url: '#',
      icon: IconSettings,
    },
    {
      titleKey: 'labels.help',
      url: '#',
      icon: IconHelp,
    },
    {
      titleKey: 'labels.search',
      url: '#',
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.ReactElement {
  return (
    <Sidebar variant="inset" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Whop Trends</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroups groups={data.navGroups} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
