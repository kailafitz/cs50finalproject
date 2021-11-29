# https://pypi.org/project/virtualenv/
# https://pypi.org/project/python-dotenv/

from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "<h1>Welcome to the backend!</h1>"


@app.route("/api", methods=["GET"])
@cross_origin()
def test():
    return {
        "name": "Kaila"
    }


if __name__ == "__main__":
    app.run(debug=True)
