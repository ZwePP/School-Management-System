# School Management System

A full-stack school management web app built with **FastAPI** (backend) and **Vanilla JS** (frontend), using **SQLite** as the database.

---

## Features

- **Students** — view, search by ID, add, edit, delete
- **Teachers** — view, add, delete
- **Classes** — view class listings
- **Login** — role-based user authentication (admin / teacher / student)

---

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Backend  | FastAPI (Python)    |
| Database | SQLite              |
| Frontend | HTML, CSS, JS (ESM) |

---

## Project Structure

```
├── main.py                  # FastAPI app entry point
├── routers/
│   ├── student_route.py     # Student CRUD endpoints
│   ├── teacher_route.py     # Teacher CRUD endpoints
│   └── login.py             # Auth endpoint
├── database/
│   └── db.py                # DB connection helper
├── myschool_db.db           # SQLite database
└── frontend/
    ├── index.html
    ├── style.css
    └── js/
        ├── config.js        # Base URL config
        ├── common.js        # Shared utilities
        ├── scripts.js       # Entry point, window bindings
        ├── students.js      # Student logic
        └── teachers.js      # Teacher logic
```

---

## Getting Started

**1. Install dependencies**
```bash
pip install fastapi uvicorn
```

**2. Run the backend**
```bash
uvicorn main:app --reload
```

**3. Open the frontend**

Open `frontend/index.html` in your browser, or serve it with any static file server.

The API runs at `http://127.0.0.1:8000` by default (configurable in `js/config.js`).

---

## API Endpoints

| Method | Endpoint          | Description          |
|--------|-------------------|----------------------|
| GET    | `/`               | App title            |
| POST   | `/login`          | User login           |
| GET    | `/students/`      | List all students    |
| GET    | `/students/{id}`  | Get student by ID    |
| POST   | `/students/`      | Add a student        |
| PUT    | `/students/{id}`  | Update a student     |
| DELETE | `/students/{id}`  | Delete a student     |
| GET    | `/teachers/`      | List all teachers    |
| GET    | `/teachers/{id}`  | Get teacher by ID    |
| POST   | `/teachers/`      | Add a teacher        |
| DELETE | `/teachers/{id}`  | Delete a teacher     |

Interactive docs available at `http://127.0.0.1:8000/docs`

---

## Database Schema

| Table       | Key Fields                                              |
|-------------|---------------------------------------------------------|
| users       | user_id, username, password, role                       |
| students    | student_id, student_name, dob, gender, phone, class_id  |
| teachers    | teacher_id, teacher_name                                |
| classes     | class_id, class_name, room_no                           |
| subjects    | subject_id, subject_name, teacher_id                    |
| transcripts | transcript_id, score, subject_id, student_id            |
| attendances | attendance_id, date, status, student_id                 |
