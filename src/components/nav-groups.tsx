import { type Icon } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

interface NavItem {
  titleKey: string
  url: string
  icon: Icon
}

interface NavGroupItem {
  titleKey: string
  items: NavItem[]
}

interface NavGroupsProps {
  groups: NavGroupItem[]
}

export function NavGroups({ groups }: NavGroupsProps): React.ReactElement {
  const { t } = useTranslation('common')

  return (
    <>
      {groups.map((group) => (
        <Collapsible key={group.titleKey} asChild defaultOpen={true}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                {t(`navigation.${group.titleKey}`)}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.titleKey}>
                    <SidebarMenuButton
                      asChild
                      tooltip={t(`navigation.${item.titleKey}`)}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{t(`navigation.${item.titleKey}`)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  )
}
