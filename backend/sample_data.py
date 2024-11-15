db_name = "local.db"

# Sample Table Row Values
db_sample_values = [
    {
        "app_name": "JSmith",
        "last_name": "Smith",
        "first_name": "John",
        "middle_name": "Wayne",
        "birth_date": "1900-01-01",
        "sex": "M",
        "height": 185,
        "address_street_unit": "101",
        "address_street_num": "296",
        "address_street_name": "Parliament St",
        "address_po": "",
        "city": "Toronto",
        "province": "ON",
        "postal_code": "M5A 3A4",
        "submitted": 1
    },
    {
        "app_name": "VTremblay",
        "last_name": "Tremblay",
        "first_name": "Valerie",
        "middle_name": "Michelle",
        "birth_date": "2000-12-31",
        "sex": "F",
        "height": 155,
        "address_street_unit": "505",
        "address_street_num": "88",
        "address_street_name": "Bd René-Lévesque O",
        "address_po": "",
        "city": "Montréal",
        "province": "QC",
        "postal_code": "H2Z 1A2",
        "submitted": 0
    },
    {
        "app_name": "KF-Po",
        "last_name": "Panda",
        "first_name": "Po",
        "middle_name": "",
        "birth_date": "2006-06-06",
        "sex": "M",
        "height": 120,
        "address_street_unit": "",
        "address_street_num": "",
        "address_street_name": "",
        "address_po": "PO BOX 30205",
        "city": "Kingston",
        "province": "ON",
        "postal_code": "K7L 1H0",
        "submitted": 1
    },
    {
        "app_name": "B9hA1x0",
        "last_name": "Bellamy",
        "first_name": "",
        "middle_name": "",
        "birth_date": "",
        "sex": "X",
        "height": 0,
        "address_street_unit": "B",
        "address_street_num": "",
        "address_street_name": "Anywhere Ln",
        "address_po": "",
        "city": "",
        "province": "BC",
        "postal_code": "",
        "submitted": 0
    }
]

# Modify create table using this format
new_table = """
    CREATE TABLE "applications" (
        "id"	INTEGER UNIQUE,
        "app_name"	TEXT NOT NULL DEFAULT '',
        "last_name"	TEXT NOT NULL DEFAULT '',
        "first_name"	TEXT NOT NULL DEFAULT '',
        "middle_name"	TEXT NOT NULL DEFAULT '',
        "birth_date"	TEXT NOT NULL DEFAULT '',
        "sex"	TEXT NOT NULL DEFAULT '',
        "height"	INTEGER NOT NULL DEFAULT 0,
        "address_street_unit"	TEXT NOT NULL DEFAULT '',
        "address_street_num"	TEXT NOT NULL DEFAULT '',
        "address_street_name"	TEXT NOT NULL DEFAULT '',
        "address_po"	TEXT NOT NULL DEFAULT '',
        "city"	TEXT NOT NULL DEFAULT '',
        "province"	TEXT NOT NULL DEFAULT '',
        "postal_code"	TEXT NOT NULL DEFAULT '',
        "submitted"	INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY("id" AUTOINCREMENT)
    )
"""
