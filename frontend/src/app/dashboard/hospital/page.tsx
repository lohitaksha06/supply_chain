'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'
import {
  Shield,
  CheckCircle,
  XCircle,
  Search,
  Activity,
  AlertTriangle,
  Truck
} from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL, getAuthHeaders } from '@/lib/utils'

export default function HospitalDashboard() {
  const { user } = useAuth()
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

  if (!user || user.role !== 'hospital') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <DashboardLayout title="Dashboard" subtitle="Verify pharmaceutical batches">
      <div className="max-w-3xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Link
            href="/verify"
            className="flex items-center gap-4 px-6 py-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-emerald-300 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">Verify Batch</p>
              <p className="text-base text-gray-500">Check authenticity</p>
            </div>
          </Link>
          <Link
            href="/track"
            className="flex items-center gap-4 px-6 py-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">Track Supply</p>
              <p className="text-base text-gray-500">View supply chain</p>
            </div>
          </Link>
        </div>

        {/* Quick Verification */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Verification</h2>
          <p className="text-lg text-gray-500 mb-8">Enter a batch ID to verify its authenticity</p>

          <form onSubmit={handleVerify}>
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
                  className="w-full pl-14 pr-6 py-5 text-xl border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !batchId.trim()}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-6 h-6" />
                  Verify Batch
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error */}
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

        {/* Result */}
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
                  {verificationResult.valid ? '✓ Batch Verified' : '✗ Verification Failed'}
                </h3>
                <p className={`text-lg mt-2 ${
                  verificationResult.valid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {verificationResult.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <Shield className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-blue-900">Secure</h4>
            <p className="text-sm text-blue-700 mt-1">Blockchain verified</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-bold text-green-900">Authentic</h4>
            <p className="text-sm text-green-700 mt-1">Tamper-proof</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
            <Activity className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-bold text-purple-900">Traceable</h4>
            <p className="text-sm text-purple-700 mt-1">Full history</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}