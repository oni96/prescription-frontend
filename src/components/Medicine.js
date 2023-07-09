import React, { useContext, useEffect, useState } from "react";
import { PatientContext } from "../context/PatientContext";

const Medicine = ({ onNextStep, onPrevStep, isPreview }) => {
  const [drugName, setDrugName] = useState("");
  const [repeatPattern, setRepeatPattern] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("days");
  const [dosageTaken, setDosageTaken] = useState("");
  const [medicineData, setMedicineData] = useState([]);

  const { updatePatientDetails, patientDetails } = useContext(PatientContext);

  const handleAdd = (event) => {
    event.preventDefault();
    const newMedicine = {
      drugName,
      repeatPattern,
      duration: `${durationValue} ${durationUnit}`,
      dosageTaken,
    };
    setMedicineData([...medicineData, newMedicine]);
    // if (patientDetails?.medicine) {
    // updatePatientDetails({ ...patientDetails, medicine: medicineData });
    // }else{

    // }
    setDrugName("");
    setRepeatPattern("");
    setDurationValue("");
    setDurationUnit("days");
    setDosageTaken("");
  };
  useEffect(() => {
    if (patientDetails?.medicine) setMedicineData(patientDetails.medicine);
  }, []);

  useEffect(() => {
    updatePatientDetails({ ...patientDetails, medicine: medicineData });
  }, [medicineData]);

  const handleRemove = (index) => {
    const updatedMedicineData = [...medicineData];
    updatedMedicineData.splice(index, 1);
    setMedicineData(updatedMedicineData);
  };

  const handleEdit = (index) => {
    const editedMedicine = medicineData[index];
    setDrugName(editedMedicine.drugName);
    setRepeatPattern(editedMedicine.repeatPattern);
    const [value, unit] = editedMedicine.duration.split(" ");
    setDurationValue(value);
    setDurationUnit(unit);
    setDosageTaken(editedMedicine.dosageTaken);
    handleRemove(index);
  };

  const repeatPatternOptions = [
    { value: "0-0-1", label: "0-0-1" },
    { value: "0-1-0", label: "0-1-0" },
    { value: "0-1-1", label: "0-1-1" },
    { value: "1-0-0", label: "1-0-0" },
    { value: "1-0-1", label: "1-0-1" },
    { value: "1-1-0", label: "1-1-0" },
    { value: "1-1-1", label: "1-1-1" },
  ];

  return (
    <div>
      <form onSubmit={handleAdd} hidden={isPreview}>
        <div className="mb-3">
          <label htmlFor="drugName" className="form-label">
            Drug Name:
          </label>
          <input
            type="text"
            id="drugName"
            value={drugName}
            onChange={(event) => setDrugName(event.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repeatPattern" className="form-label">
            Repeat Pattern:
          </label>
          <select
            required
            id="repeatPattern"
            value={repeatPattern}
            onChange={(event) => setRepeatPattern(event.target.value)}
            className="form-select"
          >
            <option value="">-- Select Repeat Pattern --</option>
            {repeatPatternOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="durationValue" className="form-label">
            Duration:
          </label>
          <div className="d-flex">
            <input
              required
              type="number"
              id="durationValue"
              value={durationValue}
              onChange={(event) => setDurationValue(event.target.value)}
              className="form-control me-2"
            />
            <select
              required
              id="durationUnit"
              value={durationUnit}
              onChange={(event) => setDurationUnit(event.target.value)}
              className="form-select"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="dosageTaken" className="form-label">
            Dosage Taken:
          </label>
          <select
            required
            id="dosageTaken"
            value={dosageTaken}
            onChange={(event) => setDosageTaken(event.target.value)}
            className="form-select"
          >
            <option value="">-- Select Dosage Taken --</option>
            <option value="After Food">After Food</option>
            <option value="Before Food">Before Food</option>
            <option value="With Food">With Food</option>
            <option value="Empty Stomach">Empty Stomach</option>
            <option value="As Directed">As Directed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Repeat Pattern</th>
            <th>Duration</th>
            <th>Dosage Taken</th>
            {isPreview ? null : <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {medicineData.map((medicine, index) => (
            <tr key={index}>
              <td>{medicine.drugName}</td>
              <td>{medicine.repeatPattern}</td>
              <td>{medicine.duration}</td>
              <td>{medicine.dosageTaken}</td>
              {isPreview ? null : (
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: "100%" }} hidden={isPreview}>
        {" "}
        <button
          className="btn btn-primary"
          onClick={onPrevStep}
          style={{ float: "left" }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={onNextStep}
          style={{ float: "right" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Medicine;
