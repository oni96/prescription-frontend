import React from "react";
import PatientDetails from "./PatientDetails";
import Diagnosis from "./Diagnosis";
import Medicine from "./Medicine";
import OtherTreatments from "./OtherTreatments";

export default function PreviewComponent() {
  return (
    <div>
      <h1>Prescription Preview</h1>
      <hr />
      <h3>Patient Details</h3>
      <PatientDetails isPreview={true}/>
      <hr />
      <h3>Diagnosis</h3>
      <Diagnosis isPreview={true}/>
      <hr />
      <h3>Medicine Advice</h3>
      <Medicine isPreview={true}/>
      <hr />
      <h3>Other Treatments</h3>
      <OtherTreatments isPreview={true}/>
    </div>
  );
}
