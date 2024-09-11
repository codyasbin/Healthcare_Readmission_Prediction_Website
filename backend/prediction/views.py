from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import json
import joblib
import numpy as np
from sklearn.preprocessing import LabelEncoder
import os
# Initialize LabelEncoders with the classes seen during training
medical_specialty_encoder = LabelEncoder().fit(['Missing', 'Other', 'InternalMedicine', 'Family/GeneralPractice'])
diag_1_encoder = LabelEncoder().fit(['Circulatory', 'Respiratory', 'Other', 'Diabetes', 'Digestive', 'Injury'])
diag_2_encoder = LabelEncoder().fit(['Circulatory', 'Respiratory', 'Other', 'Diabetes', 'Digestive', 'Injury'])
diag_3_encoder = LabelEncoder().fit(['Circulatory', 'Respiratory', 'Other', 'Diabetes', 'Digestive', 'Injury'])
glucose_test_encoder = LabelEncoder().fit(['no', 'normal', 'high'])
A1Ctest_encoder = LabelEncoder().fit(['no', 'normal', 'high'])
change_encoder = LabelEncoder().fit(['no', 'ch'])
diabetes_med_encoder = LabelEncoder().fit(['no', 'yes'])

@csrf_exempt
@api_view(['POST'])
def predict_readmission(request):
    if request.method == 'POST':
        try:
            # Load the model
            model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
            model = joblib.load(model_path)
            
            # Parse the JSON data from the request
            data = json.loads(request.body)
            features = data.get('features')
            
            if features is None:
                return JsonResponse({'error': 'Invalid input'}, status=400)
            
            # Convert features to a list for prediction
            def transform_label(label, encoder):
                try:
                    return int(encoder.transform([label])[0])
                except ValueError:
                    # Handle unseen labels
                    return -1  # Or any default value you want to use
            
            feature_values = [
                float(features.get('age', 0)),
                float(features.get('time_in_hospital', 0)),
                float(features.get('n_lab_procedures', 0)),
                float(features.get('n_procedures', 0)),
                float(features.get('n_medications', 0)),
                float(features.get('n_outpatient', 0)),
                float(features.get('n_inpatient', 0)),
                float(features.get('n_emergency', 0)),
                transform_label(features.get('medical_specialty', 'Missing'), medical_specialty_encoder),
                transform_label(features.get('diag_1', 'Other'), diag_1_encoder),
                transform_label(features.get('diag_2', 'Other'), diag_2_encoder),
                transform_label(features.get('diag_3', 'Other'), diag_3_encoder),
                transform_label(features.get('glucose_test', 'no'), glucose_test_encoder),
                transform_label(features.get('A1Ctest', 'no'), A1Ctest_encoder),
                transform_label(features.get('change', 'no'), change_encoder),
                transform_label(features.get('diabetes_med', 'no'), diabetes_med_encoder)
            ]
            
            # Make the prediction
            prediction = model.predict([feature_values])
            result = int(prediction[0])  # Ensure the result is an int
            
            # Return the prediction as JSON
            return JsonResponse({'prediction': result})
        
        except Exception as e:
            # Print the error in the logs for debugging
            print(f"Error: {e}")
            return JsonResponse({'error': 'An error occurred', 'details': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)
