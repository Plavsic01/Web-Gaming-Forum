from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.db import mysql
import datetime


komentar_blueprint = Blueprint('komentar',__name__,url_prefix='/api/komentar')


@komentar_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_komentare():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM komentar;")
    komentari = cursor.fetchall()
    return jsonify(komentari),200


@komentar_blueprint.route('/<int:komentar_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_komentar(komentar_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM komentar WHERE komentar_id = %s",(komentar_id,))
    komentar = cursor.fetchone()
    if komentar is None:
        return jsonify(None),404
    else:
        return jsonify(komentar),200


@komentar_blueprint.route('/dobavi-komentare/<int:objava_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_komentar_preko_objava_id(objava_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT komentar.komentar_id,komentar.opis,komentar.datum_kreiranja,komentar.objava_id,\
                komentar.korisnik_id,korisnik.korisnicko_ime,komentar.obrisan FROM komentar INNER JOIN objava ON \
                komentar.objava_id = objava.objava_id INNER JOIN korisnik ON korisnik.korisnik_id = komentar.korisnik_id \
                WHERE komentar.objava_id = %s;",(objava_id,))
    komentari = cursor.fetchall()    
    return jsonify(komentari),200


@komentar_blueprint.route('/',methods=['POST'])
@jwt_required(locations=['headers'])
def kreiraj_komentar():
    db = mysql.get_db()
    cursor = db.cursor()
    cur_user = get_jwt_identity()
    form_data = request.json
    now = datetime.datetime.now()
    str_now = now.date().isoformat()
    form_data['datum_kreiranja'] = str_now
    form_data['korisnik_id'] = cur_user['korisnik_id']
    cursor.execute("INSERT INTO komentar (opis,datum_kreiranja,objava_id,korisnik_id) VALUES (%(opis)s,%(datum_kreiranja)s,%(objava_id)s,%(korisnik_id)s);",form_data)
    db.commit()
    return jsonify(None),201



@komentar_blueprint.route('/<int:komentar_id>',methods=['PUT'])
@jwt_required(locations=['headers'])
def izmeni_komentar(komentar_id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['komentar_id'] = komentar_id
    modified = cursor.execute("UPDATE komentar SET opis = %(opis)s WHERE (komentar_id = %(komentar_id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200


@komentar_blueprint.route('/<int:komentar_id>',methods=['DELETE'])
@jwt_required(locations=['headers'])
def obrisi_komentar(komentar_id):
    db = mysql.get_db()
    cursor = db.cursor()
    # modified = cursor.execute("DELETE FROM komentar WHERE komentar_id = %s",(komentar_id,))
    data = {}
    data['obrisan'] = 1
    data['komentar_id'] = komentar_id
    modified = cursor.execute("UPDATE komentar SET obrisan = %(obrisan)s WHERE (komentar_id = %(komentar_id)s);",data)
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200