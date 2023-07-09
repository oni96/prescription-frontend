import React, { useState } from "react";
import { PatientProvider } from "../context/PatientContext";
import Diagnosis from "./Diagnosis";
import Medicine from "./Medicine";
import OtherTreatments from "./OtherTreatments";
import PatientDetails from "./PatientDetails";
import PreviewComponent from "./PreviewComponent";

const ParentComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const screenName = [
    "Patient Details",
    "Diagnosis",
    "Medicine Advice",
    "Other Treatments",
  ];

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <PatientDetails onNextStep={handleNextStep} />;
      case 2:
        return (
          <Diagnosis onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
        );
      case 3:
        return (
          <Medicine onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
        );
      case 4:
        return (
          <OtherTreatments
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
          />
        );
      case 5:
        return <PreviewComponent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <PatientProvider>
        <div style={{ width: "100%", height: '5rem' }}>
          <h1 style={{ float: "left" }}>{screenName[currentStep - 1]}</h1>
          <h6 style={{float: 'right'}}>Step {currentStep} of {screenName.length}</h6>
        </div>

        {renderComponent()}
      </PatientProvider>
    </div>
  );
};

export default ParentComponent;
