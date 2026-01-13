# PharmaChain: Blockchain-Powered Pharmaceutical Supply Tracker

PharmaChain is a full-stack application designed to enhance pharmaceutical supply chain transparency and security. It combines blockchain concepts such as hash chaining, Merkle tree verification, and digital signatures to help companies, hospitals, and customers trace medicine batches securely.

---

## 🌟 Features

- ✅ **Hash Chain for Batches**  
  Each medicine batch is cryptographically linked to the previous batch using SHA-256 hashes, creating an immutable history.

- ✅ **Merkle Tree Root Verification**  
  Batches can be grouped, and their integrity verified efficiently via Merkle tree roots stored alongside batch data.

- ✅ **Digital Signatures (RSA)**  
  Batches are signed digitally to ensure data authenticity and prevent tampering.

- ✅ **On-Chain Proof Storage (Simulated)**  
  Important proofs like batch hashes and Merkle roots are stored in a dedicated on-chain table.

- ✅ **Company, Hospital, Customer Records**  
  Managed securely in a relational database using SQLx with SQLite.

- ✅ **Modern Web Frontend**  
  Beautiful, responsive Next.js frontend with role-based dashboards.

---

## 💻 Tech Stack

### Backend
- **Rust** (main language)
- **Axum** (web server / API framework)
- **SQLx + SQLite** (database interaction)
- **SHA-256 (sha2)** (hashing for batch data)
- **RSA (rsa crate)** (digital signatures)
- **Chrono** (timestamps)
- **UUID** (unique IDs)
- **dotenv** (config management)

### Frontend
- **Next.js 15** (React framework)
- **TypeScript** (type safety)
- **TailwindCSS** (styling)
- **Axios** (HTTP client)
- **Lucide React** (icons)

---

## 🚀 Getting Started

### Prerequisites
- Rust (latest stable version)
- Node.js 18+ and pnpm
- SQLite

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file (already created):
   ```
   DATABASE_URL=sqlite:./pharmachain.db
   ```

3. Build and run the backend:
   ```bash
   cargo build
   cargo run
   ```
   The backend will start at `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```
   The frontend will start at `http://localhost:3000`

---

## 📌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/signup` | POST | Register a new user |
| `/api/login` | POST | Login user |
| `/api/company/signup` | POST | Register a company |
| `/api/hospital/signup` | POST | Register a hospital |
| `/api/customer/signup` | POST | Register a customer |
| `/companies/batches` | GET | Get all batches |
| `/companies/batch` | POST | Add a new batch |
| `/api/tracker/add` | POST | Add batch with hash chaining |
| `/api/tracker/verify/:batch_id` | GET | Verify a specific batch |
| `/api/tracker/verifychain` | GET | Verify entire hash chain |
| `/api/tracker/merkleroot` | GET | Get Merkle root of all batches |
| `/verify` | POST | Verify batch (JSON body) |
| `/track` | POST | Track batch (JSON body) |
| `/batch/:batch_id` | GET | Get batch details |

---

## 🔮 How it Works

1️⃣ Medicine batches are inserted into the database.  
2️⃣ Each batch includes:
- A SHA-256 hash that chains to the previous batch
- A Merkle root for integrity verification
- A digital signature for authenticity  
3️⃣ Proofs are stored in a simulated "on-chain" table.  
4️⃣ Users can verify medicine authenticity through the web interface.

---

## 📂 Project Structure

```
supply-chain/
├── backend/
│   ├── src/
│   │   ├── main.rs
│   │   ├── models.rs
│   │   ├── db/
│   │   │   ├── mod.rs
│   │   │   └── entities.rs
│   │   ├── routes/
│   │   │   ├── mod.rs
│   │   │   ├── auth.rs
│   │   │   ├── company.rs
│   │   │   ├── hospital.rs
│   │   │   ├── customer.rs
│   │   │   └── tracker.rs
│   │   └── utils/
│   │       ├── mod.rs
│   │       └── merkle.rs
│   ├── Cargo.toml
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx (Home)
│   │   │   ├── layout.tsx
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── verify/
│   │   │   └── track/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── lib/
│   │   └── types/
│   ├── package.json
│   └── tailwind.config.ts
└── README.md
```

---

## 🔮 Future Enhancements

- 🌐 Real blockchain integration (Ethereum/Solana)
- 📊 Enhanced analytics dashboard
- 🔑 JWT-based authentication
- 📱 Mobile application
- 📝 Paper/publication on architecture

---

## ✨ Author

Built by **Lohitaksha Patary**