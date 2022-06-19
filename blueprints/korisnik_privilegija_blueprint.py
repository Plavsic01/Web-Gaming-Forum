from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from utils.db import mysql

korisnik_privilegija_blueprint = Blueprint('korisnik_privilegija',__name__,url_prefix='/api/korisnik-privilegija')

@korisnik_privilegija_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_korisnik_privilegije():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM korisnik_privilegije;")
    korisnici_privilegije = cursor.fetchall()
    return jsonify(korisnici_privilegije),200


@korisnik_privilegija_blueprint.route('/<int:id>',methods=['GET'])
@jwt_required(locations=['headers'])
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
@jwt_required(locations=['headers'])
def kreiraj_korisnik_privilegiju():
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = request.json
    try:
        cursor.execute("INSERT INTO korisnik_privilegije (korisnik_id,privilegija_id) VALUES (%(korisnik_id)s,%(privilegija_id)s);",form_data)
        db.commit()
        return jsonify(None),201
    except:
        return jsonify(None),404

@korisnik_privilegija_blueprint.route('/<int:id>',methods=['PUT'])
@jwt_required(locations=['headers'])
def izmeni_korisnik_privilegija(id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['id'] = id
    try:
        modified = cursor.execute("UPDATE korisnik_privilegije SET korisnik_id = %(korisnik_id)s,privilegija_id = %(privilegija_id)s WHERE (id = %(id)s);",form_data)
        db.commit()
        if modified == 0:
            return jsonify(None),404
        return jsonify(form_data),200
    except:
        return jsonify(None),404


@korisnik_privilegija_blueprint.route('/<int:id>',methods=['DELETE'])
@jwt_required(locations=['headers'])
def obrisi_korisnik_privilegija(id):
    db = mysql.get_db()
    cursor = db.cursor()
    modified = cursor.execute("DELETE FROM korisnik_privilegije WHERE id = %s;",id)
    
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200


@korisnik_privilegija_blueprint.route('/pretraga',methods=["POST"])
@jwt_required(locations=['headers'])
def pretraga():
    db = mysql.get_db()
    cursor = db.cursor()

    query_string = "SELECT * FROM korisnik_privilegije"

    pretraga = request.json
    count = 0
    for keys,values in pretraga.items():
        if values != '':
            if count == 0:
                if keys == "korisnik_id":
                    query_string += f" WHERE {keys} LIKE '%%' %({keys})s '%%' "
                else:
                    query_string += f" WHERE {keys} LIKE '%%' %({keys})s '%%' "
                
            else:
                if keys == "korisnik_id":
                    query_string += f"AND {keys} LIKE '%%' %({keys})s '%%' "
                else:
                    query_string += f"AND {keys} LIKE '%%' %({keys})s '%%' "
            count+=1

    cursor.execute(query_string,pretraga)
    korisnici = cursor.fetchall()

    vidljivi_korisnici = []

    for korisnik in korisnici:
        if korisnik['obrisan'] == 0:
            vidljivi_korisnici.append(korisnik)

    return jsonify(vidljivi_korisnici),201