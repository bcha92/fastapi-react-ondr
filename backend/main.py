from typing import Annotated
from fastapi import FastAPI, Path # type: ignore
from model import Application

app = FastAPI()

@app.get("/")
async def root():
    return []

@app.get("/application/{app_id}")
async def getApplication(app_id: Annotated[str, Path(name="application-id")]):
    return app_id

# Refine creating new application with request body
@app.post("/create/")
async def create_new(new_app: Application):
    return new_app

# Refine update application with request body when component is updated
@app.patch("/update/{app_id}")
async def updateApplication(app_id: Annotated[str, Path(name="application-id")]):
    return app_id

# Refine delete application
@app.delete("/delete/{app_id}")
async def deleteApplication(app_id: Annotated[str, Path(name="application-id")]):
    return app_id