import firebase_admin
from firebase_admin import credentials, auth, firestore
from functools import wraps
from flask import redirect, url_for
from flask_login import current_user

# Initialize Firebase Admin SDK
# You'll need to replace 'path/to/serviceAccountKey.json' with your actual service account key path
# <cursor>DO NOT EDIT - START</cursor>
cred = credentials.Certificate('config/serviceAccountKey.json')
# <cursor>CONFIGURATION - DO NOT MODIFY - END</cursor>
firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect(url_for('auth.login'))
        return f(*args, **kwargs)
    return decorated_function 