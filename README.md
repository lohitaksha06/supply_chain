# PharmaChain: Blockchain-Powered Pharmaceutical Supply Tracker

PharmaChain is a Rust-based backend system designed to enhance pharmaceutical supply chain transparency and security. It combines blockchain concepts such as hash chaining, Merkle tree verification, and digital signatures to help companies, hospitals, and customers trace medicine batches securely.

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

---

## 💻 Tech Stack

- **Rust** (main language)
- **Axum** (web server / API framework)
- **SQLx + SQLite** (database interaction)
- **SHA-256 (sha2)** (hashing for batch data)
- **RSA (rsa crate)** (digital signatures)
- **Chrono** (timestamps)
- **UUID** (unique IDs)
- **dotenv** (config management)

---

## 📌 API Highlights

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/add_company` | POST | Add a company |
| `/add_hospital` | POST | Add a hospital |
| `/add_customer` | POST | Add a customer |
| `/add_batch_with_hash` | POST | Add a medicine batch with hash chaining and Merkle root |
| `/verify_batch` | GET | Verify batch hash chain / signature (planned) |

👉 *More endpoints can be added as the system evolves.*

---

## 🚀 How it Works

1️⃣ Medicine batches are inserted into the database.  
2️⃣ Each batch includes:
- A SHA-256 hash that chains to the previous batch
- A Merkle root for integrity verification
- A digital signature for authenticity  
3️⃣ Proofs are stored in a simulated "on-chain" table.

---

## 🔮 Future Enhancements

- 🌐 Real blockchain integration (Ethereum/Solana)
- 📊 Frontend dashboard for live tracking
- 🔑 Key management system for signatures
- 📝 Paper/publication on architecture

---

## 📂 Project Structure (Sample)

## ✨ Author

Built by **Lohitaksha Patary**