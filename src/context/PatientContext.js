import React, { createContext, useState } from 'react';

// Create the context
export const PatientContext = createContext();

// Create the provider
export const PatientProvider = ({ children }) => {
  const [patientDetails, setPatientDetails] = useState({});

  const updatePatientDetails = (details) => {
    setPatientDetails(details);
  };

  return (
    <PatientContext.Provider value={{ patientDetails, updatePatientDetails }}>
      {children}
    </PatientContext.Provider>
  );
};
