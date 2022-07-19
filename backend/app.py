from datetime import datetime, timedelta, timezone
import json
import sys
from flask import Flask
from flask_cors import CORS
from main.models import db
from flask_marshmallow import Marshmallow
from flask_login import LoginManager
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, JWTManager

app = Flask(__name__)
app.secret_key = "SUPER_SECRET_KEY"
app.config["JWT_SECRET_KEY"] = "secret-jwt-token"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)
CORS(app, origins="http://localhost:3000",
     allow_headers=["Content-Type", "Authorization",
                    "Access-Control-Allow-Credentials"],
     supports_credentials=True)
ma = Marshmallow(app)

import main.routes


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


if __name__ == '__main__':
    try:

        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.app = app
        db.init_app(app)
        db.create_all()
        app.debug = True
        app.run(host='0.0.0.0', port=5000)

    except KeyboardInterrupt:
        sys.exit(0)
