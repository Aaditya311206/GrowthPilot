import os
from sqlalchemy import create_engine
import pandas as pd
from dotenv import load_dotenv

def get_engine():
    # Load from the backend folder where .env lives
    env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/.env'))
    load_dotenv(dotenv_path=env_path)
    
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        raise ValueError("DATABASE_URL is missing. Please ensure the backend/.env file is configured correctly.")
        
    # Fix standard postgresql scheme for SQLAlchemy to use pg8000
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql+pg8000://", 1)
    elif db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+pg8000://", 1)
        
    # Remove unsupported query parameters for pg8000
    if "?" in db_url:
        db_url = db_url.split("?")[0]
        
    return create_engine(db_url)

def fetch_data(query: str) -> pd.DataFrame:
    engine = get_engine()
    with engine.connect() as conn:
        return pd.read_sql_query(query, conn)
