from fastapi import FastAPI # type: ignore
from model import hero
from sqlite_query import Query

app = FastAPI()

@app.get("/")
async def root():
    return hero

@app.get("/applications")
async def readApplications():
    return Query("on_dr.db").fetchAll("SELECT * FROM applications")
