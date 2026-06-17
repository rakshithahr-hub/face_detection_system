import os

# Get the absolute path of the directory where config.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Config:
    # Model Paths
    MODEL_PATH = os.path.join(BASE_DIR, "models", "machine_learning_model.pkl")
    SCALER_PATH = os.path.join(BASE_DIR, "models", "machine_learning_scaler.pkl")
    PCA_PATH = os.path.join(BASE_DIR, "models", "machine_learning_pca.pkl")
    
    # Secrets (Always use getenv for these)
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-key-placeholder")
    
    # Supabase (if needed elsewhere)
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")