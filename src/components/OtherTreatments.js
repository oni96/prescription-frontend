import React, { useContext, useState, useEffect } from "react";
import { PatientContext } from "../context/PatientContext";

const OtherTreatments = ({ onNextStep, onPrevStep, isPreview }) => {
  const [treatment, setTreatment] = useState("");
  const { updatePatientDetails, patientDetails } = useContext(PatientContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePatientDetails({ ...patientDetails, treatment });
    onNextStep();
    // Perform form submission logic here
  };

  useEffect(() => {
    if (patientDetails?.treatment) {
      setTreatment(patientDetails.treatment);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="treatment" className="form-label">
            Other Treatments:
          </label>
          <textarea
            disabled={isPreview}
            id="treatment"
            value={treatment}
            onChange={(event) => setTreatment(event.target.value)}
            className="form-control"
            style={{ height: "150px" }} // Adjust the height as desired
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={onPrevStep}
          style={{ float: "left" }}
          hidden={isPreview}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ float: "right" }}
          hidden={isPreview}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default OtherTreatments;
