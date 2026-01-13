'use client'

import Link from 'next/link'
import { Building2, Hospital, User, ArrowRight, Pill, Shield, Activity, Package } from 'lucide-react'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdfa' }}>
      {/* Header */}
      <header style={{ 
        width: '100%', 
        backgroundColor: 'white', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '20px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 40px',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              background: 'linear-gradient(135deg, #14b8a6, #06b6d4)', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Pill style={{ width: '28px', height: '28px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#0d9488' }}>PharmaChain</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              href="/auth/login"
              style={{ 
                padding: '16px 40px', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: '#0d9488',
                border: '3px solid #0d9488',
                borderRadius: '12px',
                textDecoration: 'none',
                backgroundColor: 'white'
              }}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              style={{ 
                padding: '16px 40px', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: 'white',
                backgroundColor: '#0d9488',
                borderRadius: '12px',
                textDecoration: 'none'
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ width: '100%', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            Track Your Medicine
          </h1>
          <h1 style={{ fontSize: '64px', fontWeight: 'bold', color: '#0d9488', marginBottom: '30px' }}>
            With Blockchain
          </h1>
          
          <p style={{ fontSize: '24px', color: '#6b7280', marginBottom: '50px' }}>
            Verify medicine authenticity. Prevent counterfeits.
          </p>
          
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginBottom: '60px' }}>
            <Link
              href="/auth/signup"
              style={{ 
                padding: '24px 60px', 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: 'white',
                backgroundColor: '#0d9488',
                borderRadius: '16px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)'
              }}
            >
              Get Started <ArrowRight style={{ width: '28px', height: '28px' }} />
            </Link>
            <Link
              href="/track"
              style={{ 
                padding: '24px 60px', 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: '#0d9488',
                backgroundColor: 'white',
                border: '3px solid #0d9488',
                borderRadius: '16px',
                textDecoration: 'none'
              }}
            >
              Track Batch
            </Link>
          </div>

          {/* Visual Icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '80px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                backgroundColor: '#ccfbf1', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Shield style={{ width: '50px', height: '50px', color: '#0d9488' }} />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#374151' }}>Secure</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                backgroundColor: '#cffafe', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Activity style={{ width: '50px', height: '50px', color: '#0891b2' }} />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#374151' }}>Real-time</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '100px', 
                backgroundColor: '#d1fae5', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Package style={{ width: '50px', height: '50px', color: '#059669' }} />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#374151' }}>Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ width: '100%', padding: '80px 40px', backgroundColor: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '60px' }}>
            How It Works
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#14b8a6', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 10px 30px rgba(20, 184, 166, 0.4)'
              }}>
                <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>1</span>
              </div>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937' }}>Sign Up</p>
            </div>
            
            <ArrowRight style={{ width: '50px', height: '50px', color: '#d1d5db' }} />
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#06b6d4', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.4)'
              }}>
                <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>2</span>
              </div>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937' }}>Add Batch</p>
            </div>
            
            <ArrowRight style={{ width: '50px', height: '50px', color: '#d1d5db' }} />
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#10b981', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
              }}>
                <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>3</span>
              </div>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937' }}>Track & Verify</p>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Role */}
      <section style={{ width: '100%', padding: '80px 40px', backgroundColor: '#f0fdfa', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            Choose Your Role
          </h2>
          <p style={{ fontSize: '22px', color: '#6b7280', marginBottom: '60px' }}>
            Select how you want to use PharmaChain
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            {/* Company Card */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              padding: '50px 40px',
              width: '340px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#ccfbf1', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px auto'
              }}>
                <Building2 style={{ width: '60px', height: '60px', color: '#0d9488' }} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Company</h3>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px' }}>Add & manage medicine batches</p>
              <Link
                href="/auth/signup"
                style={{ 
                  display: 'block',
                  padding: '20px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  backgroundColor: '#0d9488',
                  borderRadius: '12px',
                  textDecoration: 'none'
                }}
              >
                Join as Company
              </Link>
            </div>

            {/* Hospital Card */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              padding: '50px 40px',
              width: '340px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#d1fae5', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px auto'
              }}>
                <Hospital style={{ width: '60px', height: '60px', color: '#059669' }} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Hospital</h3>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px' }}>Receive & verify medicines</p>
              <Link
                href="/auth/signup"
                style={{ 
                  display: 'block',
                  padding: '20px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  backgroundColor: '#059669',
                  borderRadius: '12px',
                  textDecoration: 'none'
                }}
              >
                Join as Hospital
              </Link>
            </div>

            {/* Customer Card */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '24px', 
              padding: '50px 40px',
              width: '340px',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: '#cffafe', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 30px auto'
              }}>
                <User style={{ width: '60px', height: '60px', color: '#0891b2' }} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Customer</h3>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px' }}>Track & verify your medicine</p>
              <Link
                href="/auth/signup"
                style={{ 
                  display: 'block',
                  padding: '20px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  backgroundColor: '#0891b2',
                  borderRadius: '12px',
                  textDecoration: 'none'
                }}
              >
                Join as Customer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ width: '100%', padding: '80px 40px', backgroundColor: '#0d9488', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '22px', color: '#99f6e4', marginBottom: '40px' }}>
            Join thousands using PharmaChain today.
          </p>
          <Link
            href="/auth/signup"
            style={{ 
              display: 'inline-block',
              padding: '24px 80px', 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#0d9488',
              backgroundColor: 'white',
              borderRadius: '16px',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ width: '100%', padding: '30px 40px', backgroundColor: '#1f2937', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Pill style={{ width: '28px', height: '28px', color: '#14b8a6' }} />
            <span style={{ fontSize: '22px', fontWeight: 'bold', color: 'white' }}>PharmaChain</span>
          </div>
          <p style={{ color: '#9ca3af' }}>© 2026 PharmaChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
