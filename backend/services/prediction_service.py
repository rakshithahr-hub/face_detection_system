import joblib
import numpy as np
from config import Config
import joblib


from services.feature_extraction import extract_features_unified

# ================================
# LOAD MODEL (only once)
# ================================
model = joblib.load(Config.MODEL_PATH)
scaler = joblib.load(Config.SCALER_PATH)
pca = joblib.load(Config.PCA_PATH)

THRESHOLD = 0.5


# ================================
# PREDICTION FUNCTION
# ================================
def predict_image(image):
    try:
        # 1. Feature Extraction
        features = extract_features_unified(image)

        if features is None:
            return {
                "label": "ERROR",
                "confidence": 0,
                "features": {
                    "livenessScore": 0,
                    "textureScore": 0,
                    "spoofProbability": 0
                },
                "error": "Feature extraction failed"
            }

        features = features.reshape(1, -1)

        print("Feature shape:", features.shape)

        # 2. Scaling + PCA
        features_scaled = scaler.transform(features)
        features_pca = pca.transform(features_scaled)

        # 3. Prediction
        if hasattr(model, "predict_proba"):
            prob = model.predict_proba(features_pca)[0]
            prediction = 1 if prob[1] > THRESHOLD else 0
            confidence = float(prob[prediction]) * 100
        else:
            prediction = model.predict(features_pca)[0]
            confidence = 100.0

        # 4. Label
        label = "REAL" if prediction == 1 else "SPOOF"

        # ================================
        # 🔥 ADD FEATURES FOR FRONTEND
        # ================================
        livenessScore = confidence if label == "REAL" else (100 - confidence)
        spoofProbability = 100 - confidence

        # You can replace this later with real texture features
        textureScore = float(np.clip(np.mean(features), 0, 100))

        return {
            "label": label,
            "confidence": round(confidence, 2),
            "features": {
                "livenessScore": round(livenessScore, 2),
                "textureScore": round(textureScore, 2),
                "spoofProbability": round(spoofProbability, 2)
            }
        }

    except Exception as e:
        print("Prediction error:", str(e))

        return {
    "label": label,
    "confidence": round(confidence, 2),

    # ✅ ADD THIS BLOCK
    
}