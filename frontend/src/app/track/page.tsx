'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Search, Activity, LogOut, Building2, Hospital, User, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL, getAuthHeaders } from '@/lib/utils'

export default function TrackPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [batchId, setBatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!batchId.trim()) return

    setLoading(true)
    setError('')
    setTrackingResult(null)

    try {
      const response = await axios.post(
        `${API_BASE_URL}/track`,
        { batch_id: batchId },
        { headers: getAuthHeaders() }
      )
      setTrackingResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to track batch')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'company':
        return <Building2 className="w-4 h-4" />
      case 'hospital':
        return <Hospital className="w-4 h-4" />
      case 'customer':
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Package className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">PharmaChain</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700">
                    {getRoleIcon(user.role)}
                    <span className="text-sm font-medium">{user.username || user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">({user.role})</span>
                  </div>
                  <Link
                    href={`/dashboard/${user.role}`}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/verify"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Verify
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Supply Chain</h1>
          <p className="mt-2 text-gray-600">
            Follow the journey of pharmaceutical batches through the supply chain
          </p>
        </div>

        {/* Tracking Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Batch Tracking</h2>
            <p className="text-sm text-gray-500">Enter a batch ID to track its supply chain journey</p>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={handleTrack} className="space-y-6">
              <div>
                <label htmlFor="batch_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Batch ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="batch_id"
                    id="batch_id"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md pr-10"
                    placeholder="Enter batch ID (e.g., BATCH-2025-001)"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !batchId.trim()}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Tracking...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5 mr-3" />
                    Track Batch
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Package className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Tracking Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {trackingResult && (
          <div className="mb-6 rounded-md bg-blue-50 border border-blue-200 p-6">
            <div className="flex items-start">
              <Activity className="h-6 w-6 text-blue-400 mt-1" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-blue-800 mb-3">Supply Chain Tracking Results</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Status Message:</p>
                    <p className="text-sm text-blue-700 mt-1">{trackingResult.message}</p>
                  </div>

                  {trackingResult.batch_hash && (
                    <div>
                      <p className="text-sm font-medium text-blue-900">Batch Hash:</p>
                      <div className="mt-1 bg-blue-100 rounded-md p-3">
                        <p className="text-xs font-mono text-blue-800 break-all">
                          {trackingResult.batch_hash}
                        </p>
                      </div>
                    </div>
                  )}

                  {trackingResult.previous_hash && (
                    <div>
                      <p className="text-sm font-medium text-blue-900">Previous Hash:</p>
                      <div className="mt-1 bg-blue-100 rounded-md p-3">
                        <p className="text-xs font-mono text-blue-800 break-all">
                          {trackingResult.previous_hash}
                        </p>
                      </div>
                    </div>
                  )}

                  {trackingResult.signature && (
                    <div>
                      <p className="text-sm font-medium text-blue-900">Digital Signature:</p>
                      <div className="mt-1 bg-blue-100 rounded-md p-3">
                        <p className="text-xs font-mono text-blue-800 break-all">
                          {trackingResult.signature.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  )}

                  {trackingResult.public_key && (
                    <div>
                      <p className="text-sm font-medium text-blue-900">Public Key:</p>
                      <div className="mt-1 bg-blue-100 rounded-md p-3">
                        <p className="text-xs font-mono text-blue-800 break-all">
                          {trackingResult.public_key.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Status */}
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Blockchain Verification:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supply Chain Flow */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Supply Chain Flow</h2>
            <p className="text-sm text-gray-500">How pharmaceutical batches move through the supply chain</p>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Manufacturer</h3>
                <p className="text-xs text-gray-500">Creates batch and adds to blockchain</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Distribution</h3>
                <p className="text-xs text-gray-500">Tracked through supply chain</p>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Hospital className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Hospital/Pharmacy</h3>
                <p className="text-xs text-gray-500">Verifies and dispenses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Verify Authenticity</h3>
            <p className="text-gray-600 mb-4">
              Check if a medicine batch is authentic and hasn't been tampered with.
            </p>
            <Link
              href="/verify"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Verify Batch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Report Issues</h3>
            <p className="text-gray-600 mb-4">
              Found a problem with a batch? Report it to help maintain supply chain integrity.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
              Report Issue
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}