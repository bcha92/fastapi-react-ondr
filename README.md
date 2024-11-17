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

Default localhost address: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

#### Automated Create SQLite Table and Sample Rows (ONLY NEEDS TO BE DONE ONCE)

To create the SQL Table for Applications and Populate with Sample Values via FastAPI, use the `POST` endpoint `/generate-new-db-table/values` at your localhost link. No Request Body required for this process.
Default localhost endpoint: [http://127.0.0.1:8000/generate-new-db-table/values](http://127.0.0.1:8000/generate-new-db-table/values)

If that's not possible, we can provide you a pre-fabricated db file in the `backend` folder. Simply rename the existing `local.db.sample` to `local.db` and it's ready to use.

### Endpoints

GET `/`
GET `/application/{app_id}`
POST `/create`
PATCH `/save/{app_id}`
PATCH `/save/{app_id}?submit=true`
DELETE `/delete/{app_id}`

POST `/generate-new-db-table/values`
POST `/generate-new-db-table`
POST `/generate-sample-values`

### Frontend Application Initialization (NEXTJS)

```bash
cd frontend
npm install
npm run dev
```

Default localhost address: [http://localhost:3000](http://localhost:3000)
