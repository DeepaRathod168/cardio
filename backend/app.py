from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'gb_model.pkl')
model = joblib.load(model_path)

def compute_features(d):
    age = d['age']
    height = d['height']
    weight = d['weight']
    ap_hi = d['ap_hi']
    ap_lo = d['ap_lo']
    cholesterol = d['cholesterol']
    gluc = d['gluc']
    smoke = d['smoke']
    alco = d['alco']
    active = d['active']
    gender = d['gender']

    bmi = weight / ((height / 100) ** 2)
    pulse_pressure = ap_hi - ap_lo
    bp_ratio = ap_hi / ap_lo if ap_lo != 0 else 0
    map_ = (ap_hi + 2 * ap_lo) / 3
    age_bmi = age * bmi
    lifestyle_risk = smoke + alco + (1 - active)
    chol_gluc = cholesterol * gluc
    bp_bmi_risk = bmi * bp_ratio
    age_bp_risk = age * ap_hi
    age_group = 0 if age < 40 else (1 if age < 50 else (2 if age < 60 else 3))
    bmi_category = 0 if bmi < 18.5 else (1 if bmi < 25 else (2 if bmi < 30 else 3))
    bp_category = 0 if ap_hi < 120 else (1 if ap_hi < 130 else (2 if ap_hi < 140 else 3))

    return np.array([[
        gender, height, weight, ap_hi, ap_lo,
        cholesterol, gluc, smoke, alco, active,
        age, bmi, pulse_pressure, bp_ratio, map_,
        age_bmi, lifestyle_risk, chol_gluc, bp_bmi_risk,
        age_bp_risk, age_group, bmi_category, bp_category
    ]])

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Cardiovascular Disease API is running!'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = compute_features(data)
        prob = model.predict_proba(features)[0][1]
        result = int(model.predict(features)[0])
        return jsonify({
            'prediction': result,
            'probability': round(float(prob) * 100, 2),
            'risk': 'High Risk' if result == 1 else 'Low Risk'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)