// pages/companyDashboard.tsx or components/companydashboard.tsx
import React from "react";
import CompanyForm from "../components/companyform";
import TrackerInput from "../components/trackerinput";
import BatchTable from "../components/batchtable";

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
