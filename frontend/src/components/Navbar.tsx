'use client''use client''use client''use client''use client''use client''use client'import React from 'react';



import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { Package, User, LogOut, Building2, Hospital, UserIcon } from 'lucide-react'import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'

import { useRouter } from 'next/navigation'

export default function Navbar() {

  const { user, logout } = useAuth()import { Package, User, LogOut, Building2, Hospital, UserIcon } from 'lucide-react'import Link from 'next/link'

  const router = useRouter()

import { useAuth } from '@/contexts/AuthContext'

  const handleLogout = () => {

    logout()import { useAuth } from '@/contexts/AuthContext'

    router.push('/')

  }export default function Navbar() {



  return (  const { user, logout } = useAuth()import { Package, LogOut, User } from 'lucide-react'import Link from 'next/link'

    <nav className="bg-white shadow-sm border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  const router = useRouter()

        <div className="flex justify-between h-16">

          <div className="flex items-center">import { useRouter } from 'next/navigation'

            <Link href="/" className="flex items-center space-x-2">

              <Package className="w-8 h-8 text-blue-600" />  const handleLogout = () => {

              <span className="text-xl font-bold text-gray-900">PharmaChain</span>

            </Link>    logout()import { useAuth } from '@/contexts/AuthContext'

          </div>

    router.push('/')

          <div className="flex items-center space-x-4">

            {user ? (  }export default function Navbar() {

              <>

                <span className="text-sm text-gray-700">Welcome, {user.name}</span>

                <Link

                  href={`/dashboard/${user.role}`}  const getRoleIcon = (role: string) => {  const { user, logout, isAuthenticated } = useAuth()import { import Link from 'next/link'

                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"

                >    switch (role) {

                  Dashboard

                </Link>      case 'company':  const router = useRouter()

                <button

                  onClick={handleLogout}        return <Building2 className="w-4 h-4" />

                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600"

                >      case 'hospital':  Building2, 

                  <LogOut className="w-4 h-4" />

                  <span>Logout</span>        return <Hospital className="w-4 h-4" />

                </button>

              </>      case 'customer':  const handleLogout = () => {

            ) : (

              <>        return <UserIcon className="w-4 h-4" />

                <Link

                  href="/auth/login"      default:    logout()  Hospital, import { useAuth } from '@/contexts/AuthContext'

                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"

                >        return <User className="w-4 h-4" />

                  Login

                </Link>    }    router.push('/auth/login')

                <Link

                  href="/auth/signup"  }

                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"

                >  }  User,

                  Sign Up

                </Link>  const getDashboardLink = (role: string) => {

              </>

            )}    return `/dashboard/${role}`

          </div>

        </div>  }

      </div>

    </nav>  return (  Package,import { Package, LogOut, User } from 'lucide-react'import Link from 'next/link'import { Link } from 'react-router-dom';

  )

}  return (

    <nav className="bg-white shadow-sm border-b border-gray-200">    <nav className="bg-white shadow-sm border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  Shield,

          <div className="flex items-center">

            <Link href="/" className="flex items-center space-x-2">        <div className="flex justify-between h-16">

              <Package className="w-8 h-8 text-blue-600" />

              <span className="text-xl font-bold text-gray-900">PharmaChain</span>          <div className="flex items-center">  Activity,import { useRouter } from 'next/navigation'

            </Link>

          </div>            <Link href="/" className="flex items-center space-x-2">



          <div className="flex items-center space-x-4">              <Package className="w-8 h-8 text-blue-600" />  LogOut,

            {user ? (

              <>              <span className="text-xl font-bold text-gray-900">PharmaChain</span>

                <div className="flex items-center space-x-2 text-gray-700">

                  {getRoleIcon(user.role)}            </Link>  Menu,import { useAuth } from '@/contexts/AuthContext'

                  <span className="text-sm font-medium">{user.name}</span>

                  <span className="text-xs text-gray-500 capitalize">({user.role})</span>          </div>

                </div>

                  X

                <Link

                  href={getDashboardLink(user.role)}          <div className="flex items-center space-x-4">

                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                >            {isAuthenticated ? (} from 'lucide-react'export default function Navbar() {

                  Dashboard

                </Link>              <>



                {user.role === 'customer' && (                <span className="text-sm text-gray-700">import { useState } from 'react'

                  <Link

                    href="/verify"                  Welcome, {user?.username}

                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                  >                </span>import { useRouter } from 'next/navigation'  const { user, logout, isAuthenticated } = useAuth()import { import Link from 'next/link'import type { CSSProperties } from 'react';

                    Verify Batch

                  </Link>                <span className="text-xs text-gray-500 capitalize">

                )}

                  ({user?.role})

                {user.role === 'company' && (

                  <>                </span>

                    <Link

                      href="/dashboard/company/batches"                <buttonexport default function Navbar() {  const router = useRouter()

                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                    >                  onClick={handleLogout}

                      My Batches

                    </Link>                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"  const { user, logout, isAuthenticated } = useAuth()

                    <Link

                      href="/dashboard/company/add-batch"                >

                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                    >                  <LogOut className="w-4 h-4" />  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)  Building2, 

                      Add Batch

                    </Link>                  <span>Logout</span>

                  </>

                )}                </button>  const router = useRouter()



                {user.role === 'hospital' && (              </>

                  <Link

                    href="/verify"            ) : (  const handleLogout = () => {

                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                  >              <div className="flex items-center space-x-2">

                    Verify Batch

                  </Link>                <Link  const handleLogout = () => {

                )}

                  href="/auth/login"

                <button

                  onClick={handleLogout}                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"    logout()    logout()  Hospital, import { useAuth } from '@/contexts/AuthContext'

                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"

                >                >

                  <LogOut className="w-4 h-4" />

                  <span>Logout</span>                  Login    router.push('/auth/login')

                </button>

              </>                </Link>

            ) : (

              <>                <Link  }    router.push('/auth/login')

                <Link

                  href="/auth/login"                  href="/auth/signup"

                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

                >                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"

                  Login

                </Link>                >

                <Link

                  href="/auth/signup"                  Sign Up  const getRoleIcon = () => {  }  User,

                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"

                >                </Link>

                  Sign Up

                </Link>              </div>    switch (user?.role) {

              </>

            )}            )}

          </div>

        </div>          </div>      case 'company':

      </div>

    </nav>        </div>

  )

}      </div>        return <Building2 className="w-5 h-5" />

    </nav>

  )      case 'hospital':  return (  Package,import { export const Navbar: React.FC = () => {

}
        return <Hospital className="w-5 h-5" />

      case 'customer':    <nav className="bg-white shadow-sm border-b border-gray-200">

        return <User className="w-5 h-5" />

      default:      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  Shield,

        return <User className="w-5 h-5" />

    }        <div className="flex justify-between h-16">

  }

          <div className="flex items-center">  Activity,  Building2,   const styles: { [k: string]: CSSProperties } = {

  const getNavLinks = () => {

    if (!isAuthenticated) return []            <Link href="/" className="flex items-center space-x-2">



    const baseLinks = [              <Package className="w-8 h-8 text-blue-600" />  LogOut,

      { href: '/tracker', label: 'Track Batch', icon: <Activity className="w-4 h-4" /> },

      { href: '/verify', label: 'Verify Batch', icon: <Shield className="w-4 h-4" /> },              <span className="text-xl font-bold text-gray-900">PharmaChain</span>

      { href: '/batches', label: 'All Batches', icon: <Package className="w-4 h-4" /> }

    ]            </Link>  Menu,  Hospital,     nav: {



    const roleLinks = {          </div>

      company: [

        { href: '/dashboard/company', label: 'Dashboard', icon: <Building2 className="w-4 h-4" /> },  X

        { href: '/register-batch', label: 'Register Batch', icon: <Package className="w-4 h-4" /> }

      ],          <div className="flex items-center space-x-4">

      hospital: [

        { href: '/dashboard/hospital', label: 'Dashboard', icon: <Hospital className="w-4 h-4" /> },            {isAuthenticated ? (} from 'lucide-react'  User,      background: '#0f172a',

        { href: '/register-hospital', label: 'Register Hospital', icon: <Hospital className="w-4 h-4" /> }

      ],              <>

      customer: [

        { href: '/dashboard/customer', label: 'Dashboard', icon: <User className="w-4 h-4" /> }                <span className="text-sm text-gray-700">import { useState } from 'react'

      ]

    }                  Welcome, {user?.username}



    return [...(roleLinks[user?.role || 'customer'] || []), ...baseLinks]                </span>import { useRouter } from 'next/navigation'  Package,      color: '#fff',

  }

                <span className="text-xs text-gray-500 capitalize">

  return (

    <nav className="bg-white shadow-lg border-b border-gray-200">                  ({user?.role})

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">                </span>

          {/* Logo */}

          <div className="flex items-center">                <buttonexport default function Navbar() {  Shield,      padding: '12px 16px',

            <Link href="/" className="flex items-center space-x-2">

              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">                  onClick={handleLogout}

                <Package className="w-5 h-5 text-white" />

              </div>                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"  const { user, logout, isAuthenticated } = useAuth()

              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">

                PharmaChain                >

              </span>

            </Link>                  <LogOut className="w-4 h-4" />  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)  Activity,      position: 'sticky',

          </div>

                  <span>Logout</span>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center space-x-4">                </button>  const router = useRouter()

            {getNavLinks().map((link) => (

              <Link              </>

                key={link.href}

                href={link.href}            ) : (  LogOut,      top: 0,

                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"

              >              <div className="flex items-center space-x-2">

                {link.icon}

                <span>{link.label}</span>                <Link  const handleLogout = () => {

              </Link>

            ))}                  href="/auth/login"

          </div>

                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"    logout()  Menu,      zIndex: 10,

          {/* User Menu / Auth Buttons */}

          <div className="hidden md:flex items-center space-x-4">                >

            {isAuthenticated ? (

              <>                  Login    router.push('/auth/login')

                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-50">

                  {getRoleIcon()}                </Link>

                  <span className="text-sm font-medium text-gray-700">

                    {user?.username}                <Link  }  X    },

                  </span>

                  <span className="text-xs text-gray-500 capitalize">                  href="/auth/signup"

                    ({user?.role})

                  </span>                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"

                </div>

                <button                >

                  onClick={handleLogout}

                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"                  Sign Up  const getRoleIcon = () => {} from 'lucide-react'    container: {

                >

                  <LogOut className="w-4 h-4" />                </Link>

                  <span>Logout</span>

                </button>              </div>    switch (user?.role) {

              </>

            ) : (            )}

              <div className="flex items-center space-x-2">

                <Link          </div>      case 'company':import { useState } from 'react'      display: 'flex',

                  href="/auth/login"

                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"        </div>

                >

                  Login      </div>        return <Building2 className="w-5 h-5" />

                </Link>

                <Link    </nav>

                  href="/auth/signup"

                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"  )      case 'hospital':import { useRouter } from 'next/navigation'      alignItems: 'center',

                >

                  Sign Up}

                </Link>        return <Hospital className="w-5 h-5" />

              </div>

            )}      case 'customer':      justifyContent: 'space-between',

          </div>

        return <User className="w-5 h-5" />

          {/* Mobile menu button */}

          <div className="md:hidden flex items-center">      default:export default function Navbar() {      maxWidth: 1200,

            <button

              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}        return <User className="w-5 h-5" />

              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"

            >    }  const { user, logout, isAuthenticated } = useAuth()      margin: '0 auto',

              {isMobileMenuOpen ? (

                <X className="w-6 h-6" />  }

              ) : (

                <Menu className="w-6 h-6" />  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)    },

              )}

            </button>  const getNavLinks = () => {

          </div>

        </div>    if (!isAuthenticated) return []  const router = useRouter()    logo: {



        {/* Mobile Navigation */}

        {isMobileMenuOpen && (

          <div className="md:hidden py-4 border-t border-gray-200">    const baseLinks = [      color: '#fff',

            <div className="space-y-1">

              {getNavLinks().map((link) => (      { href: '/tracker', label: 'Track Batch', icon: <Activity className="w-4 h-4" /> },

                <Link

                  key={link.href}      { href: '/verify', label: 'Verify Batch', icon: <Shield className="w-4 h-4" /> },  const handleLogout = () => {      textDecoration: 'none',

                  href={link.href}

                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"      { href: '/batches', label: 'All Batches', icon: <Package className="w-4 h-4" /> }

                  onClick={() => setIsMobileMenuOpen(false)}

                >    ]    logout()      fontWeight: 700,

                  {link.icon}

                  <span>{link.label}</span>

                </Link>

              ))}    const roleLinks = {    router.push('/auth/login')      fontSize: 18,

              

              {isAuthenticated ? (      company: [

                <>

                  <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4">        { href: '/dashboard/company', label: 'Dashboard', icon: <Building2 className="w-4 h-4" /> },  }    },

                    <div className="flex items-center space-x-2 mb-2">

                      {getRoleIcon()}        { href: '/register-batch', label: 'Register Batch', icon: <Package className="w-4 h-4" /> }

                      <span className="text-sm font-medium text-gray-700">

                        {user?.username}      ],    menu: {

                      </span>

                      <span className="text-xs text-gray-500 capitalize">      hospital: [

                        ({user?.role})

                      </span>        { href: '/dashboard/hospital', label: 'Dashboard', icon: <Hospital className="w-4 h-4" /> },  const getRoleIcon = () => {      display: 'flex',

                    </div>

                    <button        { href: '/register-hospital', label: 'Register Hospital', icon: <Hospital className="w-4 h-4" /> }

                      onClick={handleLogout}

                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 w-full"      ],    switch (user?.role) {      gap: 12,

                    >

                      <LogOut className="w-4 h-4" />      customer: [

                      <span>Logout</span>

                    </button>        { href: '/dashboard/customer', label: 'Dashboard', icon: <User className="w-4 h-4" /> }      case 'company':      listStyle: 'none',

                  </div>

                </>      ]

              ) : (

                <div className="px-3 py-2 border-t border-gray-200 mt-4 pt-4 space-y-2">    }        return <Building2 className="w-5 h-5" />      margin: 0,

                  <Link

                    href="/auth/login"

                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md"

                    onClick={() => setIsMobileMenuOpen(false)}    return [...(roleLinks[user?.role || 'customer'] || []), ...baseLinks]      case 'hospital':      padding: 0,

                  >

                    Login  }

                  </Link>

                  <Link        return <Hospital className="w-5 h-5" />    },

                    href="/auth/signup"

                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center"  return (

                    onClick={() => setIsMobileMenuOpen(false)}

                  >    <nav className="bg-white shadow-lg border-b border-gray-200">      case 'customer':    link: {

                    Sign Up

                  </Link>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                </div>

              )}        <div className="flex justify-between h-16">        return <User className="w-5 h-5" />      color: '#cbd5e1',

            </div>

          </div>          {/* Logo */}

        )}

      </div>          <div className="flex items-center">      default:      textDecoration: 'none',

    </nav>

  )            <Link href="/" className="flex items-center space-x-2">

}
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