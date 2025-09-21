import React from "react";
import HospitalForm from "../../components/forms/HospitalForm";
import VerifyBatch from "../../components/verifybatch";

function HospitalDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hospital Dashboard</h1>
      <HospitalForm />
      <hr />
      <VerifyBatch />
    </div>
  );
}

export default HospitalDashboard;
