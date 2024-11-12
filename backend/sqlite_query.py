import sqlite3

class Query:
    def __init__(self, db_name: str="on_dr.db"):
        try:
            self.name = db_name
            global sql_connect
            sql_connect = sqlite3.connect(db_name)
            global cursor # initialize global query cursor
            cursor = sql_connect.cursor()
        except sqlite3.Error as error:
            print("Failed to load database", error)
    
    def close():
        if sql_connect:
            sql_connect.close()
            print("The sqlite connection is closed")
        
    
    def fetchAll(self, query: str="SELECT * FROM applications"):
        try:
            return cursor.execute(query).fetchall()
        except sqlite3.Error as error:
            print("Failed to read data from table", error)
        finally: Query.close()


