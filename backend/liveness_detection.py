from flask import Blueprint, request, jsonify
import cv2
import numpy as np

liveness_bp = Blueprint("liveness", __name__, url_prefix="/liveness")

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# Helper function to get standardized offset
def get_face_offset(frame, faces):
    if len(faces) == 0:
        return None
    x, y, w, h = faces[0]
    frame_width = frame.shape[1]
    center_x = x + w / 2
    
    # Standardized offset relative to center of the image frame
    offset = center_x - (frame_width / 2)
    return offset, (x, y, w, h)

# =============================
# FACE DETECTION ENDPOINT
# =============================
@liveness_bp.route("/detect_face", methods=["POST"])
def detect_face():
    try:
        file = request.files.get("file")
        if not file:
            return jsonify({"face_detected": False, "error": "No file provided"}), 400

        img = np.frombuffer(file.read(), np.uint8)
        frame = cv2.imdecode(img, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({"face_detected": False, "error": "Invalid image"}), 400

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=6, minSize=(120, 120))
        
        if len(faces) == 0:
            return jsonify({"face_detected": False})
        
        offset_data = get_face_offset(frame, faces)
        if not offset_data:
            return jsonify({"face_detected": False})
            
        offset, (x, y, w, h) = offset_data
        
        return jsonify({
            "face_detected": True,
            "bbox": {"x": int(x), "y": int(y), "width": int(w), "height": int(h)},
            "offset": float(offset)
        })
    except Exception as e:
        return jsonify({"face_detected": False, "error": str(e)}), 500

# =============================
# LIVENESS VERIFICATION ENDPOINT
# =============================
@liveness_bp.route("/verify_liveness", methods=["POST"])
def verify_liveness():
    try:
        file = request.files.get("file")
        challenge = request.form.get("challenge")

        if not file:
            return jsonify({"success": False, "message": "No image provided"}), 400

        img = np.frombuffer(file.read(), np.uint8)
        frame = cv2.imdecode(img, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({"success": False, "message": "Invalid image"}), 400

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=6, minSize=(120, 120))

        if len(faces) == 0:
            return jsonify({"success": False, "message": "No face detected"})

        offset_data = get_face_offset(frame, faces)
        offset, _ = offset_data

        detected = False
        message = ""
        
        # FIXED: Using -40px for LEFT and +40px for RIGHT
        if challenge == "LEFT":
            if offset < -40:  
                detected = True
                message = f"✅ LEFT movement detected! (Offset: {offset:.0f}px)"
            else:
                message = f"⏳ Turn LEFT more (Offset: {offset:.0f}px, need < -40px)"
                
        elif challenge == "RIGHT":
            if offset > 40:  
                detected = True
                message = f"✅ RIGHT movement detected! (Offset: {offset:.0f}px)"
            else:
                message = f"⏳ Turn RIGHT more (Offset: {offset:.0f}px, need > 40px)"
        else:
            message = f"Unknown challenge: {challenge}"

        return jsonify({
            "success": detected,
            "message": message,
            "offset": float(offset)
        })

    except Exception as e:
        return jsonify({"success": False, "message": f"Error: {str(e)}"}), 500