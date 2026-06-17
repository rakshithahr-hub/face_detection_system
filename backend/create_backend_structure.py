import os

print("Starting backend structure creation...")

folders = [
    "models",
    "routes",
    "services",
    "utils",
    "uploads/temp_images",
    "uploads/batch_images",
    "static/results",
    "tests"
]

files = {
    "app.py": "",
    "config.py": "",
    "requirements.txt": "",
    "routes/__init__.py": "",
    "routes/predict.py": "",
    "routes/upload.py": "",
    "services/__init__.py": "",
    "services/feature_extraction.py": "",
    "services/prediction_service.py": "",
    "utils/__init__.py": "",
    "utils/image_utils.py": "",
    "utils/preprocess.py": "",
    "tests/test_single_image.py": "",
    "tests/test_batch_images.py": ""
}

for folder in folders:
    os.makedirs(folder, exist_ok=True)
    print("Created folder:", folder)

for file_path in files:
    with open(file_path, "w") as f:
        f.write("")
    print("Created file:", file_path)

print("\n✅ DONE: Backend structure created successfully!")