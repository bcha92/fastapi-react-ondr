from typing import Annotated
from fastapi import FastAPI, Path, HTTPException # type: ignore
from helper import Query, httpError
from model import AppName, AppForm, SuccessBody, output_body, form_errors
app = FastAPI()


@app.get("/")
async def all_applications():
    get_all = Query().get_all_applications()
    return output_body(200, "Sucessfully retrieved applications", get_all)


@app.get("/application/{app_id}")
async def one_application(app_id: Annotated[str, Path(name="application-id")]) -> SuccessBody:
    try:
        int_id = int(app_id) #checks if app_id is not int
        get_one = Query().get_one_by_id(int_id)
        
    except ValueError:
        httpError("Bad request. Application ID required to be parsable integer", 400)
    except:
        httpError("The application you requested does not exist or has been deleted", 404)
    
    return output_body(200, f"Sucessfully retrieved application ID #{app_id}", get_one)


@app.post("/create/", status_code=201)
async def new_application(body: AppName) -> SuccessBody:
    if body.app_name == "": httpError("Please enter a new name for application", 400)
    try:
        new_row_id = Query().create_new(body.app_name)
    except new_row_id != None:
        httpError("Application create exception", 404)
    return output_body(
        201, f"Sucessfully created a new application named {body.app_name} with ID {str(new_row_id)}",
        { "app_name": body.app_name, "id": new_row_id }
    )


@app.patch("/save/{app_id}", status_code=202)
async def update_application(app_id: Annotated[str, Path(name="application-id")], updated_body: AppForm, submit: str | None = None) -> SuccessBody:
    final: bool = submit == "true"
    application = await one_application(int(app_id))
    # Raises exception if user tries to re-submit a successful form
    if application["body"].submitted == 1:
        raise httpError("Bad request. Cannot edit form already submitted by user", 400)
    
    # Should not be submittable if errors are found in final
    if final: # Final checks with backend form verification
        form_error_list = form_errors(updated_body)
        if len(form_error_list) > 0:
            return output_body(400, str(form_error_list), application["body"])
    
    # Should update once checks finalized (or to save progress)
    updated = Query().update_one_application(application["body"], updated_body, final)
    if final:
        return output_body(201, f"Your Application has been successfully submitted!", updated)
    return output_body(202, f"The application with ID {app_id} has been successfully updated", updated)


@app.delete("/delete/{app_id}", status_code=202)
async def delete_application(app_id: Annotated[str, Path(name="application-id")]) -> SuccessBody:
    application = await one_application(int(app_id))
    
    try:
        deleted = Query().delete_one_application(application["body"])
    except ValueError:
        httpError("Bad request. Application ID required to be parsable integer", 400)
    return output_body(202, f"The application with ID {app_id} has been successfully deleted", deleted)


# Misc POST Endpoints - Generate SQLite DB, Table, and Values
@app.post("/generate-new-db-table/values", status_code=201)
async def generate_db_table_values():
    await generate_db_table()
    await generate_values()
    
    return "Crated SQLite DB and Table. Table Sample Values have been successfully populated. Please return to your localhost (default: http://127.0.0.1:8000/) to check!"


@app.post("/generate-new-db-table/", status_code=201)
async def generate_db_table():
    try:
        Query.generate_db_and_table()
    except:
        httpError(404, "Application create exception - Unable to generate db, table, and/or values")
        
    return "SQLite DB and Table successfully created. Please return to your localhost (default: http://127.0.0.1:8000/) to check!"


@app.post("/generate-sample-values/", status_code=201)
async def generate_values():
    try:
        created_values = Query.generate_sample_values()
    except len(created_values) == 0:
        httpError(404, "Application create exception - Unable to populate values")
    return "Sqlite Sample Values have been successfully populated. Please return to your localhost (default: http://127.0.0.1:8000/) to check!"