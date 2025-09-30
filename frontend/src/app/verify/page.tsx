'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Search, Shield, LogOut, CheckCircle, XCircle, Activity, Building2, Hospital, User } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL, getAuthHeaders } from '@/lib/utils'

export default function VerifyPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [batchId, setBatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [error, setError] = useState('')

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
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">({user.role})</span>
                  </div>
                  <Link
                    href={`/dashboard/${user.role}`}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
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
          <h1 className="text-3xl font-bold text-gray-900">Verify Medicine Authenticity</h1>
          <p className="mt-2 text-gray-600">
            Enter a batch ID to verify medicine authenticity and track its supply chain journey
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Batch Verification</h2>
            <p className="text-sm text-gray-500">Enter the batch ID found on your medicine packaging</p>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={handleVerify} className="space-y-6">
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
                <p className="mt-2 text-sm text-gray-500">
                  The batch ID is typically printed on the medicine box or label
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading || !batchId.trim()}
                  className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-3" />
                      Verify Authenticity
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleTrack}
                  disabled={loading || !batchId.trim()}
                  className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-3"></div>
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5 mr-3" />
                      Track Supply Chain
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <XCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Verification Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {verificationResult && (
          <div className={`mb-6 rounded-md p-4 ${
            verificationResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex">
              {verificationResult.valid ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <XCircle className="h-6 w-6 text-red-400" />
              )}
              <div className="ml-3">
                <h3 className={`text-lg font-medium ${
                  verificationResult.valid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {verificationResult.valid ? '✅ Medicine is Authentic' : '❌ Verification Failed'}
                </h3>
                <div className={`mt-2 text-sm ${
                  verificationResult.valid ? 'text-green-700' : 'text-red-700'
                }`}>
                  <p className="font-medium">{verificationResult.message}</p>
                  {verificationResult.valid ? (
                    <div className="mt-3 space-y-1">
                      <p>✓ Digital signature verified</p>
                      <p>✓ Blockchain hash confirmed</p>
                      <p>✓ Medicine is safe to use</p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="font-medium">⚠️ Do not use this medicine</p>
                      <p>Please consult your healthcare provider immediately.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {trackingResult && (
          <div className="mb-6 rounded-md bg-blue-50 border border-blue-200 p-4">
            <div className="flex">
              <Activity className="h-6 w-6 text-blue-400" />
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-800">Supply Chain Information</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p className="font-medium mb-2">{trackingResult.message}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {trackingResult.batch_hash && (
                      <div>
                        <p className="font-medium">Batch Hash:</p>
                        <p className="text-xs font-mono bg-blue-100 p-2 rounded break-all">
                          {trackingResult.batch_hash}
                        </p>
                      </div>
                    )}
                    {trackingResult.previous_hash && (
                      <div>
                        <p className="font-medium">Previous Hash:</p>
                        <p className="text-xs font-mono bg-blue-100 p-2 rounded break-all">
                          {trackingResult.previous_hash}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">How Verification Works</h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Digital Signatures</h3>
                <p className="text-sm text-gray-600">
                  Each batch is signed with RSA digital signatures by the manufacturer, ensuring authenticity.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Blockchain Verification</h3>
                <p className="text-sm text-gray-600">
                  Batches are stored on a secure blockchain with hash verification to prevent tampering.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Supply Chain Tracking</h3>
                <p className="text-sm text-gray-600">
                  Track the complete journey from manufacturer to pharmacy using Merkle tree verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Safety Information
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Always verify your medicine before use</li>
                  <li>If verification fails, do not use the medicine</li>
                  <li>Contact your healthcare provider if you have concerns</li>
                  <li>Report suspicious medicines to relevant authorities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}