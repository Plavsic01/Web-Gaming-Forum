from flask import jsonify,request,Blueprint
from utils.db import mysql

korisnik_privilegija_blueprint = Blueprint('korisnik_privilegija',__name__,url_prefix='/api/korisnik-privilegija')

@korisnik_privilegija_blueprint.route('/',methods=['GET'])
def dobavi_korisnik_privilegije():
    db = mysql.get_db()
    cursor = db.cursor()
    if id is None:
        cursor.execute("SELECT * FROM korisnik_privilegije;")
        korisnici_privilegije = cursor.fetchall()
        return jsonify(korisnici_privilegije),200


@korisnik_privilegija_blueprint.route('/<int:id>',methods=['GET'])
def dobavi_korisnik_privilegija(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM korisnik_privilegije WHERE id = %s",(id,))
    privilegija_priviligija = cursor.fetchone()
    if privilegija_priviligija is None:
        return jsonify(None),404
    else:
        return jsonify(privilegija_priviligija),200


@korisnik_privilegija_blueprint.route('/',methods=['POST'])
def kreiraj_korisnik_privilegiju():
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = request.json
    cursor.execute("INSERT INTO korisnik_privilegije (korisnik_id,privilegija_id) VALUES (%(korisnik_id)s,%(privilegija_id)s);",form_data)
    db.commit()
    return jsonify(None),201


@korisnik_privilegija_blueprint.route('/<int:id>',methods=['PUT'])
def put(id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['id'] = id
    modified = cursor.execute("UPDATE korisnik_privilegije SET korisnik_id = %(korisnik_id)s,privilegija_id = %(privilegija_id)s WHERE (id = %(id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200


@korisnik_privilegija_blueprint.route('/<int:id>',methods=['DELETE'])
def delete(id):
    db = mysql.get_db()
    cursor = db.cursor()
    # modified = cursor.execute("DELETE FROM korisnik_privilegije WHERE id = %s",(id,))
    data = {}
    data['obrisan'] = 1
    data['id'] = id
    modified = cursor.execute("UPDATE korisnik_privilegije SET obrisan = %(obrisan)s WHERE (id = %(id)s);",data)

    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200