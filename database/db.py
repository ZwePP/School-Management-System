from pathlib import Path
import sqlite3

current_file = Path(__file__).resolve()
parent_dir = current_file.parent.parent #to get myschool_db.db

DB_PATH = parent_dir / "myschool_db.db"

#cursor object to execute queries

def get_db_connection():
    cursor = sqlite3.connect(DB_PATH)
    cursor.row_factory = sqlite3.Row
    cursor.execute("PRAGMA foreign_keys = ON")
    return cursor
