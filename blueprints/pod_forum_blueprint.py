from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.db import mysql
import datetime

pod_forum_blueprint = Blueprint('pod_forum',__name__,url_prefix='/api/pod-forum')

@pod_forum_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_pod_forume():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT pod_forum.pod_forum_id,pod_forum.obrisan,korisnik.korisnik_id,korisnik.korisnicko_ime,pod_forum.datum_kreiranja,pod_forum.naslov FROM korisnik INNER JOIN pod_forum ON korisnik.korisnik_id = pod_forum.korisnik_id;")
    pod_forumi = cursor.fetchall()
    print(pod_forumi)
    return jsonify(pod_forumi),200


@pod_forum_blueprint.route('/<int:pod_forum_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_pod_forum(pod_forum_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM pod_forum WHERE pod_forum_id = %s",(pod_forum_id,))
    pod_forum = cursor.fetchone()
    if pod_forum is None:
        return jsonify(None),404
    else:
        return jsonify(pod_forum),200


@pod_forum_blueprint.route('/',methods=['POST'])
@jwt_required(locations=['headers'])
def kreiraj_pod_forum():
    db = mysql.get_db()
    cursor = db.cursor()
    cur_user = get_jwt_identity()
    form_data = dict(request.json)
    now = datetime.datetime.now()
    str_now = now.date().isoformat()
    form_data['datum_kreiranja'] = str_now
    form_data['korisnik_id'] = cur_user['korisnik_id']
    cursor.execute("INSERT INTO pod_forum (naslov,datum_kreiranja,korisnik_id) VALUES (%(naslov)s,%(datum_kreiranja)s,%(korisnik_id)s);",form_data)
    db.commit()
    return jsonify(None),201


@pod_forum_blueprint.route('/<int:pod_forum_id>',methods=['PUT'])
@jwt_required(locations=['headers'])
def izmeni_pod_forum(pod_forum_id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['pod_forum_id'] = pod_forum_id
    modified = cursor.execute("UPDATE pod_forum SET naslov = %(naslov)s WHERE (pod_forum_id = %(pod_forum_id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200

@pod_forum_blueprint.route('/<int:pod_forum_id>',methods=['DELETE'])
@jwt_required(locations=['headers'])
def obrisi_pod_forum(pod_forum_id):
    db = mysql.get_db()
    cursor = db.cursor()
    data = {}
    data['obrisan'] = 1
    data['pod_forum_id'] = pod_forum_id
    modified = cursor.execute("UPDATE pod_forum SET obrisan = %(obrisan)s WHERE (pod_forum_id = %(pod_forum_id)s);",data)
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200
