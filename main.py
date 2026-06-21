from fastapi import FastAPI
from routers import student_route, teacher_route
from fastapi.middleware.cors import CORSMiddleware
import database.db as db



app = FastAPI(
    title = "School Management Software"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"title": "School Management Software"}

app.include_router(student_route.router)
app.include_router(teacher_route.router)