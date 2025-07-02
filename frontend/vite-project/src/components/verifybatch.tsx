import { useState } from "react";
import axios from "axios";

function VerifyBatch() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!batchId.trim()) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await axios.get(`http://localhost:3000/api/tracker/verify/${batchId}`);
      setResult(res.data);
    } catch (err) {
      setError("Batch not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>🔍 Verify Medicine Batch</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleVerify}
          style={{
            padding: "10px 16px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: batchId ? "pointer" : "not-allowed",
            opacity: batchId ? 1 : 0.6,
          }}
          disabled={!batchId || loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {result && (
        <div style={{ color: result.valid ? "green" : "red", fontWeight: "bold" }}>
          ✅ {result.message}
        </div>
      )}

      {error && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
}

export default VerifyBatch;
