import React, { useState } from "react";

function CustomerForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [medicine, setMedicine] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/customers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          mobile,
          medicine,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setMessage("✅ Request submitted successfully!");
      setName("");
      setAddress("");
      setMobile("");
      setMedicine("");
      setQuantity("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Customer Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Medicine Name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        /><br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default CustomerForm;
