from sqlmodel import Field, SQLModel # type: ignore

class Application(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    app_name: str
    last_name: str
    first_name: str
    middle_name: str
    birth_date: str # Follows "YYYY-MM-DD" format
    sex: str # Choice of "M"/"F"/"X"
    height: int = Field(default=0) # in cm
    address_street_unit: str # Units can be num/alpha/mixed | optional if po/rr filled
    address_street_num: int # Must be number | optional if po/rr filled
    address_street_name: str # optional if po/rr filled
    address_po: str # see * note below
    city: str
    province: str
    postal_code: str
    submitted: int = Field(default=0) # Only 0 or 1 (FALSE/TRUE VALUE)

# Notes
# * Automatically attach string "PO BOX " for PO Box, "RR" for Rural Route or "GD" for General Delivery Addresses | optional if address_street_* fields filled | based on Canadian addressing guidelines at https://www.canadapost-postescanada.ca/cpc/en/support/articles/addressing-guidelines/canadian-addresses.page for more information