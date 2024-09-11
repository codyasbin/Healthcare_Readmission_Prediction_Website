# backend/prediction/model.py
import joblib
import os

model = joblib.load(os.path.join(os.path.dirname(__file__), '../model.pkl'))

def prepare_features(data):
    # Prepare the DataFrame or array for prediction
    # Example:
    columns = ['age', 'time_in_hospital', 'n_lab_procedures', 'n_procedures', 'n_medications',
               'n_outpatient', 'n_inpatient', 'n_emergency', 'medical_specialty', 'diag_1',
               'diag_2', 'diag_3', 'glucose_test', 'A1Ctest', 'change', 'diabetes_med']
    return [data[col] for col in columns]
