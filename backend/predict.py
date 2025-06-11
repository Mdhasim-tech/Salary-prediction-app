import joblib
import pandas as pd
from flask import Blueprint, request, jsonify

pred_bp = Blueprint('pred_bp', __name__)
# Load the trained model
model = joblib.load('salary_predictor_xgb.pkl')



@pred_bp.route('/', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        data = request.get_json()

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        prediction = model.predict(input_df)

        predicted_salary = prediction[0]


        return jsonify({'predicted_salary': float(predicted_salary)})

    except Exception as e:
        return jsonify({'error': str(e)})


