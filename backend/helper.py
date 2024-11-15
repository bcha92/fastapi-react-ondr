from sqlmodel import SQLModel, create_engine, Session, select # type: ignore
from model import Application
from main import HTTPException
from sample_data import db_name, db_sample_values

# HTTP Exception Error Handling
def httpCode(status_code: int = 404, detail: str = "Your request has not been found or does not exist."):
    raise HTTPException(status_code, detail)

class Query:
    # DB Functions
    def __init__(self, db_name: str = db_name):
        self.db_name = db_name
        global sqlite_url
        sqlite_url = f"sqlite:///{db_name}"
        global engine
        engine = create_engine(sqlite_url)
    
    # Helper Functions
    def get_all_applications(self) -> list[Application]:
        all_applications = list()
        
        with Session(engine) as session:
            statement = select(Application)
            results = session.exec(statement)
            for applicant in results:
                all_applications.append(applicant)
        
        return all_applications
    
    def get_one_by_id(self, id: int | str) -> Application | None:
        found = None
        
        try:
            with Session(engine) as session:
                statement = select(Application).where(Application.id == int(id))
                result = session.exec(statement)
                for applicant in result:
                    print(id, applicant)
                    found = applicant
        except ValueError:
            httpCode(400, "Bad request. Application ID required to be parsable integer.")
        
        return found
    
    def create_new(self) -> int | None:
        # return cursor.execute("""
        #     INSERT INTO applications (name, last_name, first_name, middle_name, birth_date, sex, height, unit_num, street_num, street_name, po_box, city, province, postal_code, completed)
        #     VALUES('', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        # """).lastrowid
        return
    
    def update_one_by_id(self):
        # print("updated")
        return
    
    def delete_one_by_id(self, id: str) -> int | None:
        # before = len(cursor.execute("SELECT * FROM applications").fetchall())
        # cursor.execute("DELETE FROM applications WHERE id = " + id)
        # after = len(cursor.execute("SELECT * FROM applications").fetchall())
        # return None if after >= before else int(id)
        return
    
    def geneate_db_and_sample_values() -> list[Application]:
        SQLModel.metadata.create_all(engine)
        generated_apps = []
        for a in db_sample_values: # shortened 'application' to 'a'
            application = Application(
                app_name=a["app_name"], last_name=a["last_name"], first_name=a["first_name"], middle_name=a["middle_name"], birth_date=a["birth_date"], sex=a["sex"], height=a["height"], address_street_unit=a["address_street_unit"], address_street_num=a["address_street_num"], address_street_name=a["address_street_name"], address_po=a["address_po"], city=a["city"], province=a["province"], postal_code=a["postal_code"], submitted=a["submitted"]
            )
            
            with Session(engine) as session:    
                session.add(application)
                session.commit()
            generated_apps.append(a)
        return generated_apps
