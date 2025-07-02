// components/VerifyBatch.tsx
import { useState } from "react";
import axios from "axios";

function VerifyBatch() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tracker/verify/${batchId}`);
      setResult(res.data);
      setError("");
    } catch (err: any) {
      setError("Batch not found or API error.");
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Verify Medicine Batch</h2>
      <input
        type="text"
        placeholder="Enter Batch ID"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleVerify} style={{ padding: "8px 16px" }}>
        Verify
      </button>

      {result && (
        <div style={{ marginTop: "20px", color: result.valid ? "green" : "red" }}>
          <strong>{result.message}</strong>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
}

export default VerifyBatch;
