from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.db import mysql
import datetime

tema_blueprint = Blueprint('tema',__name__,url_prefix='/api/tema')


@tema_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_teme():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT tema.tema_id,tema.naslov,tema.datum_kreiranja,tema.obrisan,korisnik.korisnicko_ime,korisnik.korisnik_id,pod_forum.naslov AS pod_forum_naslov FROM tema INNER JOIN korisnik ON tema.korisnik_id = korisnik.korisnik_id INNER JOIN pod_forum ON pod_forum.pod_forum_id = tema.pod_forum_id;")
    teme = cursor.fetchall()
    return jsonify(teme),200

@tema_blueprint.route('/dobavi-teme/<int:pod_forum_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_teme_preko_podforum_id(pod_forum_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT tema.tema_id,tema.obrisan,tema.pod_forum_id,tema.korisnik_id,tema.datum_kreiranja,tema.naslov,korisnik.korisnicko_ime FROM tema INNER JOIN korisnik ON tema.korisnik_id = korisnik.korisnik_id WHERE tema.pod_forum_id = %s",(pod_forum_id,))
    teme = cursor.fetchall()
    return jsonify(teme),200    

@tema_blueprint.route('/<int:tema_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_temu(tema_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM tema WHERE tema_id = %s",(tema_id,))
    tema = cursor.fetchone()
    if tema is None:
        return jsonify(None),404
    else:
        return jsonify(tema),200


@tema_blueprint.route('/',methods=['POST'])
@jwt_required(locations=['headers'])
def kreiraj_temu():
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    cur_user = get_jwt_identity()
    now = datetime.datetime.now()
    str_now = now.date().isoformat()
    form_data['datum_kreiranja'] = str_now
    form_data['korisnik_id'] = cur_user['korisnik_id']
    cursor.execute("INSERT INTO tema (naslov,datum_kreiranja,korisnik_id,pod_forum_id) VALUES (%(naslov)s,%(datum_kreiranja)s,%(korisnik_id)s,%(pod_forum_id)s);",form_data)
    db.commit()
    return jsonify(None),201



@tema_blueprint.route('/<int:tema_id>',methods=['PUT'])
@jwt_required(locations=['headers'])
def izmeni_temu(tema_id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['tema_id'] = tema_id
    modified = cursor.execute("UPDATE tema SET naslov = %(naslov)s WHERE (tema_id = %(tema_id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200


@tema_blueprint.route('/<int:tema_id>',methods=['DELETE'])
@jwt_required(locations=['headers'])
def obrisi_temu(tema_id):
    db = mysql.get_db()
    cursor = db.cursor()
    data = {}
    data['obrisan'] = 1
    data['tema_id'] = tema_id
    modified = cursor.execute("UPDATE tema SET obrisan = %(obrisan)s WHERE (tema_id = %(tema_id)s);",data)
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200