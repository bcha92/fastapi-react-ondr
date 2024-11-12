from sqlmodel import Field, SQLModel, create_engine # type: ignore


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None
    
hero: Hero = {
    "id": 0,
    "name": "Hello",
    "secret_name": "World",
    "age": 0
}