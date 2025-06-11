import React, { useState } from "react";

function HospitalForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [medicineNeeded, setMedicineNeeded] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/hospitals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          registration_id: registrationId,
          medicine_needed: medicineNeeded,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register hospital");
      }

      setMessage("✅ Hospital registered successfully!");
      setName("");
      setLocation("");
      setRegistrationId("");
      setMedicineNeeded("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Register Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Hospital Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Registration ID"
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Medicine Needed"
          value={medicineNeeded}
          onChange={(e) => setMedicineNeeded(e.target.value)}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Hospital"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default HospitalForm;
