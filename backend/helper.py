from sqlmodel import SQLModel, create_engine, Session, select # type: ignore
from model import Application, AppForm
from sample_data import db_name, db_sample_values

class Query:
    # DB Initialization Functions
    global sqlite_url
    global engine
    sqlite_url = f"sqlite:///{db_name}"
    engine = create_engine(sqlite_url)
    
    # Helper Functions
    def get_all_applications(self) -> list[Application]:
        with Session(engine) as session:
            statement = select(Application)
            result = session.exec(statement).all()
        return result
    
    def get_one_by_id(self, id: int) -> Application:
        with Session(engine) as session:
            statement = select(Application).where(Application.id == id)
            result = session.exec(statement).one()
        return result
    
    def create_new(self, name: str) -> int:
        application = Application(
            app_name=name, last_name="", first_name="", middle_name="", birth_date="", sex="X", height=0, address_street_unit="", address_street_num="", address_street_name="", address_po="", city="", province="ON", postal_code="", submitted=0
        )
        with Session(engine) as session:    
            session.add(application)
            session.commit()
            session.refresh(application)
            result = session.get(Application, application.id)
        return result.id
    
    def update_one_application(self, cur: Application, new: AppForm, submit: bool = False) -> Application | bool | None:
        with Session(engine) as session:
            # Update each cur value on session to new values
            cur.app_name = new.app_name
            cur.last_name = new.last_name
            cur.first_name = new.first_name
            cur.middle_name = new.middle_name
            cur.birth_date = new.birth_date
            cur.sex = new.sex.upper()
            cur.height = new.height
            cur.address_street_unit = new.address_street_unit
            cur.address_street_num = new.address_street_num
            cur.address_street_name = new.address_street_name
            cur.address_po = new.address_po.upper()
            cur.city = new.city
            cur.province = new.province.upper()
            cur.postal_code = new.postal_code.upper()
            # Only flag to change for final submit
            if submit: cur.submitted = 1
            
            # **FUTURE TDO**: iterate update values in a loop / ignore update if old/new values are identical
            
            
            session.add(cur)
            session.commit()
            session.refresh(cur)
        return cur
    
    def delete_one_application(self, application: Application) -> any:
        with Session(engine) as session:
            session.delete(application)
            session.commit()
        return application
    
    # Create database, table, and populate sample values helpers
    def generate_db_and_table() -> None:
        SQLModel.metadata.create_all(engine)
    
    def generate_sample_values() -> list[Application]:
        generated_apps = list()
        for a in db_sample_values: # shortened 'application' to 'a'
            application = Application(
                app_name=a["app_name"], last_name=a["last_name"], first_name=a["first_name"], middle_name=a["middle_name"], birth_date=a["birth_date"], sex=a["sex"], height=a["height"], address_street_unit=a["address_street_unit"], address_street_num=a["address_street_num"], address_street_name=a["address_street_name"], address_po=a["address_po"], city=a["city"], province=a["province"], postal_code=a["postal_code"], submitted=a["submitted"]
            )
            
            with Session(engine) as session:    
                session.add(application)
                session.commit()
            generated_apps.append(a)
        return generated_apps
