from sqlalchemy import Column, Integer, String
from core.database import Base

class SavedImage(Base):
    __tablename__ = "saved_images"

    id = Column(Integer, primary_key=True, index=True)
    user = Column(String, index=True) 
    image_id = Column(Integer, index=True)
    image_url = Column(String)
    category = Column(String, nullable=True)
