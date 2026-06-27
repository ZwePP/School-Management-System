from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import db


router = APIRouter(
    tags=['login']
)

class LoginForm(BaseModel):
    username:str
    password:str


# get username and password from login form
@router.post("/login")
def get_user(form:LoginForm):
    conn = db.get_db_connection()
    user = conn.execute('''
    SELECT * FROM users WHERE username = ? AND password = ?
''',(form.username, form.password)).fetchone()
    conn.close()
    print(user)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "message": "Login succesfull",
        "user_id": user['user_id'],
        "username": user['username'],
        "role": user['role']
    }