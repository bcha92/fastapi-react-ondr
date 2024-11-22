from sqlmodel import Field, SQLModel # type: ignore
import re

class AppName(SQLModel):
    app_name: str

class CreatedOutput(AppName):
    id: int

class AppForm(AppName):
    last_name: str
    first_name: str
    middle_name: str
    birth_date: str # Follows "YYYY-MM-DD" format
    sex: str # Choice of "M"/"F"/"X"
    height: int = Field(default=0) # in cm
    address_street_unit: str # Units can be num/alpha/mixed | optional if po/rr filled
    address_street_num: str # Must be number | optional if po/rr filled
    address_street_name: str # optional if po/rr filled
    address_po: str # see * note below
    city: str
    province: str
    postal_code: str

class Application(AppForm, table=True):
    id: int | None = Field(default=None, primary_key=True)
    submitted: int = Field(default=0) # Only 0 or 1 (FALSE/TRUE VALUE)

class SuccessBody(SQLModel, table=False):
    code: int
    message: str
    body: Application

def output_body(code: int, message: str, output: any = {}):
    return {
        "code": code,
        "message": message,
        "body": output
        }

def form_errors(form: AppForm) -> list[str]:
    errors_list = []
    provinces = ["PE", "NS", "NB", "NL", "QC", "ON", "MB", "SK", "AB", "BC", "YT", "NT", "NU"]
    genders = ["M", "F", "X"]
    a = [len(form.address_street_num), len(form.address_street_name), len(form.address_po)] # addresss length
    
    if len(form.last_name) == 0: errors_list.append("last_name")
    if len(form.first_name) == 0: errors_list.append("first_name")
    
    # Valid Date checker
    if len(form.birth_date) == 0:
        errors_list.append("birth_date")
    else:
        bd2 = form.birth_date.split("-")
        bd = [int(bd2[0]), int(bd2[1]), int(bd2[2])]
        days30 = [4, 6, 9, 11] # These months only have 30 days
        if bd[0] < 1900 or bd[0] > 2024:
            errors_list.append("birth_date")
        elif bd[1] > 12:
            errors_list.append("birth_date")
        elif bd[2] > 31:
            errors_list.append("birth_date")
        elif bd[1] == 2 and bd[2] > 29: # February only has up to 29 days
            errors_list.append("birth_date")
        elif bd[1] in days30 and bd[2] > 30:
            errors_list.append("birth_date")
    
    if (form.sex not in genders): errors_list.append("sex")
    if form.height < 1: errors_list.append("height")
    
    # Address Checker
    if a[2] == 0 and a[0] == 0 and a[1] == 0:
        errors_list.append("address_po")
    elif a[2] == 0 and a[0] != 0 and a[1] == 0:
        errors_list.append("address_po")
    elif a[2] == 0 and a[0] == 0 and a[1] != 0:
        errors_list.append("address_po")
    
    if len(form.city) == 0: errors_list.append("city")
    if form.province not in provinces: errors_list.append("province")
    
    # Postal code will follow the A1A 1A1 regular expression check
    if re.search(r"[A-Z]{1}\d{1}[A-Z]{1}\s{1}\d{1}[A-Z]{1}\d{1}", form.postal_code.upper()) == None: errors_list.append("postal_code")
    
    return errors_list

# Notes
# * Automatically attach string "PO BOX " for PO Box, "RR" for Rural Route or "GD" for General Delivery Addresses | optional if address_street_* fields filled | based on Canadian addressing guidelines at https://www.canadapost-postescanada.ca/cpc/en/support/articles/addressing-guidelines/canadian-addresses.page for more information