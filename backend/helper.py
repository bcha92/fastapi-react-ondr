import sqlite3
from model import Application, ErrorMessage

class Query:
    def __init__(self, db_name: str="on_dr.db"):
        try:
            self.name = db_name
            global sql_connect
            sql_connect = sqlite3.connect(db_name)
            global cursor # initialize global query cursor
            cursor = sql_connect.cursor()
        except sqlite3.Error as error:
            Query.error_message(error, "Failed to read data from table")
    
    def close():
        if sql_connect: sql_connect.close()
    
    def error_message(message: str, error: str | None = None) -> ErrorMessage:
        return { message, error } if error == str else { message }
    
    # Query Helper Functions
    def fetchAll(self, query: str) -> list[Application]:
        try:
            return cursor.execute(query).fetchall()
        except sqlite3.Error as error:
            Query.error_message("Failed to read data from table", error)
    
    def fetchOne(self, query: str) -> Application | ErrorMessage:
        try:
            result = cursor.execute(query).fetchone()
            return result if result != None else Query.error_message("No match found based on application ID provided")
        except sqlite3.Error as error:
            Query.error_message("Failed to read data from table", error)
    
    def create(self):
        print("created")
    
    def updateOne(self):
        print("updated")
    
    def delete(self):
        print("deleted")


