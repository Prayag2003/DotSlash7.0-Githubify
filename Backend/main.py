from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2AuthorizationCodeBearer
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId 
import motor.motor_asyncio 
import bcrypt
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()
app = FastAPI()

# MongoDB Configuration
DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# MongoDB Connection Dependency
async def get_database():
    client = AsyncIOMotorClient(DATABASE_URL)
    database = client[DATABASE_NAME]
    return database

class User(BaseModel):
    username: str
    email: str
    fullname: str
    password: str

# FastAPI Endpoint
@router.post("/users/register")
async def register_user(user: User, database: AsyncIOMotorClient = Depends(get_database)):
    if not user.username or not user.fullname or not user.email or not user.password:
        raise HTTPException(status_code=400, detail="All fields are compulsory.")
    
    # Checking if the user already exists
    existing_user = await database["users"].find_one({
        "$or": [{"username": user.username}, {"email": user.email}]
    })

    if existing_user:
        raise HTTPException(status_code=409, detail="User with email or username already exists")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    
    created_user = await database["users"].insert_one({
        "username": user.username.lower(),
        "email": user.email.lower(),
        "fullname": user.fullname,
        "password": hashed_password,
    })

    if not created_user:
        raise HTTPException(status_code=500, detail="Error while registering the user")

    # Response
    return JSONResponse(content={"message": "User registered successfully!"}, status_code=200)

@router.post("/users/login")
async def login_user(user_data: dict, database: AsyncIOMotorClient = Depends(get_database)):
    username = user_data.get("username")
    email = user_data.get("email")
    password = user_data.get("password")

    if not username and not email and not password:
        raise HTTPException(status_code=400, detail="Username or email is required")

    # Using mongoDB operators
    user = await database["users"].find_one({
        "$or": [{"username": username}, {"email": email}]
    })

    if not user:
        raise HTTPException(status_code=404, detail="User does not exist")

    is_valid_pass = bcrypt.checkpw(password.encode('utf-8'), user["password"])

    if not is_valid_pass:
        raise HTTPException(status_code=401, detail="Invalid user credentials")

    access_token = generate_access_token(user["_id"])
    refresh_token = generate_refresh_token(user["_id"])

    options = {
        "httpOnly": True,
        "secure": True
    }

    return JSONResponse(content={"message": "User logged in successfully!"}, status_code=200)

@router.post("/users/logout")
async def logout_user(user_data: dict, database: AsyncIOMotorClient = Depends(get_database)):
    # Extract the necessary information from the request body
    username = user_data.get("username")
    email = user_data.get("email")

    if not username and not email:
        raise HTTPException(status_code=400, detail="Username or email is required")

    # Check if the user exists
    user = await database["users"].find_one({
        "$or": [{"username": username}, {"email": email}]
    })

    if not user:
        raise HTTPException(status_code=404, detail="User does not exist")

    return JSONResponse(content={"message": "User logged out successfully!"}, status_code=200)


# Helper function to generate access token
def generate_access_token(user_id: str) -> str:
    expiration = datetime.utcnow() + timedelta(minutes=15)
    token_data = {
        "sub": str(user_id),
        "exp": expiration
    }
    token = jwt.encode(token_data, "access", algorithm="HS256")
    return token

# Helper function to generate refresh token
def generate_refresh_token(user_id: str) -> str:
    expiration = datetime.utcnow() + timedelta(days=30)
    token_data = {
        "sub": str(user_id),
        "exp": expiration
    }
    token = jwt.encode(token_data, "refresh", algorithm="HS256")
    return token

@app.get("/get_repo_info")
async def get_repo_info(github_url: str):
    return JSONResponse(content={"message": "Received GitHub URL: " + github_url}, status_code=200)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your router
app.include_router(router)