import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = ""

    class Config:
        env_file = os.path.join(os.path.dirname(__file__), '../../../backend/.env')
        env_file_encoding = 'utf-8'

settings = Settings()

# Patch scheme for SQLAlchemy
if settings.database_url.startswith("postgres://"):
    settings.database_url = settings.database_url.replace("postgres://", "postgresql+pg8000://", 1)
elif settings.database_url.startswith("postgresql://"):
    settings.database_url = settings.database_url.replace("postgresql://", "postgresql+pg8000://", 1)

# Remove query params for pg8000
if "?" in settings.database_url:
    settings.database_url = settings.database_url.split("?")[0]
