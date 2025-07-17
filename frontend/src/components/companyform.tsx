import React, { useState } from "react";

function CompanyForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [stockNeeded, setStockNeeded] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/companies/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          license_id: licenseId,
          stock_needed: stockNeeded,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register company");
      }

      setMessage("✅ Company registered successfully!");
      // Reset form
      setName("");
      setLocation("");
      setLicenseId("");
      setStockNeeded("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
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
          placeholder="License ID"
          value={licenseId}
          onChange={(e) => setLicenseId(e.target.value)}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Stock Needed"
          value={stockNeeded}
          onChange={(e) => setStockNeeded(e.target.value)}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Company"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default CompanyForm;

