from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from utils.db import mysql
import datetime

objava_blueprint = Blueprint('objava',__name__,url_prefix='/api/objava')


@objava_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_objave():
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM objava;")
        objave = cursor.fetchall()
        return jsonify(objave),200


@objava_blueprint.route('/<int:objava_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_objavu(objava_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM objava WHERE objava_id = %s",(objava_id,))
    objava = cursor.fetchone()
    if objava is None:
        return jsonify(None),404
    else:
        return jsonify(objava),200

@objava_blueprint.route('/dobavi-objave/<int:tema_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_objave_preko_tema_id(tema_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT objava.objava_id,objava.opis,objava.datum_kreiranja,objava.naslov,\
            objava.obrisan,objava.korisnik_id,korisnik.korisnicko_ime,tema.tema_id \
            FROM objava INNER JOIN korisnik ON objava.korisnik_id = korisnik.korisnik_id\
            INNER JOIN tema ON objava.tema_id = tema.tema_id WHERE objava.tema_id = %s",(tema_id))
    objava = cursor.fetchall()
    return jsonify(objava),200        



@objava_blueprint.route('/',methods=['POST'])
@jwt_required(locations=['headers'])
def kreiraj_objavu():
    db = mysql.get_db()
    cursor = db.cursor()
    cur_user = get_jwt_identity()
    form_data = request.json
    now = datetime.datetime.now()
    str_now = now.date().isoformat()
    form_data['datum_kreiranja'] = str_now
    form_data['korisnik_id'] = cur_user['korisnik_id']
    cursor.execute("INSERT INTO objava (naslov,opis,datum_kreiranja,tema_id,korisnik_id) VALUES (%(naslov)s,%(opis)s,%(datum_kreiranja)s,%(tema_id)s,%(korisnik_id)s);",form_data)
    db.commit()
    return jsonify(None),201


@objava_blueprint.route('/<int:objava_id>',methods=['PUT'])
@jwt_required(locations=['headers'])
def izmeni_objavu(objava_id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['objava_id'] = objava_id
    modified = cursor.execute("UPDATE objava SET naslov = %(naslov)s, opis = %(opis)s WHERE (objava_id = %(objava_id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200


@objava_blueprint.route('/<int:objava_id>',methods=['DELETE'])
@jwt_required(locations=['headers'])
def obrisi_objavu(objava_id):
    db = mysql.get_db()
    cursor = db.cursor()
    data = {}
    data['obrisan'] = 1
    data['objava_id'] = objava_id

    cursor.execute("UPDATE komentar SET obrisan = %(obrisan)s WHERE objava_id = %(objava_id)s;",data)
    modified = cursor.execute("UPDATE objava SET obrisan = %(obrisan)s WHERE (objava_id = %(objava_id)s);",data)
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200



@objava_blueprint.route('/pretraga',methods=["POST"])
@jwt_required(locations=['headers'])
def pretraga():
    db = mysql.get_db()
    cursor = db.cursor()

    query_string = "SELECT objava.objava_id,objava.opis,objava.datum_kreiranja,objava.naslov,\
            objava.obrisan,objava.korisnik_id,korisnik.korisnicko_ime,tema.naslov \
            FROM objava INNER JOIN korisnik ON objava.korisnik_id = korisnik.korisnik_id\
            INNER JOIN tema ON objava.tema_id = tema.tema_id"

    pretraga = request.json
    count = 0
    for keys,values in pretraga.items():
        if values != '':
            if count == 0:
                if keys == "datum_kreiranja_od":
                    query_string += f" WHERE objava.datum_kreiranja >= %({keys})s "
                elif keys == "datum_kreiranja_do":
                    query_string += f" WHERE objava.datum_kreiranja <= %({keys})s "
                else:
                    query_string += f" WHERE {keys} LIKE '%%' %({keys})s '%%' "
                
            else:
                if keys == "datum_kreiranja_do":
                    query_string += f"AND objava.datum_kreiranja <= %({keys})s "
                elif keys == "datum_kreiranja_od":
                    query_string += f"AND objava.datum_kreiranja >= %({keys})s "
                else:
                    query_string += f"AND {keys} LIKE '%%' %({keys})s '%%' "
            count+=1

    cursor.execute(query_string,pretraga)
    pod_forumi = cursor.fetchall()

    vidljivi_pod_forumi = []

    for pod_forum in pod_forumi:
        if pod_forum['obrisan'] == 0:
            vidljivi_pod_forumi.append(pod_forum)
    

    return jsonify(vidljivi_pod_forumi),201