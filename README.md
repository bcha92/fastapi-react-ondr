# FASTAPI-REACT ONTARIO DRIVER LICENSE APPLICATION

## Getting Started

### Installing Backend Dependencies

```bash
cd backend
pip install fastapi
cd ..
```

### Backend Server Initialization (FASTAPI)

```bash
fastapi dev backend/main.py
```

#### Create SQLite Table and Sample Rows (ONLY NEEDS TO BE DONE ONCE)

To create the SQL Table for Applications and Populate with Sample Values, GET endpoint `/create-sqlite-db-table-and-populate/` at your localhost link
Default localhost endpoint: `http://127.0.0.1:8000/create-sqlite-db-table-and-populate/`

### Frontend Application Initialization (NEXTJS)

```bash
cd frontend
npm install
npm run dev
```
