# PharmaChain Frontend - Supply Chain Tracking System

## Overview
This is a modern Next.js 15 application built with TypeScript and Tailwind CSS for pharmaceutical supply chain tracking and verification using blockchain technology.

## Features Built

### 🏠 **Homepage** (`/`)
- Beautiful landing page with gradient background
- Features showcase (Digital Signatures, Real-time Tracking, Supply Chain Integrity)
- Role-based registration cards (Company, Hospital, Customer)
- Clean navigation and footer

### 🔐 **Authentication System**
- **Login Page** (`/auth/login`) - Email/password authentication
- **Signup Page** (`/auth/signup`) - Role-based registration with form validation
- **AuthContext** - Global authentication state management
- JWT token handling and localStorage persistence

### 📊 **Role-Based Dashboards**

#### **Company Dashboard** (`/dashboard/company`)
- View all registered batches
- Statistics cards (Total, Active, Verified batches)
- Add new batch functionality
- Digital signature verification indicators

#### **Add Batch Page** (`/dashboard/company/add-batch`)
- Complete form for registering new pharmaceutical batches
- Fields: Batch ID, Medicine Name, Source, Destination, Expiry Date
- Blockchain registration with user feedback

#### **Hospital Dashboard** (`/dashboard/hospital`)
- Quick batch verification interface
- Real-time verification results
- Features cards for verification and tracking
- Patient safety focused UI

#### **Customer Dashboard** (`/dashboard/customer`)
- Medicine authenticity verification
- Supply chain tracking capabilities
- Step-by-step verification guide
- Safety warnings and instructions

### 🔍 **Verification & Tracking**

#### **Verify Page** (`/verify`)
- Standalone verification page accessible to all users
- Batch authenticity checking using blockchain
- Real-time verification results with detailed feedback
- Digital signature and hash verification

#### **Track Page** (`/track`)
- Supply chain tracking functionality
- Blockchain hash verification
- Visual supply chain flow diagram
- Complete batch journey tracking

#### **Batch Details Page** (`/batch/[id]`)
- Dynamic route for individual batch information
- Complete batch metadata display
- Blockchain details (hashes, signatures, public keys)
- Verification status indicators

## Technical Architecture

### **Tech Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API

### **Key Components**
- `AuthContext` - Authentication state management
- Role-based routing and access control
- Responsive design for all screen sizes

### **API Integration**
- **Base URL**: `http://localhost:3001` (Rust backend)
- **Endpoints**:
  - `/auth/login` - User authentication
  - `/auth/signup` - User registration
  - `/companies/batch` - Add new batch (POST)
  - `/companies/batches` - Get company batches (GET)
  - `/verify` - Verify batch authenticity (POST)
  - `/track` - Track batch supply chain (POST)
  - `/batch/:id` - Get batch details (GET)

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Status
✅ **Completed Features**:
- Complete authentication system
- All role-based dashboards
- Batch verification and tracking
- Responsive UI design
- API integration
- TypeScript interfaces
- Error handling

🔄 **Ready for Testing**:
- All pages functional and styled
- Backend integration ready
- Development server running on http://localhost:3000

## Security Features
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Different permissions for each user type
- **Digital Signatures** - RSA cryptographic verification
- **Blockchain Hashing** - Tamper-evident batch tracking
- **Input Validation** - Form validation and sanitization
- **Protected Routes** - Authentication required for sensitive areas

## User Experience Features
- **Responsive Design** - Works on all device sizes
- **Loading States** - Smooth user feedback during API calls
- **Error Handling** - Comprehensive error messages and recovery
- **Form Validation** - Real-time validation with helpful messages
- **Modern UI** - Clean, professional design with Tailwind CSS
- **Accessibility** - Proper ARIA labels and keyboard navigation
