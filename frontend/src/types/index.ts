export interface User {
  id: string
  username: string
  name: string
  email: string
  role: 'company' | 'hospital' | 'customer'
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  username: string
  email: string
  password: string
  role: string
}

export interface LoginResponse {
  token: string
  user: string
  role: string
}

export interface ApiResponse {
  message: string
}

export interface Batch {
  id: string
  batch_id: string
  medicine_name: string
  source: string
  destination: string
  timestamp: string
  expiry_date: string
  hash: string
  previous_hash: string
  signature?: string
  public_key?: string
  status: 'active' | 'expired' | 'delivered'
}

export interface TrackerResponse {
  message: string
  batch_hash: string
  previous_hash: string
  signature: string
  public_key: string
}

export interface VerifyResponse {
  valid: boolean
  message: string
}

export interface Company {
  id: string
  name: string
  location: string
  license_id: string
  stock_needed: string
}

export interface Hospital {
  id: string
  name: string
  location: string
  registration_id: string
}

export interface Customer {
  id: string
  name: string
  location: string
  registration_id: string
}