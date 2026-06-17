from flask import Blueprint, request, jsonify
import numpy as np
import cv2
from services.prediction_service import predict_image

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["file"]

    file_bytes = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({"error": "Invalid image"}), 400

    result = predict_image(image)

    return jsonify({
        "label": result["label"],
        "confidence": float(result["confidence"]),

       
    })