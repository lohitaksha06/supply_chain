// pages/companyDashboard.tsx or components/companydashboard.tsx
import React from "react";
import CompanyForm from "../../components/companyform.tsx";
import TrackerInput from "../../components/trackerinput.tsx";
import BatchTable from "../../components/batchable.tsx";


function CompanyDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Company Dashboard</h1>
      <CompanyForm />
      <hr />
      <TrackerInput />
      <hr />
      <BatchTable />
    </div>
  );
}

export default CompanyDashboard;
