from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from utils.db import mysql
import datetime

korisnik_blueprint = Blueprint('korisnik',__name__,url_prefix='/api/korisnik')

@korisnik_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_korisnike():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM korisnik;")
    korisnici = cursor.fetchall()
    return jsonify(korisnici),200


@korisnik_blueprint.route('/<int:korisnik_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_korisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnik_id = %s",(korisnik_id,))
    korisnik = cursor.fetchone()
    if korisnik is None:
        return jsonify(None),404
    else:
        return jsonify(korisnik),200


@korisnik_blueprint.route('/',methods=["POST"])
@jwt_required(locations=['headers'])
def kreiraj_korisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = request.json
    now = datetime.datetime.now()
    str_now = now.date().isoformat()
    form_data['datum_kreiranja'] = str_now
    cursor.execute("INSERT INTO korisnik (korisnicko_ime,email,lozinka,datum_kreiranja) VALUES (%(korisnicko_ime)s,%(email)s,%(lozinka)s,%(datum_kreiranja)s);",form_data)
    db.commit()
    return jsonify(None),201

@korisnik_blueprint.route('/<int:korisnik_id>',methods=["PUT"])
@jwt_required(locations=['headers'])
def izmeni_korisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['korisnik_id'] = korisnik_id
    modified = cursor.execute("UPDATE korisnik SET korisnicko_ime = %(korisnicko_ime)s, email = %(email)s, lozinka = %(lozinka)s WHERE (korisnik_id = %(korisnik_id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200


@korisnik_blueprint.route('/<int:korisnik_id>',methods=["DELETE"])
@jwt_required(locations=['headers'])
def obrisi_korisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    data = {}
    data['obrisan'] = 1
    data['korisnik_id'] = korisnik_id
    modified = cursor.execute("UPDATE korisnik SET obrisan = %(obrisan)s WHERE (korisnik_id = %(korisnik_id)s);",data)
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200 

