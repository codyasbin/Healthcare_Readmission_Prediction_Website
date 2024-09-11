// frontend/src/components/PredictionForm.jsx
import React, { useState } from 'react';
import './App.css'; // Importing CSS for styling

function PredictionForm() {
  const [features, setFeatures] = useState({
    age: '',
    time_in_hospital: '',
    n_lab_procedures: '',
    n_procedures: '',
    n_medications: '',
    n_outpatient: '',
    n_inpatient: '',
    n_emergency: '',
    medical_specialty: '',
    diag_1: '',
    diag_2: '',
    diag_3: '',
    glucose_test: '',
    A1Ctest: '',
    change: '',
    diabetes_med: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [predictionText, setPredictionText] = useState('');

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features }),
    });
    
    // Check if response is ok
    if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction);
          // Set user-friendly prediction text
          const resultText = data.prediction === 'Readmitted' 
          ? 'The patient is not likely to be readmitted.'
          : 'The patient is likely to be readmitted.';
      setPredictionText(resultText);
    } else {
        console.error('Prediction request failed');
        const errorData = await response.text(); // Get the error message as text
        console.error('Error:', errorData);
    }
};


  return (
    <>
    <h1>Hospital Readmission Predictor</h1>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="prediction-form">
        <label>
          Age:
          <select name="age" value={features.age} onChange={handleChange}>
            {[...Array(101).keys()].map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </label>

        <label>
          Time in Hospital:
          <select name="time_in_hospital" value={features.time_in_hospital} onChange={handleChange}>
            {[...Array(15).keys()].map(days => (
              <option key={days} value={days}>{days}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Lab Procedures:
          <select name="n_lab_procedures" value={features.n_lab_procedures} onChange={handleChange}>
            {[...Array(150).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Procedures:
          <select name="n_procedures" value={features.n_procedures} onChange={handleChange}>
            {[...Array(10).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Medications:
          <select name="n_medications" value={features.n_medications} onChange={handleChange}>
            {[...Array(100).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Outpatient Visits:
          <select name="n_outpatient" value={features.n_outpatient} onChange={handleChange}>
            {[...Array(20).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Inpatient Visits:
          <select name="n_inpatient" value={features.n_inpatient} onChange={handleChange}>
            {[...Array(20).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Number of Emergency Visits:
          <select name="n_emergency" value={features.n_emergency} onChange={handleChange}>
            {[...Array(20).keys()].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>

        <label>
          Medical Specialty:
          <select name="medical_specialty" value={features.medical_specialty} onChange={handleChange}>
            <option value="Missing">Missing</option>
            <option value="Family/GeneralPractice">Family/General Practice</option>
            <option value="InternalMedicine">Internal Medicine</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label>
          Diagnosis 1:
          <select name="diag_1" value={features.diag_1} onChange={handleChange}>
            <option value="Circulatory">Circulatory</option>
            <option value="Respiratory">Respiratory</option>
            <option value="Digestive">Digestive</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Injury">Injury</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Diagnosis 2:
          <select name="diag_2" value={features.diag_2} onChange={handleChange}>
            <option value="Circulatory">Circulatory</option>
            <option value="Respiratory">Respiratory</option>
            <option value="Digestive">Digestive</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Injury">Injury</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Diagnosis 3:
          <select name="diag_3" value={features.diag_3} onChange={handleChange}>
            <option value="Circulatory">Circulatory</option>
            <option value="Respiratory">Respiratory</option>
            <option value="Digestive">Digestive</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Injury">Injury</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Glucose Test:
          <select name="glucose_test" value={features.glucose_test} onChange={handleChange}>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="no">No Test</option>
          </select>
        </label>

        <label>
          A1C Test:
          <select name="A1Ctest" value={features.A1Ctest} onChange={handleChange}>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="no">No Test</option>
          </select>
        </label>

        <label>
          Change in Medication:
          <select name="change" value={features.change} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          Diabetes Medication:
          <select name="diabetes_med" value={features.diabetes_med} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
                <div>
                    <h2>Prediction Result</h2>
                    <p>Numerical Result: {prediction}</p>
                    <p>Readmission Status: {predictionText}</p>
                </div>
            )}
    </div>
    </>
  );
}

export default PredictionForm;
