# Generate Table File with sample application entries (ONLY NEEDS TO BE EXECUTED ONCE)
import sqlite3

con = sqlite3.connect("on_dr.db")
cur = con.cursor()

cur.execute("CREATE TABLE applications(id, name, last_name, first_name, middle_name, birth_date, sex, height, unit_num, street_num, street_name, po_box, city, province, postal_code, completed)")
cur.execute("""
            INSERT INTO applications VALUES
            (0, 'JSmith', 'Smith', 'John', 'Wayne', '1900-01-01 00:00:00.000', 'M', '185', '101', '296', 'Parliament St', '', 'Toronto', 'ON', 'M5A 3A4', 'TRUE'),
            (1, 'VTremblay', 'Tremblay', 'Valerie', 'Michelle', '2000-12-31 00:00:00.000', 'F', '155', '505', '88', 'Bd René-Lévesque Blvd O', '', 'Montréal', 'QC', 'H2Z 1A2', 'FALSE'),
            (2, 'Kung-Fu-Po', 'Panda', 'Po', '', '2006-06-06 00:00:00.000', 'M', '120', '', '', '', 'PO BOX 30205', 'Kingston', 'ON', 'K7L 1H0', 'TRUE'),
            (3, 'B9hA1x0', 'Bellamy', '', '', '', 'X', '177', 'B', '', 'Anywhere Ln', '', '', 'BC', '', 'FALSE')
""")
con.commit()
con.close()