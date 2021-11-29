# https://pypi.org/project/virtualenv/
# https://pypi.org/project/python-dotenv/
from flask import Flask


def create_app():
    app = Flask(__name__)

    # register Views
    from .views import views


    app.register_blueprint(views, url_prefix="/")

    return app
