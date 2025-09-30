'use client'import Image from "next/image";



import Link from 'next/link'export default function Home() {

import { Package, Shield, Activity, Building2, Hospital, User, ArrowRight } from 'lucide-react'  return (

    'use client'

export default function HomePage() {

  return (import Link from 'next/link'

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">import { useEffect } from 'react'

      {/* Header */}import { useRouter } from 'next/navigation'

      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">import { useAuth } from '@/contexts/AuthContext'

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">import { Package, Shield, Activity, Building2, Hospital, User, ArrowRight } from 'lucide-react'

          <div className="flex justify-between items-center">

            <div className="flex items-center space-x-2">export default function HomePage() {

              <Package className="w-8 h-8 text-blue-600" />  const { isAuthenticated, user } = useAuth()

              <span className="text-2xl font-bold text-gray-900">PharmaChain</span>  const router = useRouter()

            </div>

            <div className="flex items-center space-x-4">  useEffect(() => {

              <Link    // Redirect authenticated users to their dashboard

                href="/auth/login"    if (isAuthenticated && user) {

                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"      const roleRoutes = {

              >        company: '/dashboard/company',

                Login        hospital: '/dashboard/hospital',

              </Link>        customer: '/dashboard/customer'

              <Link      }

                href="/auth/signup"      router.push(roleRoutes[user.role])

                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"    }

              >  }, [isAuthenticated, user, router])

                Sign Up

              </Link>  if (isAuthenticated) {

            </div>    return (

          </div>      <div className="min-h-screen flex items-center justify-center">

        </div>        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>

      </header>      </div>

    )

      {/* Hero Section */}  }

      <section className="py-20 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto text-center">  return (

          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

            Secure Pharmaceutical      {/* Header */}

            <span className="block text-blue-600">Supply Chain Tracking</span>      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">

          </h1>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">          <div className="flex justify-between items-center">

            Track, verify, and secure your pharmaceutical supply chain with blockchain technology.             <div className="flex items-center space-x-2">

            Ensure medicine authenticity from manufacturer to patient.              <Package className="w-8 h-8 text-blue-600" />

          </p>              <span className="text-2xl font-bold text-gray-900">PharmaChain</span>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">            </div>

            <Link            <div className="flex items-center space-x-4">

              href="/auth/signup"              <Link

              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"                href="/auth/login"

            >                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"

              Get Started              >

              <ArrowRight className="ml-2 w-5 h-5" />                Login

            </Link>              </Link>

            <Link              <Link

              href="/auth/login"                href="/auth/signup"

              className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors"                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"

            >              >

              Sign In                Sign Up

            </Link>              </Link>

          </div>            </div>

        </div>          </div>

      </section>        </div>

      </header>

      {/* Features Section */}

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">      {/* Hero Section */}

        <div className="max-w-7xl mx-auto">      <section className="py-20 px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">        <div className="max-w-7xl mx-auto text-center">

            <h2 className="text-3xl font-bold text-gray-900 mb-4">          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">

              Why Choose PharmaChain?            Secure Pharmaceutical

            </h2>            <span className="block text-blue-600">Supply Chain Tracking</span>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">          </h1>

              Our blockchain-powered platform provides unmatched security, transparency, and traceability for pharmaceutical supply chains.          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">

            </p>            Track, verify, and secure your pharmaceutical supply chain with blockchain technology. 

          </div>            Ensure medicine authenticity from manufacturer to patient.

          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <div className="text-center p-6">            <Link

              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">              href="/auth/signup"

                <Shield className="w-8 h-8 text-blue-600" />              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"

              </div>            >

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Verification</h3>              Get Started

              <p className="text-gray-600">              <ArrowRight className="ml-2 w-5 h-5" />

                Every batch is cryptographically signed and verified using RSA digital signatures and blockchain hash chaining.            </Link>

              </p>            <Link

            </div>              href="/auth/login"

              className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-lg transition-colors"

            <div className="text-center p-6">            >

              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">              Sign In

                <Activity className="w-8 h-8 text-green-600" />            </Link>

              </div>          </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>        </div>

              <p className="text-gray-600">      </section>

                Track medicine batches in real-time from manufacturing to distribution with complete transparency.

              </p>      {/* Features Section */}

            </div>      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">

        <div className="max-w-7xl mx-auto">

            <div className="text-center p-6">          <div className="text-center mb-16">

              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">            <h2 className="text-3xl font-bold text-gray-900 mb-4">

                <Package className="w-8 h-8 text-purple-600" />              Why Choose PharmaChain?

              </div>            </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Supply Chain Integrity</h3>            <p className="text-lg text-gray-600 max-w-2xl mx-auto">

              <p className="text-gray-600">              Our blockchain-powered platform provides unmatched security, transparency, and traceability for pharmaceutical supply chains.

                Merkle tree verification ensures complete supply chain integrity and prevents counterfeiting.            </p>

              </p>          </div>

            </div>

          </div>          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        </div>            <div className="text-center p-6">

      </section>              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">

                <Shield className="w-8 h-8 text-blue-600" />

      {/* User Types Section */}              </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8">              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Verification</h3>

        <div className="max-w-7xl mx-auto">              <p className="text-gray-600">

          <div className="text-center mb-16">                Every batch is cryptographically signed and verified using RSA digital signatures and blockchain hash chaining.

            <h2 className="text-3xl font-bold text-gray-900 mb-4">              </p>

              Join as            </div>

            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">            <div className="text-center p-6">

              Choose your role in the pharmaceutical supply chain and get started with secure tracking and verification.              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">

            </p>                <Activity className="w-8 h-8 text-green-600" />

          </div>              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Tracking</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">              <p className="text-gray-600">

            {/* Company */}                Track medicine batches in real-time from manufacturing to distribution with complete transparency.

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">              </p>

              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">            </div>

                <Building2 className="w-8 h-8 text-blue-600" />

              </div>            <div className="text-center p-6">

              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">

                Pharmaceutical Company                <Package className="w-8 h-8 text-purple-600" />

              </h3>              </div>

              <ul className="text-gray-600 space-y-2 mb-6">              <h3 className="text-xl font-semibold text-gray-900 mb-2">Supply Chain Integrity</h3>

                <li>• Register your company</li>              <p className="text-gray-600">

                <li>• Add medicine batches to blockchain</li>                Merkle tree verification ensures complete supply chain integrity and prevents counterfeiting.

                <li>• Generate digital signatures</li>              </p>

                <li>• Track distribution</li>            </div>

              </ul>          </div>

              <Link        </div>

                href="/auth/signup"      </section>

                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"

              >      {/* User Types Section */}

                Register as Company      <section className="py-20 px-4 sm:px-6 lg:px-8">

              </Link>        <div className="max-w-7xl mx-auto">

            </div>          <div className="text-center mb-16">

            <h2 className="text-3xl font-bold text-gray-900 mb-4">

            {/* Hospital */}              Join as

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">            </h2>

              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">            <p className="text-lg text-gray-600 max-w-2xl mx-auto">

                <Hospital className="w-8 h-8 text-green-600" />              Choose your role in the pharmaceutical supply chain and get started with secure tracking and verification.

              </div>            </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">          </div>

                Hospital / Healthcare

              </h3>          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <ul className="text-gray-600 space-y-2 mb-6">            {/* Company */}

                <li>• Register your hospital</li>            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">

                <li>• Verify medicine authenticity</li>              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">

                <li>• Track received batches</li>                <Building2 className="w-8 h-8 text-blue-600" />

                <li>• Ensure patient safety</li>              </div>

              </ul>              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">

              <Link                Pharmaceutical Company

                href="/auth/signup"              </h3>

                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"              <ul className="text-gray-600 space-y-2 mb-6">

              >                <li>• Register your company</li>

                Register as Hospital                <li>• Add medicine batches to blockchain</li>

              </Link>                <li>• Generate digital signatures</li>

            </div>                <li>• Track distribution</li>

              </ul>

            {/* Customer */}              <Link

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">                href="/auth/signup"

              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"

                <User className="w-8 h-8 text-purple-600" />              >

              </div>                Register as Company

              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">              </Link>

                Customer / Patient            </div>

              </h3>

              <ul className="text-gray-600 space-y-2 mb-6">            {/* Hospital */}

                <li>• Track medicine batches</li>            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">

                <li>• Verify authenticity</li>              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">

                <li>• View supply chain</li>                <Hospital className="w-8 h-8 text-green-600" />

                <li>• Ensure medicine safety</li>              </div>

              </ul>              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">

              <Link                Hospital / Healthcare

                href="/auth/signup"              </h3>

                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"              <ul className="text-gray-600 space-y-2 mb-6">

              >                <li>• Register your hospital</li>

                Register as Customer                <li>• Verify medicine authenticity</li>

              </Link>                <li>• Track received batches</li>

            </div>                <li>• Ensure patient safety</li>

          </div>              </ul>

        </div>              <Link

      </section>                href="/auth/signup"

                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"

      {/* Footer */}              >

      <footer className="bg-gray-900 text-white py-12">                Register as Hospital

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">              </Link>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">            </div>

            <div className="col-span-1 md:col-span-2">

              <div className="flex items-center space-x-2 mb-4">            {/* Customer */}

                <Package className="w-8 h-8 text-blue-400" />            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">

                <span className="text-2xl font-bold">PharmaChain</span>              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">

              </div>                <User className="w-8 h-8 text-purple-600" />

              <p className="text-gray-400 max-w-md">              </div>

                Securing pharmaceutical supply chains with blockchain technology.               <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">

                Ensuring medicine authenticity and patient safety worldwide.                Customer / Patient

              </p>              </h3>

            </div>              <ul className="text-gray-600 space-y-2 mb-6">

            <div>                <li>• Track medicine batches</li>

              <h4 className="font-semibold mb-4">Quick Links</h4>                <li>• Verify authenticity</li>

              <ul className="space-y-2 text-gray-400">                <li>• View supply chain</li>

                <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>                <li>• Ensure medicine safety</li>

                <li><Link href="/auth/signup" className="hover:text-white transition-colors">Sign Up</Link></li>              </ul>

              </ul>              <Link

            </div>                href="/auth/signup"

            <div>                className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"

              <h4 className="font-semibold mb-4">Contact</h4>              >

              <ul className="space-y-2 text-gray-400">                Register as Customer

                <li>support@pharmachain.com</li>              </Link>

                <li>+1 (555) 123-4567</li>            </div>

              </ul>          </div>

            </div>        </div>

          </div>      </section>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">

            <p>&copy; 2025 PharmaChain. All rights reserved.</p>      {/* Footer */}

          </div>      <footer className="bg-gray-900 text-white py-12">

        </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      </footer>          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

    </div>            <div className="col-span-1 md:col-span-2">

  )              <div className="flex items-center space-x-2 mb-4">

}                <Package className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">PharmaChain</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Securing pharmaceutical supply chains with blockchain technology. 
                Ensuring medicine authenticity and patient safety worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/auth/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@pharmachain.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PharmaChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
