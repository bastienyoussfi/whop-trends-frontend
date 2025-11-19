import * as React from 'react'
import { type Icon } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface NavSecondaryItem {
  titleKey: string
  url: string
  icon: Icon
}

interface NavSecondaryProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: NavSecondaryItem[]
}

export function NavSecondary({
  items,
  ...props
}: NavSecondaryProps): React.ReactElement {
  const { t } = useTranslation('common')

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.titleKey}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{t(item.titleKey)}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
