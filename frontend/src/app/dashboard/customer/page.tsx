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
  Truck,
  Building2,
  Hospital,
  ArrowRight
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
    <DashboardLayout title="Customer Dashboard" subtitle="Verify and track your medicines">
      {/* Full Width Centered Container */}
      <div className="w-full flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="text-center mb-20 max-w-4xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-8">
            Ensure Your Medicine is Authentic
          </h2>
          <p className="text-2xl text-gray-500 leading-relaxed">
            Use our blockchain-powered verification system to check if your medicine is genuine and track its journey from manufacturer to you.
          </p>
        </div>

        {/* Tab Buttons - BIG AND CENTERED WITH GAP */}
        <div className="flex justify-center gap-12 mb-20">
          <button
            onClick={() => { setActiveTab('verify'); setError(''); setVerificationResult(null); setTrackingResult(null); }}
            className={`flex items-center justify-center gap-5 py-8 px-16 rounded-3xl text-2xl font-bold transition-all duration-300
              ${activeTab === 'verify' 
                ? 'bg-teal-600 text-white shadow-2xl scale-105 ring-4 ring-teal-200' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-teal-400 hover:shadow-lg'}`}
          >
            <Shield className="w-10 h-10" />
            Verify Medicine
          </button>
          <button
            onClick={() => { setActiveTab('track'); setError(''); setVerificationResult(null); setTrackingResult(null); }}
            className={`flex items-center justify-center gap-5 py-8 px-16 rounded-3xl text-2xl font-bold transition-all duration-300
              ${activeTab === 'track' 
                ? 'bg-blue-600 text-white shadow-2xl scale-105 ring-4 ring-blue-200' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg'}`}
          >
            <Activity className="w-10 h-10" />
            Track Batch
          </button>
        </div>

        {/* Main Content Card - CENTERED */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-14 mb-20 w-full max-w-4xl border border-gray-100">
          {/* Card Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 ${activeTab === 'verify' ? 'bg-teal-100' : 'bg-blue-100'}`}>
              {activeTab === 'verify' ? (
                <Shield className="w-14 h-14 text-teal-600" />
              ) : (
                <Activity className="w-14 h-14 text-blue-600" />
              )}
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {activeTab === 'verify' ? 'Verify Your Medicine' : 'Track Your Batch'}
            </h3>
            <p className="text-xl text-gray-500 max-w-xl mx-auto">
              {activeTab === 'verify' 
                ? 'Enter the batch ID from your medicine packaging to check authenticity' 
                : 'Enter the batch ID to see the complete supply chain journey'}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={activeTab === 'verify' ? handleVerify : handleTrack} className="space-y-8">
            <div className="relative">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter Batch ID (e.g., BATCH-2025-001)"
                className="w-full pl-20 pr-8 py-8 text-2xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !batchId.trim()}
              className={`w-full flex items-center justify-center gap-5 text-white text-2xl font-bold py-8 rounded-2xl transition-all shadow-xl hover:shadow-2xl disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none
                ${activeTab === 'verify' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? (
                <>
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {activeTab === 'verify' ? <Shield className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                  {activeTab === 'verify' ? 'Verify Authenticity' : 'Track Supply Chain'}
                  <ArrowRight className="w-8 h-8" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-4xl bg-red-50 border-2 border-red-200 rounded-2xl p-10 mb-20">
            <div className="flex items-center justify-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-red-500 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-800 mb-2">Error</h3>
                <p className="text-xl text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className={`w-full max-w-4xl rounded-2xl p-10 mb-20 border-2 ${
            verificationResult.valid
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex flex-col items-center text-center gap-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                verificationResult.valid ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {verificationResult.valid ? (
                  <CheckCircle className="w-14 h-14 text-white" />
                ) : (
                  <XCircle className="w-14 h-14 text-white" />
                )}
              </div>
              <div>
                <h3 className={`text-4xl font-bold mb-4 ${
                  verificationResult.valid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {verificationResult.valid ? '✓ Medicine is Authentic' : '✗ Verification Failed'}
                </h3>
                <p className={`text-2xl ${
                  verificationResult.valid ? 'text-green-700' : 'text-red-700'
                }`}>
                  {verificationResult.message}
                </p>
                {verificationResult.valid && (
                  <p className="text-xl text-green-600 mt-4">
                    This medicine has been verified as safe to use.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Result */}
        {trackingResult && (
          <div className="w-full max-w-4xl bg-blue-50 border-2 border-blue-200 rounded-2xl p-10 mb-20">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                <Truck className="w-14 h-14 text-white" />
              </div>
              <div>
                <h3 className="text-4xl font-bold text-blue-800 mb-4">Supply Chain Info</h3>
                <p className="text-2xl text-blue-700">{trackingResult.message}</p>
                {trackingResult.batch_hash && (
                  <div className="mt-6 p-6 bg-white rounded-xl">
                    <p className="text-xl text-blue-800">
                      <span className="font-bold">Hash:</span>{' '}
                      <code className="text-lg bg-blue-100 px-4 py-2 rounded-lg">
                        {trackingResult.batch_hash.substring(0, 40)}...
                      </code>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Supply Chain Steps - INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-12 mb-20 w-full max-w-5xl">
          <div className="bg-white rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition-all border border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <Building2 className="w-12 h-12 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">Manufacturer</h4>
            <p className="text-lg text-gray-500">Medicine produced with strict quality control standards</p>
          </div>
          <div className="bg-white rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition-all border border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-100 rounded-full mb-6">
              <Truck className="w-12 h-12 text-amber-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">In Transit</h4>
            <p className="text-lg text-gray-500">Secure transportation with blockchain tracking</p>
          </div>
          <div className="bg-white rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition-all border border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <Hospital className="w-12 h-12 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">Delivered</h4>
            <p className="text-lg text-gray-500">Safe delivery to pharmacy or hospital</p>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="w-full max-w-4xl bg-amber-50 border-2 border-amber-200 rounded-2xl p-10 flex items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <p className="text-amber-800 font-bold text-2xl mb-2">Safety Notice</p>
            <p className="text-amber-700 text-xl">
              Always verify your medicine before use. If verification fails, do not consume the medicine and consult your healthcare provider immediately.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}