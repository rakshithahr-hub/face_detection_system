from .predict import predict_bp
from .upload import upload_bp

def register_routes(app):
    app.register_blueprint(predict_bp)
    app.register_blueprint(upload_bp)