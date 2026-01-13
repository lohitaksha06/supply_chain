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
  History,
  Search
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

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/')
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
    <div className="min-h-screen bg-gray-100">
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
          ${sidebarCollapsed ? 'lg:w-24' : 'lg:w-80'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-24 px-6 border-b border-gray-200">
            {!sidebarCollapsed && (
              <Link href="/" className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${getRoleColor()} flex items-center justify-center`}>
                  <Pill className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">PharmaChain</span>
              </Link>
            )}
            {sidebarCollapsed && (
              <div className={`w-14 h-14 rounded-2xl ${getRoleColor()} flex items-center justify-center mx-auto`}>
                <Pill className="w-7 h-7 text-white" />
              </div>
            )}
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-4 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-7 h-7 text-gray-600" />
            </button>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:flex absolute -right-5 top-28 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className={`w-6 h-6 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-2xl ${getRoleColor()} flex items-center justify-center text-white`}>
                  <User className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate text-xl">
                    {user?.username || user?.name}
                  </p>
                  <p className="text-base text-gray-500 capitalize mt-1">
                    {user?.role} Account
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - BIG BUTTONS WITH GAPS */}
          <nav className="flex-1 px-5 py-8 overflow-y-auto">
            <div className="space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-5 px-6 py-5 rounded-2xl font-bold transition-all text-lg
                      ${sidebarCollapsed ? 'justify-center px-4' : ''}
                      ${isActive
                        ? `${getRoleColor()} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className="w-7 h-7 flex-shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-5 w-full px-6 py-5 rounded-2xl font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all text-lg
                ${sidebarCollapsed ? 'justify-center px-4' : ''}`}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-7 h-7 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-24' : 'lg:ml-80'}`}>
        {/* Top Header with Search */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-24 px-8">
            {/* Left: Menu & Title */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-8 h-8 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {subtitle && (
                  <p className="text-lg text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12">
              <div className="relative w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search batches, medicines..."
                  className="w-full pl-14 pr-6 py-4 text-lg bg-gray-100 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Right: User */}
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${getRoleColor()} flex items-center justify-center text-white`}>
                <User className="w-7 h-7" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-gray-900 text-lg">{user?.username || user?.name}</p>
                <p className="text-base text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  )
}
