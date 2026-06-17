import cv2
import numpy as np
from skimage.feature import local_binary_pattern, hog

def extract_features_unified(img):
    if img is None:
        return None

    img = cv2.resize(img, (224, 224))

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    features = []

    # LBP
    for r in [1, 3]:
        lbp = local_binary_pattern(gray, P=8, R=r, method="uniform")
        hist, _ = np.histogram(lbp.ravel(), bins=10, range=(0, 10), density=True)
        features.extend(hist)

    # HOG
    hog_feat = hog(
        gray,
        orientations=9,
        pixels_per_cell=(16, 16),
        cells_per_block=(2, 2),
        block_norm='L2-Hys'
    )
    features.extend(hog_feat)

    # FFT
    f_shift = np.fft.fftshift(np.fft.fft2(gray))
    magnitude = np.log(np.abs(f_shift) + 1)

    h, w = magnitude.shape
    center_block = magnitude[h//4:3*h//4, w//4:3*w//4]

    features.extend([
        np.mean(magnitude),
        np.std(magnitude),
        np.max(magnitude),
        np.min(magnitude),
        np.mean(center_block),
        np.std(center_block)
    ])

    # Color
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)

    for space in [hsv, ycrcb]:
        for i in range(3):
            features.append(np.mean(space[:, :, i]))
            features.append(np.std(space[:, :, i]))

    # Blur
    features.append(cv2.Laplacian(gray, cv2.CV_64F).var())

    return np.array(features, dtype=np.float32)