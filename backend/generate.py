# Generate Table File (ONLY NEEDS TO BE EXECUTED ONCE)
import sqlite3

con = sqlite3.connect("on_dr.db")
cur = con.cursor()

cur.execute("CREATE TABLE applications(id, name, last_name, first_name, middle_name, birth_date, sex, height, unit_num, street_num, street_name, po_box, city, province, postal_code)")
cur.execute("""
            INSERT INTO applications VALUES
            (0, 'John Smith', 'Smith', 'John', 'Wayne', 1900-01-01, 'M', 185, '101', 296, 'Parliament St', '', 'Toronto', 'ON', 'M5A 3A4'),
            (1, 'Valerie Tremblay', 'Tremblay', 'Valerie', 'Michelle', 2000-12-31, 'F', 155, '505', 88, 'Bd René-Lévesque Blvd O', '', 'Montréal', 'QC', 'H2Z 1A2'),
            (2, 'Kung Fu Po', 'Panda', 'Po', '', 2008-06-06, 'M', 120, NULL, NULL, '', 'PO BOX 30205', 'Kingston', 'ON', 'K7L 1H0'),
            (3, 'B9hA1x0', 'Bellamy', '', '', NULL, 'X', 177, 'B', NULL, 'Anywhere Ln', '', '', 'BC', '')
""")
con.commit()
con.close()