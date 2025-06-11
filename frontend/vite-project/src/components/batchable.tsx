import React, { useEffect, useState } from "react";

interface Batch {
  batch_id: string;
  medicine_name: string;
  source: string;
  destination: string;
  timestamp: string;
  hash: string;
}

function BatchTable() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tracker/all");
        if (!res.ok) throw new Error("Failed to fetch batches.");
        const data = await res.json();
        setBatches(data);
      } catch (err) {
        setError("❌ Could not load batch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>All Tracked Batches</h2>

      {loading && <p>Loading batches...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Medicine</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Timestamp</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.batch_id}>
                  <td>{batch.batch_id}</td>
                  <td>{batch.medicine_name}</td>
                  <td>{batch.source}</td>
                  <td>{batch.destination}</td>
                  <td>{new Date(batch.timestamp).toLocaleString()}</td>
                  <td style={{ fontSize: "0.7rem", wordBreak: "break-all" }}>
                    {batch.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BatchTable;
