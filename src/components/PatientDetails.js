import React, { useContext, useEffect, useState } from "react";
import { PatientContext } from "../context/PatientContext";
// import { PatientContext } from "../context/PatientProvider";

const PatientDetails = ({ onNextStep, isPreview }) => {
  const { updatePatientDetails, patientDetails } = useContext(PatientContext);

  const [name, setName] = useState("");
  const [ageYear, setAgeYear] = useState("0");
  const [ageMonths, setAgeMonths] = useState("0");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const years = Array.from({ length: 150 }, (_, index) => index);
  const months = Array.from({ length: 12 }, (_, index) => index);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    const patientDetailsNew = {
      name,
      ageYear,
      ageMonths,
      weight,
      height,
    };
    updatePatientDetails({ ...patientDetails, details: patientDetailsNew });
    onNextStep();
  };

  useEffect(() => {
    if (patientDetails?.details) {
      setName(patientDetails.details.name);
      setWeight(patientDetails.details.weight);
      setAgeMonths(patientDetails.details.ageMonths);
      setAgeYear(patientDetails.details.ageYear);
      setHeight(patientDetails.details.height);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            disabled={isPreview}
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageYear" className="form-label">
            Age (Years):
          </label>
          <select
            disabled={isPreview}
            id="ageYear"
            value={ageYear}
            onChange={(event) => setAgeYear(event.target.value)}
            className="form-select"
            required
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ageMonths" className="form-label">
            Age (Months):
          </label>
          <select
            id="ageMonths"
            disabled={isPreview}
            value={ageMonths}
            onChange={(event) => setAgeMonths(event.target.value)}
            className="form-select"
            required
          >
            <option value="">-- Select Month --</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">
              Weight (kg):
            </label>
            <input
              type="number"
              id="weight"
              disabled={isPreview}
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="height" className="form-label">
              Height (cm):
            </label>
            <input
              type="number"
              disabled={isPreview}
              id="height"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              className="form-control"
            />
          </div>
        </div>
        <div hidden={isPreview} style={{ width: "100%" }}>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{ float: "right" }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientDetails;
