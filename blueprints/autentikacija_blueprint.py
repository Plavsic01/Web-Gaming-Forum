from flask import Blueprint, request,jsonify
from flask_jwt_extended import create_access_token
from utils.db import mysql
import datetime


autentikacija_blueprint = Blueprint('autentikacija',__name__)

def dobavi_korisnik_id(kor_ime):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT korisnik_id FROM korisnik WHERE korisnicko_ime = %s;",(kor_ime,))
    korisnik_id = cursor.fetchone()
    return korisnik_id['korisnik_id']


@autentikacija_blueprint.route("/registracija",methods=["POST"])
def registracija():
    form_data = dict(request.json)
    form_data['tip_privilegije'] = "korisnik"
    db = mysql.get_db()
    cursor = db.cursor()

    cursor.execute("SELECT korisnicko_ime FROM korisnik WHERE korisnicko_ime = %(korisnicko_ime)s;",form_data)
    korisnik = cursor.fetchone()

    cursor.execute("SELECT privilegija_id FROM privilegija WHERE tip_privilegije = %(tip_privilegije)s;",form_data)
    privilegija = cursor.fetchone()
    
    if korisnik is None:
        now = datetime.datetime.now()
        str_now = now.date().isoformat()
        form_data['datum_kreiranja'] = str_now
        cursor.execute("INSERT INTO korisnik (korisnicko_ime,email,lozinka,datum_kreiranja) VALUES (%(korisnicko_ime)s,%(email)s,%(lozinka)s,%(datum_kreiranja)s);",form_data)
        kor_id = dobavi_korisnik_id(form_data['korisnicko_ime'])
        cursor.execute("INSERT INTO korisnik_privilegije (korisnik_id,privilegija_id) VALUES (%s,%s);",(kor_id,privilegija['privilegija_id']))
        db.commit()

        return jsonify(None),201
    
    return jsonify(None),401


@autentikacija_blueprint.route("/prijava",methods=["POST"])
def prijava():
    form_data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM korisnik WHERE korisnicko_ime = %(korisnicko_ime)s \
        AND lozinka = %(lozinka)s;",form_data)
    korisnik = cursor.fetchone()
    if korisnik: 
        cursor.execute("SELECT privilegija.tip_privilegije FROM privilegija \
                        INNER JOIN korisnik_privilegije ON privilegija.privilegija_id = korisnik_privilegije.privilegija_id \
                        INNER JOIN korisnik ON korisnik.korisnik_id = korisnik_privilegije.korisnik_id WHERE korisnik.korisnik_id = %(korisnik_id)s;",korisnik)
        prava_pristupa = []
        for pravo in cursor.fetchall():
            prava_pristupa.append(pravo['tip_privilegije'])
        
        payload = {
            "korisnik_id":korisnik['korisnik_id'],
            "korisnicko_ime":korisnik['korisnicko_ime'],
            "prava_pristupa":prava_pristupa
        }

        access_token = create_access_token(identity=payload)

        
        return jsonify(access_token=access_token),201

    return jsonify("Neuspesna prijava"),401