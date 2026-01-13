'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Search, Shield, User, LogOut, CheckCircle, XCircle, Activity } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL, getAuthHeaders } from '@/lib/utils'

export default function CustomerDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [batchId, setBatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'customer') {
      router.push('/auth/login')
      return
    }
  }, [user, router])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!batchId.trim()) return

    setLoading(true)
    setError('')
    setVerificationResult(null)
    setTrackingResult(null)

    try {
      const response = await axios.post(
        `${API_BASE_URL}/verify`,
        { batch_id: batchId },
        { headers: getAuthHeaders() }
      )
      setVerificationResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to verify batch')
    } finally {
      setLoading(false)
    }
  }

  const handleTrack = async () => {
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

  if (!user || user.role !== 'customer') {
    return <div>Loading...</div>
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
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.username || user.name}</span>
                <span className="text-xs text-gray-500">(Customer)</span>
              </div>
              <Link
                href="/verify"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Verify Medicine
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="mt-2 text-gray-600">Verify medicine authenticity and track supply chain</p>
        </div>

        {/* Medicine Verification Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Medicine Verification & Tracking</h2>
            <p className="text-sm text-gray-500">Enter a batch ID to verify authenticity and track supply chain</p>
          </div>
          <div className="px-6 py-4">
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="batch_id" className="block text-sm font-medium text-gray-700">
                  Batch ID (found on medicine packaging)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="batch_id"
                    id="batch_id"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter batch ID (e.g., BATCH-2025-001)"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading || !batchId.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  Verify Authenticity
                </button>

                <button
                  type="button"
                  onClick={handleTrack}
                  disabled={loading || !batchId.trim()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
                  ) : (
                    <Activity className="w-4 h-4 mr-2" />
                  )}
                  Track Supply Chain
                </button>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {verificationResult && (
                <div className={`rounded-md p-4 ${
                  verificationResult.valid ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <div className="flex">
                    {verificationResult.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${
                        verificationResult.valid ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {verificationResult.valid ? 'Medicine is Authentic' : 'Medicine Verification Failed'}
                      </h3>
                      <div className={`mt-2 text-sm ${
                        verificationResult.valid ? 'text-green-700' : 'text-red-700'
                      }`}>
                        <p>{verificationResult.message}</p>
                        {verificationResult.valid && (
                          <p className="mt-1">This medicine has been verified as authentic and safe to use.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {trackingResult && (
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <Activity className="h-5 w-5 text-blue-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Supply Chain Information</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p><strong>Message:</strong> {trackingResult.message}</p>
                        {trackingResult.batch_hash && (
                          <p className="mt-1"><strong>Batch Hash:</strong> {trackingResult.batch_hash.substring(0, 20)}...</p>
                        )}
                        {trackingResult.previous_hash && (
                          <p className="mt-1"><strong>Previous Hash:</strong> {trackingResult.previous_hash.substring(0, 20)}...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-green-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Verify Authenticity</h3>
            </div>
            <p className="text-gray-600">
              Check if your medicine is authentic and hasn't been tampered with using blockchain verification.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Activity className="h-8 w-8 text-blue-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Track Journey</h3>
            </div>
            <p className="text-gray-600">
              See the complete journey of your medicine from manufacturer to pharmacy.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-purple-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Ensure Safety</h3>
            </div>
            <p className="text-gray-600">
              Protect yourself and your family by verifying medicine authenticity before use.
            </p>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">How to Verify Your Medicine</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Find Batch ID</h3>
                <p className="text-sm text-gray-600">
                  Look for the batch ID on your medicine packaging or prescription label.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Enter Batch ID</h3>
                <p className="text-sm text-gray-600">
                  Type the batch ID in the verification form above and click verify.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Check Results</h3>
                <p className="text-sm text-gray-600">
                  Review the verification results to confirm your medicine is authentic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Safety Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Always verify your medicine before use. If verification fails or you have any doubts about 
                  your medicine's authenticity, please consult your healthcare provider immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}