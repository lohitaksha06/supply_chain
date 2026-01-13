'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Search, Shield, Hospital, LogOut, CheckCircle, XCircle } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL, getAuthHeaders } from '@/lib/utils'

export default function HospitalDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [batchId, setBatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'hospital') {
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

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user || user.role !== 'hospital') {
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
                <Hospital className="w-4 h-4" />
                <span className="text-sm font-medium">{user.username || user.name}</span>
                <span className="text-xs text-gray-500">(Hospital)</span>
              </div>
              <Link
                href="/verify"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Verify Batch
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
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="mt-2 text-gray-600">Verify pharmaceutical batches and ensure medicine authenticity</p>
        </div>

        {/* Quick Verification Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Batch Verification</h2>
            <p className="text-sm text-gray-500">Enter a batch ID to verify its authenticity</p>
          </div>
          <div className="px-6 py-4">
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="batch_id" className="block text-sm font-medium text-gray-700">
                  Batch ID
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="batch_id"
                    id="batch_id"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                    placeholder="Enter batch ID (e.g., BATCH-2025-001)"
                  />
                  <button
                    type="submit"
                    disabled={loading || !batchId.trim()}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Search className="w-4 h-4 mr-2" />
                    )}
                    Verify
                  </button>
                </div>
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
                        {verificationResult.valid ? 'Batch Verified Successfully' : 'Batch Verification Failed'}
                      </h3>
                      <div className={`mt-2 text-sm ${
                        verificationResult.valid ? 'text-green-700' : 'text-red-700'
                      }`}>
                        <p>{verificationResult.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-green-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Medicine Verification</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Verify the authenticity of pharmaceutical batches using blockchain technology and digital signatures.
            </p>
            <Link
              href="/verify"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
            >
              Start Verification
              <Search className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-blue-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Supply Chain Tracking</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Track the complete journey of pharmaceutical products from manufacturer to your hospital.
            </p>
            <Link
              href="/track"
              className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium"
            >
              Track Batches
              <Package className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Verification Activity</h2>
          </div>
          <div className="px-6 py-8 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start verifying batches to see your activity history here.
            </p>
            <div className="mt-6">
              <Link
                href="/verify"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Verify Batch
              </Link>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600" />
              <h4 className="ml-2 text-sm font-medium text-blue-900">Secure Verification</h4>
            </div>
            <p className="mt-2 text-sm text-blue-700">
              All batches are verified using RSA digital signatures and blockchain hash verification.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h4 className="ml-2 text-sm font-medium text-green-900">Authentic Medicine</h4>
            </div>
            <p className="mt-2 text-sm text-green-700">
              Ensure all medicines received are authentic and haven't been tampered with.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center">
              <Hospital className="h-6 w-6 text-purple-600" />
              <h4 className="ml-2 text-sm font-medium text-purple-900">Patient Safety</h4>
            </div>
            <p className="mt-2 text-sm text-purple-700">
              Protect your patients by ensuring medicine authenticity and quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}