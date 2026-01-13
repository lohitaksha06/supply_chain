'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  Camera,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Check
} from 'lucide-react'

export default function CustomerSettings() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'en'
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  })

  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    verificationAlerts: true,
    marketingEmails: false
  })

  useEffect(() => {
    if (!user || user.role !== 'customer') {
      router.push('/auth/login')
      return
    }
    // Pre-fill form with user data
    setProfileData({
      name: user.name || user.username || '',
      email: user.email || '',
      phone: '',
      language: 'en'
    })
  }, [user, router])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!user || user.role !== 'customer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences">
      <div className="w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Account Settings
          </h2>
          <p className="text-2xl text-gray-500">
            Manage your profile, security, and notification preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-8 mb-16">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-4 py-6 px-12 rounded-2xl text-xl font-bold transition-all
              ${activeTab === 'profile' 
                ? 'bg-teal-600 text-white shadow-xl' 
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-teal-400'}`}
          >
            <User className="w-7 h-7" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-4 py-6 px-12 rounded-2xl text-xl font-bold transition-all
              ${activeTab === 'security' 
                ? 'bg-teal-600 text-white shadow-xl' 
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-teal-400'}`}
          >
            <Shield className="w-7 h-7" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-4 py-6 px-12 rounded-2xl text-xl font-bold transition-all
              ${activeTab === 'notifications' 
                ? 'bg-teal-600 text-white shadow-xl' 
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-teal-400'}`}
          >
            <Bell className="w-7 h-7" />
            Notifications
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-14 w-full max-w-4xl border border-gray-100">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-10">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-12">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full bg-teal-100 flex items-center justify-center">
                    <User className="w-16 h-16 text-teal-600" />
                  </div>
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors shadow-lg">
                    <Camera className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-lg text-gray-500 mt-4">Click to upload new photo</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-8">
                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full pl-16 pr-6 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full pl-16 pr-6 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full pl-16 pr-6 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">Language</label>
                  <div className="relative">
                    <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <select
                      value={profileData.language}
                      onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                      className="w-full pl-16 pr-6 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none appearance-none bg-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-100 rounded-full mb-4">
                  <Shield className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Security Settings</h3>
                <p className="text-xl text-gray-500 mt-2">Keep your account safe and secure</p>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                      className="w-full pl-16 pr-16 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                      className="w-full pl-16 pr-6 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xl font-bold text-gray-700 mb-4">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                      className="w-full pl-16 pr-6 py-6 text-xl border-2 border-gray-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all outline-none"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                {/* Two Factor Toggle */}
                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-lg text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSecurityData({...securityData, twoFactorEnabled: !securityData.twoFactorEnabled})}
                    className={`w-20 h-10 rounded-full transition-all ${securityData.twoFactorEnabled ? 'bg-teal-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${securityData.twoFactorEnabled ? 'translate-x-11' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-teal-100 rounded-full mb-4">
                  <Bell className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Notification Preferences</h3>
                <p className="text-xl text-gray-500 mt-2">Choose how you want to be notified</p>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Email Notifications</h4>
                      <p className="text-lg text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationData({...notificationData, emailNotifications: !notificationData.emailNotifications})}
                    className={`w-20 h-10 rounded-full transition-all ${notificationData.emailNotifications ? 'bg-teal-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${notificationData.emailNotifications ? 'translate-x-11' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Push Notifications */}
                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <Bell className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Push Notifications</h4>
                      <p className="text-lg text-gray-500">Get instant alerts on your device</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationData({...notificationData, pushNotifications: !notificationData.pushNotifications})}
                    className={`w-20 h-10 rounded-full transition-all ${notificationData.pushNotifications ? 'bg-teal-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${notificationData.pushNotifications ? 'translate-x-11' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Verification Alerts */}
                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Verification Alerts</h4>
                      <p className="text-lg text-gray-500">Get notified about verification results</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationData({...notificationData, verificationAlerts: !notificationData.verificationAlerts})}
                    className={`w-20 h-10 rounded-full transition-all ${notificationData.verificationAlerts ? 'bg-teal-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${notificationData.verificationAlerts ? 'translate-x-11' : 'translate-x-1'}`} />
                  </button>
                </div>

                {/* Marketing Emails */}
                <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                      <Globe className="w-8 h-8 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Marketing Emails</h4>
                      <p className="text-lg text-gray-500">Receive news and promotions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotificationData({...notificationData, marketingEmails: !notificationData.marketingEmails})}
                    className={`w-20 h-10 rounded-full transition-all ${notificationData.marketingEmails ? 'bg-teal-600' : 'bg-gray-300'}`}
                  >
                    <div className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${notificationData.marketingEmails ? 'translate-x-11' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              onClick={handleSave}
              className={`w-full flex items-center justify-center gap-4 py-6 rounded-2xl text-xl font-bold transition-all
                ${saved 
                  ? 'bg-green-600 text-white' 
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xl hover:shadow-2xl'}`}
            >
              {saved ? (
                <>
                  <Check className="w-7 h-7" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Save className="w-7 h-7" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
