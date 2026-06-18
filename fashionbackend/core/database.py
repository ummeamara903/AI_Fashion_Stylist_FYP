from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:uammara650@localhost:5432/fashion_db"
# DATABASE_URL=postgresql+psycopg2://postgres:uammara650@localhost:5432/ai_fashion_db

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()


