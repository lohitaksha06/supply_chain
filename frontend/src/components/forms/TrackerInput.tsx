import React, { useState } from "react";

function TrackerInput() {
  const [batchId, setBatchId] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    if (!batchId.trim()) {
      setError("❌ Please enter a valid Batch ID.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/tracker/view/${batchId}`);
      if (!res.ok) {
        throw new Error("Batch not found or server error");
      }
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setError("❌ Failed to fetch batch details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Track a Medicine Batch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{ marginLeft: "1rem" }}>
          {loading ? "Tracking..." : "Track"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
      )}

      {result && (
        <pre
          style={{
            marginTop: "1rem",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          {result}
        </pre>
      )}
    </div>
  );
}

export default TrackerInput;
