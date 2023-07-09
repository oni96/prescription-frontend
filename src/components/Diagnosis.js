import React, { useContext, useEffect, useState } from "react";
import { PatientContext } from "../context/PatientContext";


const Diagnosis = ({onNextStep, onPrevStep, isPreview}) => {
  const [diagnosis, setDiagnosis] = useState('');
  const { updatePatientDetails, patientDetails } = useContext(PatientContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePatientDetails({...patientDetails, diagnosis})
    onNextStep()
    // Perform form submission logic here
  };

  useEffect(() => {
    if(patientDetails?.diagnosis) setDiagnosis(patientDetails.diagnosis)
  }, [])
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="diagnosis" className="form-label">Diagnosis:</label>
        <textarea
          disabled={isPreview}
          id="diagnosis"
          value={diagnosis}
          onChange={(event) => setDiagnosis(event.target.value)}
          className="form-control"
          style={{ height: '150px' }} // Adjust the height as desired
        />
      </div>
      <div style={{ width: "100%" }} hidden={isPreview} >
        {" "}
        <button
          className="btn btn-primary"
          onClick={()=>{onPrevStep();updatePatientDetails({...patientDetails, diagnosis});}}
          style={{ float: "left" }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ float: "right" }}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Diagnosis;
