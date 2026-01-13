'use client'

import Link from 'next/link'
import { Building2, Hospital, User, ArrowRight, Pill, Shield, Activity, Package } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-teal-600">PharmaChain</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-8 py-4 text-lg font-bold text-teal-600 hover:text-teal-700 border-2 border-teal-600 rounded-xl hover:bg-teal-50 transition-all"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-4 text-lg font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Track Your Medicine
            <span className="block text-teal-600 mt-2">With Blockchain</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto">
            Verify medicine authenticity. Prevent counterfeits.
          </p>
          
          <div className="flex gap-6 justify-center mb-16">
            <Link
              href="/auth/signup"
              className="px-12 py-5 text-xl font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-2xl transition-all shadow-xl flex items-center gap-3"
            >
              Get Started <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/track"
              className="px-12 py-5 text-xl font-bold text-teal-600 bg-white border-3 border-teal-600 hover:bg-teal-50 rounded-2xl transition-all"
            >
              Track Batch
            </Link>
          </div>

          {/* Visual Icons */}
          <div className="flex justify-center gap-16 mt-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-10 h-10 text-teal-600" />
              </div>
              <p className="font-bold text-gray-700">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-10 h-10 text-cyan-600" />
              </div>
              <p className="font-bold text-gray-700">Real-time</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-10 h-10 text-emerald-600" />
              </div>
              <p className="font-bold text-gray-700">Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="w-full py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          
          <div className="flex justify-center items-center gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <p className="text-lg font-bold text-gray-800">Sign Up</p>
            </div>
            
            <ArrowRight className="w-10 h-10 text-gray-300" />
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <p className="text-lg font-bold text-gray-800">Add Batch</p>
            </div>
            
            <ArrowRight className="w-10 h-10 text-gray-300" />
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <p className="text-lg font-bold text-gray-800">Track & Verify</p>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Role */}
      <section className="w-full py-20 px-8 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Choose Your Role
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Select how you want to use PharmaChain
          </p>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Company Card */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-teal-500">
              <div className="w-24 h-24 bg-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Company</h3>
              <p className="text-gray-600 mb-6">Add & manage medicine batches</p>
              <Link
                href="/auth/signup"
                className="block w-full py-4 text-lg font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all"
              >
                Join as Company
              </Link>
            </div>

            {/* Hospital Card */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-500">
              <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Hospital className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hospital</h3>
              <p className="text-gray-600 mb-6">Receive & verify medicines</p>
              <Link
                href="/auth/signup"
                className="block w-full py-4 text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all"
              >
                Join as Hospital
              </Link>
            </div>

            {/* Customer Card */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-cyan-500">
              <div className="w-24 h-24 bg-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer</h3>
              <p className="text-gray-600 mb-6">Track & verify your medicine</p>
              <Link
                href="/auth/signup"
                className="block w-full py-4 text-lg font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-all"
              >
                Join as Customer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-8 bg-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-teal-100 mb-10">
            Join thousands using PharmaChain today.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-16 py-6 text-2xl font-bold text-teal-600 bg-white hover:bg-teal-50 rounded-2xl transition-all shadow-xl"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full py-8 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Pill className="w-6 h-6 text-teal-400" />
            <span className="text-xl font-bold text-white">PharmaChain</span>
          </div>
          <p className="text-gray-400">© 2026 PharmaChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
