'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import {
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  Search,
  AlertTriangle,
  Truck
} from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL, getAuthHeaders } from '@/lib/utils'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [batchId, setBatchId] = useState('')
  const [loading, setLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'verify' | 'track'>('verify')

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

  if (!user || user.role !== 'customer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <DashboardLayout title="Dashboard" subtitle="Verify medicine authenticity">
      {/* Main Card */}
      <div className="max-w-3xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold transition-all ${
              activeTab === 'verify'
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-300'
            }`}
          >
            <Shield className="w-6 h-6" />
            Verify Medicine
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold transition-all ${
              activeTab === 'track'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
            }`}
          >
            <Activity className="w-6 h-6" />
            Track Batch
          </button>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activeTab === 'verify' ? 'Verify Your Medicine' : 'Track Your Batch'}
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            {activeTab === 'verify' 
              ? 'Enter the batch ID from your medicine packaging to check authenticity'
              : 'Enter the batch ID to see the complete supply chain journey'
            }
          </p>

          <form onSubmit={activeTab === 'verify' ? handleVerify : handleTrack}>
            <div className="mb-6">
              <label className="block text-base font-semibold text-gray-700 mb-3">
                Batch ID
              </label>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  placeholder="e.g., BATCH-2025-001"
                  className="w-full pl-14 pr-6 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !batchId.trim()}
              className={`w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-xl font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                activeTab === 'verify'
                  ? 'bg-teal-600 hover:bg-teal-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : activeTab === 'verify' ? (
                <>
                  <Shield className="w-6 h-6" />
                  Verify Authenticity
                </>
              ) : (
                <>
                  <Activity className="w-6 h-6" />
                  Track Supply Chain
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-800">Error</h3>
                <p className="text-lg text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className={`rounded-2xl p-6 mb-8 border-2 ${
            verificationResult.valid
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                verificationResult.valid ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {verificationResult.valid ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <XCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${
                  verificationResult.valid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {verificationResult.valid ? '✓ Medicine is Authentic' : '✗ Verification Failed'}
                </h3>
                <p className={`text-lg mt-2 ${
                  verificationResult.valid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {verificationResult.message}
                </p>
                {verificationResult.valid && (
                  <p className="text-green-600 mt-3">
                    This medicine has been verified as safe to use.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Result */}
        {trackingResult && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-blue-800">Supply Chain Info</h3>
                <p className="text-lg text-blue-700 mt-2">{trackingResult.message}</p>
                {trackingResult.batch_hash && (
                  <div className="mt-4 p-4 bg-white rounded-xl">
                    <p className="text-base text-blue-800">
                      <span className="font-bold">Hash:</span>{' '}
                      <code className="text-sm bg-blue-100 px-2 py-1 rounded">
                        {trackingResult.batch_hash.substring(0, 40)}...
                      </code>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Safety Notice */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-800">Safety Notice</h3>
              <p className="text-lg text-amber-700 mt-1">
                Always verify your medicine before use. If verification fails, consult your healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}