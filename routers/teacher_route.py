from fastapi import APIRouter
from database import db
import datetime
from pydantic import BaseModel

class Teacher(BaseModel):
    name:str


router = APIRouter(
    tags = ["teachers"]
)


@router.get("/teachers/")
async def teacher():
    conn = db.get_db_connection()
    teachers = conn.execute(
        """
        SELECT * FROM teachers
    """
    ).fetchall()
    conn.close()
    return [dict(teacher) for teacher in teachers]

@router.get("/teachers/{id}")
async def get_teacher_id(id:int):
    conn = db.get_db_connection()
    teacher = conn.execute("""
    SELECT * FROM teachers WHERE teacher_id = ?
    """,
    (id,)).fetchone()
    conn.close()
    return dict(teacher)

@router.post("/teachers/")
async def create_teacher(teacher:Teacher):
    conn = db.get_db_connection()
    conn.execute(
        """INSERT INTO teachers(teacher_name)
        VALUES (?)""", (teacher.name,))
    conn.commit()
    conn.close()
    return {"message":f"{teacher.name} is added"}

@router.delete("/teachers/{id}")
async def delete_teacher(id:int):
    conn = db.get_db_connection()
    conn.execute(
        "DELETE FROM teachers WHERE teacher_id=?",(id,)
    )
    conn.commit()
    conn.close()
    return {"message":"Teacher deleted successfully"}
