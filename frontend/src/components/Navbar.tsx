'use client''use client''use client'import React from 'react';



import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'

import { Package, LogOut, User } from 'lucide-react'import Link from 'next/link'import { Link } from 'react-router-dom';

import { useRouter } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'

export default function Navbar() {

  const { user, logout, isAuthenticated } = useAuth()import { import Link from 'next/link'import type { CSSProperties } from 'react';

  const router = useRouter()

  Building2, 

  const handleLogout = () => {

    logout()  Hospital, import { useAuth } from '@/contexts/AuthContext'

    router.push('/auth/login')

  }  User,



  return (  Package,import { export const Navbar: React.FC = () => {

    <nav className="bg-white shadow-sm border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  Shield,

        <div className="flex justify-between h-16">

          <div className="flex items-center">  Activity,  Building2,   const styles: { [k: string]: CSSProperties } = {

            <Link href="/" className="flex items-center space-x-2">

              <Package className="w-8 h-8 text-blue-600" />  LogOut,

              <span className="text-xl font-bold text-gray-900">PharmaChain</span>

            </Link>  Menu,  Hospital,     nav: {

          </div>

  X

          <div className="flex items-center space-x-4">

            {isAuthenticated ? (} from 'lucide-react'  User,      background: '#0f172a',

              <>

                <span className="text-sm text-gray-700">import { useState } from 'react'

                  Welcome, {user?.username}

                </span>import { useRouter } from 'next/navigation'  Package,      color: '#fff',

                <span className="text-xs text-gray-500 capitalize">

                  ({user?.role})

                </span>

                <buttonexport default function Navbar() {  Shield,      padding: '12px 16px',

                  onClick={handleLogout}

                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"  const { user, logout, isAuthenticated } = useAuth()

                >

                  <LogOut className="w-4 h-4" />  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)  Activity,      position: 'sticky',

                  <span>Logout</span>

                </button>  const router = useRouter()

              </>

            ) : (  LogOut,      top: 0,

              <div className="flex items-center space-x-2">

                <Link  const handleLogout = () => {

                  href="/auth/login"

                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"    logout()  Menu,      zIndex: 10,

                >

                  Login    router.push('/auth/login')

                </Link>

                <Link  }  X    },

                  href="/auth/signup"

                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"

                >

                  Sign Up  const getRoleIcon = () => {} from 'lucide-react'    container: {

                </Link>

              </div>    switch (user?.role) {

            )}

          </div>      case 'company':import { useState } from 'react'      display: 'flex',

        </div>

      </div>        return <Building2 className="w-5 h-5" />

    </nav>

  )      case 'hospital':import { useRouter } from 'next/navigation'      alignItems: 'center',

}
        return <Hospital className="w-5 h-5" />

      case 'customer':      justifyContent: 'space-between',

        return <User className="w-5 h-5" />

      default:export default function Navbar() {      maxWidth: 1200,

        return <User className="w-5 h-5" />

    }  const { user, logout, isAuthenticated } = useAuth()      margin: '0 auto',

  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)    },

  const getNavLinks = () => {

    if (!isAuthenticated) return []  const router = useRouter()    logo: {



    const baseLinks = [      color: '#fff',

      { href: '/tracker', label: 'Track Batch', icon: <Activity className="w-4 h-4" /> },

      { href: '/verify', label: 'Verify Batch', icon: <Shield className="w-4 h-4" /> },  const handleLogout = () => {      textDecoration: 'none',

      { href: '/batches', label: 'All Batches', icon: <Package className="w-4 h-4" /> }

    ]    logout()      fontWeight: 700,



    const roleLinks = {    router.push('/auth/login')      fontSize: 18,

      company: [

        { href: '/dashboard/company', label: 'Dashboard', icon: <Building2 className="w-4 h-4" /> },  }    },

        { href: '/register-batch', label: 'Register Batch', icon: <Package className="w-4 h-4" /> }

      ],    menu: {

      hospital: [

        { href: '/dashboard/hospital', label: 'Dashboard', icon: <Hospital className="w-4 h-4" /> },  const getRoleIcon = () => {      display: 'flex',

        { href: '/register-hospital', label: 'Register Hospital', icon: <Hospital className="w-4 h-4" /> }

      ],    switch (user?.role) {      gap: 12,

      customer: [

        { href: '/dashboard/customer', label: 'Dashboard', icon: <User className="w-4 h-4" /> }      case 'company':      listStyle: 'none',

      ]

    }        return <Building2 className="w-5 h-5" />      margin: 0,



    return [...(roleLinks[user?.role || 'customer'] || []), ...baseLinks]      case 'hospital':      padding: 0,

  }

        return <Hospital className="w-5 h-5" />    },

  return (

    <nav className="bg-white shadow-lg border-b border-gray-200">      case 'customer':    link: {

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">        return <User className="w-5 h-5" />      color: '#cbd5e1',

          {/* Logo */}

          <div className="flex items-center">      default:      textDecoration: 'none',

            <Link href="/" className="flex items-center space-x-2">

              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">        return <User className="w-5 h-5" />      fontSize: 14,

                <Package className="w-5 h-5 text-white" />

              </div>    }    },

              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">

                PharmaChain  }  };

              </span>

            </Link>  return (

          </div>

  const getNavLinks = () => {    <nav style={styles.nav}>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center space-x-4">    if (!isAuthenticated) return []      <div style={styles.container}>

            {getNavLinks().map((link) => (

              <Link        <Link to="/" style={styles.logo}>Supply Chain</Link>

                key={link.href}

                href={link.href}    const baseLinks = [        <ul style={styles.menu}>

                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"

              >      { href: '/tracker', label: 'Track Batch', icon: <Activity className="w-4 h-4" /> },          <li>

                {link.icon}

                <span>{link.label}</span>      { href: '/verify', label: 'Verify Batch', icon: <Shield className="w-4 h-4" /> },            <Link to="/login" style={styles.link}>Login</Link>

              </Link>

            ))}      { href: '/batches', label: 'All Batches', icon: <Package className="w-4 h-4" /> }          </li>

          </div>

    ]          <li>

          {/* User Menu / Auth Buttons */}

          <div className="hidden md:flex items-center space-x-4">            <Link to="/signup" style={styles.link}>Sign Up</Link>

            {isAuthenticated ? (

              <>    const roleLinks = {          </li>

                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-50">

                  {getRoleIcon()}      company: [        </ul>

                  <span className="text-sm font-medium text-gray-700">

                    {user?.username}        { href: '/dashboard/company', label: 'Dashboard', icon: <Building2 className="w-4 h-4" /> },      </div>

                  </span>

                  <span className="text-xs text-gray-500 capitalize">        { href: '/register-batch', label: 'Register Batch', icon: <Package className="w-4 h-4" /> }    </nav>

                    ({user?.role})

                  </span>      ],  );

                </div>

                <button      hospital: [};

                  onClick={handleLogout}

                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"        { href: '/dashboard/hospital', label: 'Dashboard', icon: <Hospital className="w-4 h-4" /> },

                >        { href: '/register-hospital', label: 'Register Hospital', icon: <Hospital className="w-4 h-4" /> }

                  <LogOut className="w-4 h-4" />      ],

                  <span>Logout</span>      customer: [

                </button>        { href: '/dashboard/customer', label: 'Dashboard', icon: <User className="w-4 h-4" /> }

              </>      ]

            ) : (    }

              <div className="flex items-center space-x-2">

                <Link    return [...(roleLinks[user?.role || 'customer'] || []), ...baseLinks]

                  href="/auth/login"  }

                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                >  return (

                  Login    <nav className="bg-white shadow-lg border-b border-gray-200">

                </Link>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link        <div className="flex justify-between h-16">

                  href="/auth/signup"          {/* Logo */}

                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"          <div className="flex items-center">

                >            <Link href="/" className="flex items-center space-x-2">

                  Sign Up              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">

                </Link>                <Package className="w-5 h-5 text-white" />

              </div>              </div>

            )}              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">

          </div>                PharmaChain

              </span>

          {/* Mobile menu button */}            </Link>

          <div className="md:hidden flex items-center">          </div>

            <button

              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}          {/* Desktop Navigation */}

              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"          <div className="hidden md:flex items-center space-x-4">

            >            {getNavLinks().map((link) => (

              {isMobileMenuOpen ? (              <Link

                <X className="w-6 h-6" />                key={link.href}

              ) : (                href={link.href}

                <Menu className="w-6 h-6" />                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"

              )}              >

            </button>                {link.icon}

          </div>                <span>{link.label}</span>

        </div>              </Link>

            ))}

        {/* Mobile Navigation */}          </div>

        {isMobileMenuOpen && (

          <div className="md:hidden py-4 border-t border-gray-200">          {/* User Menu / Auth Buttons */}

            <div className="space-y-1">          <div className="hidden md:flex items-center space-x-4">

              {getNavLinks().map((link) => (            {isAuthenticated ? (

                <Link              <>

                  key={link.href}                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-50">

                  href={link.href}                  {getRoleIcon()}

                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"                  <span className="text-sm font-medium text-gray-700">

                  onClick={() => setIsMobileMenuOpen(false)}                    {user?.username}

                >                  </span>

                  {link.icon}                  <span className="text-xs text-gray-500 capitalize">

                  <span>{link.label}</span>                    ({user?.role})

                </Link>                  </span>

              ))}                </div>

                              <button

              {isAuthenticated ? (                  onClick={handleLogout}

                <>                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"

                  <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4">                >

                    <div className="flex items-center space-x-2 mb-2">                  <LogOut className="w-4 h-4" />

                      {getRoleIcon()}                  <span>Logout</span>

                      <span className="text-sm font-medium text-gray-700">                </button>

                        {user?.username}              </>

                      </span>            ) : (

                      <span className="text-xs text-gray-500 capitalize">              <div className="flex items-center space-x-2">

                        ({user?.role})                <Link

                      </span>                  href="/auth/login"

                    </div>                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                    <button                >

                      onClick={handleLogout}                  Login

                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 w-full"                </Link>

                    >                <Link

                      <LogOut className="w-4 h-4" />                  href="/auth/signup"

                      <span>Logout</span>                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"

                    </button>                >

                  </div>                  Sign Up

                </>                </Link>

              ) : (              </div>

                <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4 space-y-2">            )}

                  <Link          </div>

                    href="/auth/login"

                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"          {/* Mobile menu button */}

                    onClick={() => setIsMobileMenuOpen(false)}          <div className="md:hidden flex items-center">

                  >            <button

                    Login              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

                  </Link>              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"

                  <Link            >

                    href="/auth/signup"              {isMobileMenuOpen ? (

                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center"                <X className="w-6 h-6" />

                    onClick={() => setIsMobileMenuOpen(false)}              ) : (

                  >                <Menu className="w-6 h-6" />

                    Sign Up              )}

                  </Link>            </button>

                </div>          </div>

              )}        </div>

            </div>

          </div>        {/* Mobile Navigation */}

        )}        {isMobileMenuOpen && (

      </div>          <div className="md:hidden py-4 border-t border-gray-200">

    </nav>            <div className="space-y-1">

  )              {getNavLinks().map((link) => (

}                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {getRoleIcon()}
                      <span className="text-sm font-medium text-gray-700">
                        {user?.username}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        ({user?.role})
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}