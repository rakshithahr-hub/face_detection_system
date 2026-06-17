import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta

from routes.auth import auth_bp
from routes.predict import predict_bp
from routes.upload import upload_bp
from liveness_detection import liveness_bp  # Import the blueprint

app = Flask(__name__)

CORS(
    app,
    origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
)

app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY",
    "dev-key-only-for-local-testing"
)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)

jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(liveness_bp)  # Register the liveness blueprint

@app.route("/health")
def health():
    return jsonify({
        "status": "ok",
        "message": "Server is running"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Server starting on port {port}")
    print("📋 Available endpoints:")
    print("   - GET  /health")
    print("   - POST /liveness/detect_face")
    print("   - POST /liveness/verify_liveness")
    print("   - GET  /liveness/health")
    print("   - POST /predict")
    print("   - POST /register")
    print("   - POST /upload")
    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )