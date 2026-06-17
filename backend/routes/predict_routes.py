from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

predict_bp = Blueprint("predict", __name__)

@predict_bp.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    user = get_jwt_identity()

    # TODO: replace with your ML model prediction
    result = "Real Face (example)"

    return jsonify({
        "user": user,
        "result": result
    })