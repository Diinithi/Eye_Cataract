import os
import subprocess
import sys
import time
from pathlib import Path

from pymongo import MongoClient
from pymongo.errors import PyMongoError


MONGO_BIN = Path(r"D:\MongoDB\bin\mongod.exe")
MONGO_DB_PATH = Path(r"D:\MongoDB\data\db")
MONGO_LOG_PATH = Path(r"D:\MongoDB\log\mongod.log")
MONGO_URI = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = "Cataract_Detection"


def ensure_mongo_running():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
        client.admin.command("ping")
        print("MongoDB is already running")
        return
    except Exception:
        print("MongoDB is not running; starting it...")

    if not MONGO_BIN.exists():
        raise FileNotFoundError(
            f"MongoDB binary not found at {MONGO_BIN}. Install MongoDB first."
        )

    MONGO_DB_PATH.mkdir(parents=True, exist_ok=True)
    MONGO_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)

    subprocess.Popen(
        [
            str(MONGO_BIN),
            "--dbpath",
            str(MONGO_DB_PATH),
            "--logpath",
            str(MONGO_LOG_PATH),
            "--bind_ip",
            "127.0.0.1",
            "--port",
            "27017",
            "--logappend",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0,
    )

    for _ in range(30):
        time.sleep(1)
        try:
            client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)
            client.admin.command("ping")
            print("MongoDB started successfully")
            return
        except Exception:
            continue

    raise RuntimeError("MongoDB could not be started. Check the log file: D:/MongoDB/log/mongod.log")


def create_database():
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client[DB_NAME]

    collections = ["users", "images", "predictions"]
    for collection_name in collections:
        if collection_name not in db.list_collection_names():
            db.create_collection(collection_name)
            print(f"Created collection: {collection_name}")
        else:
            print(f"Collection already exists: {collection_name}")

    print(f"Database ready: {DB_NAME}")
    print("Sample DBs:", client.list_database_names())


if __name__ == "__main__":
    try:
        ensure_mongo_running()
        create_database()
        sys.exit(0)
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        sys.exit(1)
