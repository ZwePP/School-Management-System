from fastapi import APIRouter
from database import db
import datetime
from pydantic import BaseModel


router = APIRouter(
    tags = ["teachers"]
)

@router.get("/teachers")
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
