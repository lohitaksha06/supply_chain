'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  Pill,
  LayoutDashboard,
  Shield,
  Activity,
  Package,
  LogOut,
  Menu,
  X,
  User,
  Building2,
  Hospital,
  ChevronLeft,
  HelpCircle,
  History
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'company':
        return <Building2 className="w-6 h-6" />
      case 'hospital':
        return <Hospital className="w-6 h-6" />
      default:
        return <User className="w-6 h-6" />
    }
  }

  const getRoleColor = () => {
    switch (user?.role) {
      case 'company':
        return 'bg-blue-600'
      case 'hospital':
        return 'bg-emerald-600'
      default:
        return 'bg-teal-600'
    }
  }

  // Navigation items based on role
  const getNavItems = (): NavItem[] => {
    if (user?.role === 'customer') {
      return [
        { name: 'Dashboard', href: `/dashboard/customer`, icon: LayoutDashboard },
        { name: 'Verify Medicine', href: '/verify', icon: Shield },
        { name: 'Track Batch', href: '/track', icon: Activity },
        { name: 'History', href: '/history', icon: History },
        { name: 'Help', href: '/help', icon: HelpCircle },
      ]
    }

    if (user?.role === 'company') {
      return [
        { name: 'Dashboard', href: `/dashboard/company`, icon: LayoutDashboard },
        { name: 'My Batches', href: '/batch/list', icon: Package },
        { name: 'Track Shipments', href: '/track', icon: Activity },
      ]
    }

    if (user?.role === 'hospital') {
      return [
        { name: 'Dashboard', href: `/dashboard/hospital`, icon: LayoutDashboard },
        { name: 'Verify Batch', href: '/verify', icon: Shield },
        { name: 'Track Supply', href: '/track', icon: Activity },
        { name: 'History', href: '/history', icon: History },
      ]
    }

    return [{ name: 'Dashboard', href: `/dashboard/${user?.role}`, icon: LayoutDashboard }]
  }

  const navItems = getNavItems()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white shadow-xl transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close/Collapse */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
            {!sidebarCollapsed && (
              <Link href="/" className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${getRoleColor()} flex items-center justify-center`}>
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">PharmaChain</span>
              </Link>
            )}
            {sidebarCollapsed && (
              <div className={`w-12 h-12 rounded-xl ${getRoleColor()} flex items-center justify-center mx-auto`}>
                <Pill className="w-6 h-6 text-white" />
              </div>
            )}
            
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Collapse toggle button - desktop only */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex absolute -right-4 top-24 w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className={`w-5 h-5 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="px-6 py-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl ${getRoleColor()} flex items-center justify-center text-white`}>
                  {getRoleIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate text-lg">
                    {user?.username || user?.name}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {user?.role} Account
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl font-semibold transition-all text-base
                    ${sidebarCollapsed ? 'justify-center' : ''}
                    ${isActive
                      ? `${getRoleColor()} text-white shadow-lg`
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all text-base
                ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-6 h-6 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-20 px-6 lg:px-10">
            {/* Left: Menu button & Title */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-7 h-7 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-base text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Right: User Info */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${getRoleColor()} flex items-center justify-center text-white`}>
                {getRoleIcon()}
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-gray-900">{user?.username || user?.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
