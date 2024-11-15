from typing import Annotated
from fastapi import FastAPI, Path, HTTPException # type: ignore
from helper import Query, httpCode

app = FastAPI()

@app.get("/")
async def all_applications():
    get_all = Query().get_all_applications()
    return get_all

@app.get("/application/{app_id}")
async def one_application(app_id: Annotated[str, Path(name="application-id")]):
    get_one = Query().get_one_by_id(app_id)
    return get_one if get_one != None else httpCode(404)

# Refine creating new application with request body
@app.post("/create/")
async def new_application():
    new_row_id = Query().create_new()
    return new_row_id if new_row_id != None else httpCode(404, "Application create exception")

# Refine update application with request body when component is updated
@app.patch("/update/{app_id}")
async def update_application(app_id: Annotated[str, Path(name="application-id")]):
    return app_id

# Refine delete application
@app.delete("/delete/{app_id}")
async def delete_application(app_id: Annotated[str, Path(name="application-id")]):
    deleted_id = Query().delete_one_by_id(app_id)
    return deleted_id if deleted_id != None else httpCode(404, "Application delete exception")

# Misc Endpoint - Generate SQLite DB, Table, and Values
@app.get("/create-sqlite-db-table-and-populate/")
async def generate_db():
    created_values = Query.geneate_db_and_sample_values()
    return "SQLite DB, Table, and Sample Values have been successfully populated. Please return to your localhost (default: http://127.0.0.1:8000/) to check!" if len(created_values) > 0 else httpCode(404, "Application create exception - Unable to generate db, table, and/or values")