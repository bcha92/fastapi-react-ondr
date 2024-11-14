from typing import Optional
from sqlmodel import Field, SQLModel

class Application(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    last_name: str
    first_name: str
    middle_name: str
    birth_date: str
    sex: str
    height: str
    unit_num: str
    street_num: str
    street_name: str
    po_box: str
    city: str
    province: str
    postal_code: str
    completed: bool

class ErrorMessage(SQLModel, table=False):
    message: str
    error: Optional[str]