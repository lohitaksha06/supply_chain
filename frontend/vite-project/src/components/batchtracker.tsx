import { useState } from "react";
import axios from "axios";

const BatchTracker = () => {
  const [batchId, setBatchId] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/tracker/add", {
        batch_id: batchId,
        medicine_name: medicineName,
        source,
        destination,
      });
      setResponse(res.data);
    } catch (err) {
      console.error("Error adding batch", err);
    }
  };

  return (
    <div>
      <h2>Add New Medicine Batch</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Batch ID" value={batchId} onChange={(e) => setBatchId(e.target.value)} required />
        <input type="text" placeholder="Medicine Name" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} required />
        <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} required />
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <button type="submit">Add Batch</button>
      </form>

      {response && (
        <div style={{ marginTop: "1rem" }}>
          <h4>✅ Batch Added:</h4>
          <p><strong>Hash:</strong> {response.batch_hash}</p>
          <p><strong>Previous Hash:</strong> {response.previous_hash}</p>
          <p><strong>Signature:</strong> {response.signature}</p>
          <p><strong>Public Key:</strong> {response.public_key}</p>
        </div>
      )}
    </div>
  );
};

export default BatchTracker;
