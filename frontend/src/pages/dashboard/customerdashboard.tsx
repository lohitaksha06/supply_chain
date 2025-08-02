import React from "react";
import VerifyBatch from "../../components/verifybatch";
import CustomerForm from "../../components/customer";

function CustomerDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Customer Dashboard</h1>
      <CustomerForm />
      <hr />
      <VerifyBatch />
    </div>
  );
}

export default CustomerDashboard;
