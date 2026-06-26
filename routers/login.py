from fastapi import APIRouter
from database import db


router = APIRouter(
    tags=['login']
)


# get username and password from login form
@router.post("/login")
def get_user():
    pass