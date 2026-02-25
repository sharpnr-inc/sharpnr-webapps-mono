import { Link, useMatchRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface SidebarLinkProps {
  to: string
  children: React.ReactNode
}

export function SidebarLink({ to, children }: SidebarLinkProps) {
  const matchRoute = useMatchRoute()
  const isActive = matchRoute({ to })

  return (
    <Link
      to={to}
      className={cn(
        'block rounded-md px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-muted text-primary font-medium'
          : ' hover:bg-muted'
      )}
    >
      {children}
    </Link>
  )
}
