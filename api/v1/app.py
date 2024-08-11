from flask import Flask
from api.v1.views import app_views
from flask_cors import CORS


app = Flask(__name__)
app.register_blueprint(app_views)
# CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
CORS(app)





if __name__ == '__main__':
    app.run(port=5001, debug=True)