from fastapi import APIRouter
from database import db
import datetime
from pydantic import BaseModel
from typing import Optional


router = APIRouter(
    tags=['students']
)

# Schema
class Student(BaseModel):
    name:Optional[str] = None
    date_of_birth:Optional[datetime.date] = None
    gender:Optional[str] = None
    phone:Optional[str]=None
    class_id:Optional[int]=None

    
# student endpoints
@router.get("/students/")
async def get_student(student_name: Optional[str]=None, date_of_birth: Optional[datetime.date]=None, gender:Optional[str]=None, phone:Optional[str]=None, class_id:Optional[int]=None):
    conn = db.get_db_connection()
    query = "SELECT * FROM students WHERE 1=1"
    params = []
    if student_name:
        query += " AND student_name = ?"
        params.append(student_name)
    if date_of_birth:
        query += " AND date_of_birth = ?"
        params.append(date_of_birth)
    if gender:
        query += " AND gender = ?"
        params.append(gender)
    if phone:
        query += " AND phone = ?"
        params.append(phone)
    if class_id:
        query += " AND class_id = ?"
        params.append(class_id)
    students = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(student) for student in students]
     

@router.get("/students/{id}")
async def students_id(id:int):
    conn = db.get_db_connection()

    student = conn.execute("SELECT * FROM students WHERE student_id = ?", (id,)).fetchone()

    conn.close()
    
    if student is None:
        return {"message": "Student not found"}
    
    return dict(student)

@router.post("/students/")
async def add_student(student:Student):
    conn = db.get_db_connection()
    conn.execute(
        """INSERT INTO students
        (
            student_name,
            date_of_birth,
            gender,
            phone,
            class_id
        ) VALUES (?,?,?,?,?)""",(
            student.name,
            student.date_of_birth,
            student.gender,
            student.phone,
            student.class_id
        )
    )
    conn.commit()
    conn.close()
    return {"message": f"Student {student.name} added successfully"}

@router.put("/students/{id}")
async def update_student(id:int, student:Student):
    conn = db.get_db_connection()
    conn.execute(
        """
        UPDATE students
        SET student_name = ?,
            date_of_birth = ?,
            gender = ?,
            phone = ?,
            class_id = ?
        WHERE student_id = ?
        """,
        (
            student.name,
            student.date_of_birth,
            student.gender,
            student.phone,
            student.class_id,
            id
        )
    )
    conn.commit()
    conn.close()
    return {"message": f"Student {student.name} updated successfully"}

@router.delete("/students/{id}")
async def delete_student(id:int):
    conn = db.get_db_connection()

    student = conn.execute(
        "SELECT * FROM students WHERE student_id = ?", (id,)
    ).fetchone()
    if student is None:
        return {"message": "Student not found"}
    else:
        conn.execute("DELETE FROM students WHERE student_id=?", (id,))
    
        conn.commit()
        conn.close()
        return {"message": "Student deleted succesfully"}