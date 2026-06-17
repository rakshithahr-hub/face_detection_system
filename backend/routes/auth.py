from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from datetime import datetime, timedelta
import re

auth_bp = Blueprint('auth', __name__)

# Simple in-memory storage
users_db = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debug
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        # Simple validation
        if not name or not email or not password:
            return jsonify({'message': 'All fields are required'}), 400
        
        if len(password) < 6:
            return jsonify({'message': 'Password must be at least 6 characters'}), 400
        
        # Check if email exists
        for user in users_db.values():
            if user['email'] == email:
                return jsonify({'message': 'Email already registered'}), 400
        
        # Create user
        user_id = str(len(users_db) + 1)
        users_db[user_id] = {
            'id': user_id,
            'name': name,
            'email': email,
            'password': password  # In production, hash this!
        }
        
        # Create token
        access_token = create_access_token(identity=user_id)
        
        return jsonify({
            'message': 'Registration successful',
            'token': access_token,
            'user': {
                'id': user_id,
                'name': name,
                'email': email
            }
        }), 201
        
    except Exception as e:
        print("Error in register:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({'message': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print("Login data:", data)  # Debug
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({'message': 'Email and password required'}), 400
        
        # Find user
        user = None
        for u in users_db.values():
            if u['email'] == email:
                user = u
                break
        
        if not user or user['password'] != password:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Create token
        access_token = create_access_token(identity=user['id'])
        
        return jsonify({
            'message': 'Login successful',
            'token': access_token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email']
            }
        }), 200
        
    except Exception as e:
        print("Error in login:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({'message': str(e)}), 500