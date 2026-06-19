from fastapi import FastAPI
from routers import student_route, teacher_route
import database.db as db



app = FastAPI(
    title = "School Management Software"
)

@app.get("/")
async def home():
    return {"message": "School Management Software"}

app.include_router(student_route.router)
app.include_router(teacher_route.router)