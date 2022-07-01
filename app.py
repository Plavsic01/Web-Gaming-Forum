import mimetypes
mimetypes.add_type('application/javascript','.js')
mimetypes.add_type('text/css','.css')
from flask import Flask
from utils.db import mysql
from datetime import timedelta
from flask_jwt_extended import JWTManager
from blueprints.korisnik_blueprint import korisnik_blueprint
from blueprints.privilegija_blueprint import privilegija_blueprint
from blueprints.korisnik_privilegija_blueprint import korisnik_privilegija_blueprint
from blueprints.pod_forum_blueprint import pod_forum_blueprint
from blueprints.tema_blueprint import tema_blueprint
from blueprints.objava_blueprint import objava_blueprint
from blueprints.komentar_blueprint import komentar_blueprint
from blueprints.autentikacija_blueprint import autentikacija_blueprint


app = Flask(__name__)
jwt = JWTManager(app)

app.config['SECRET_KEY'] = 'ovojesecretkey'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_PORT"] = 3306
app.config["MYSQL_DATABASE_USER"] = "root" 
app.config["MYSQL_DATABASE_PASSWORD"] = "Najbolji3" 
app.config["MYSQL_DATABASE_DB"] = "forum"

mysql.init_app(app)

app.register_blueprint(korisnik_blueprint)
app.register_blueprint(privilegija_blueprint)
app.register_blueprint(korisnik_privilegija_blueprint)
app.register_blueprint(pod_forum_blueprint)
app.register_blueprint(tema_blueprint)
app.register_blueprint(objava_blueprint)
app.register_blueprint(komentar_blueprint)
app.register_blueprint(autentikacija_blueprint)


@app.route("/")
def home():
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run()