from flask import jsonify,request,Blueprint
from flask_jwt_extended import jwt_required
from utils.db import mysql

privilegija_blueprint = Blueprint('privilegija',__name__,url_prefix='/api/privilegija')

@privilegija_blueprint.route('/',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_privilegije():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM privilegija;")
    privilegije = cursor.fetchall()
    return jsonify(privilegije),200


@privilegija_blueprint.route('/<int:privilegija_id>',methods=['GET'])
@jwt_required(locations=['headers'])
def dobavi_privilegiju(privilegija_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM privilegija WHERE privilegija_id = %s",(privilegija_id,))
    privilegija = cursor.fetchone()
    if privilegija is None:
        return jsonify(None),404
    else:
        return jsonify(privilegija),200


@privilegija_blueprint.route('/',methods=['POST'])
@jwt_required(locations=['headers'])
def kreiraj_privilegiju():
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = request.json
    cursor.execute("INSERT INTO privilegija (tip_privilegije) VALUES (%(tip_privilegije)s);",form_data)
    db.commit()
    return jsonify(None),201

@privilegija_blueprint.route('/<int:privilegija_id>',methods=['PUT'])
@jwt_required(locations=['headers'])
def izmeni_privilegiju(privilegija_id):
    db = mysql.get_db()
    cursor = db.cursor()
    form_data = dict(request.json)
    form_data['privilegija_id'] = privilegija_id
    modified = cursor.execute("UPDATE privilegija SET tip_privilegije = %(tip_privilegije)s WHERE (privilegija_id = %(privilegija_id)s);",form_data)
    db.commit()
    if modified == 0:
        return jsonify(None),404
    return jsonify(form_data),200


@privilegija_blueprint.route('/<int:privilegija_id>',methods=['DELETE'])
@jwt_required(locations=['headers'])
def obrisi_privilegiju(privilegija_id):
    db = mysql.get_db()
    cursor = db.cursor()
    data = {}
    data['obrisan'] = 1
    data['privilegija_id'] = privilegija_id
    modified = cursor.execute("UPDATE privilegija SET obrisan = %(obrisan)s WHERE (privilegija_id = %(privilegija_id)s);",data)
    db.commit()

    if modified == 0:
        return jsonify(None), 404

    return jsonify(None), 200 