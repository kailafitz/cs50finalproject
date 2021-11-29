from flask import Flask, Blueprint
from flask_cors import CORS, cross_origin

# Blueprint of our application
views = Blueprint("views",  __name__)
CORS(views)


@views.route("/")
def index():
    return "<h1>Welcome to the backend! this is new</h1>"


@views.route("/api", methods=["GET"])
@cross_origin()
def test():
    return "Hello"
