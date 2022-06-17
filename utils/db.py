import errno
from flaskext.mysql import MySQL
import pymysql


mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)