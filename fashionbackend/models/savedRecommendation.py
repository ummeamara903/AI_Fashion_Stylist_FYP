from sqlalchemy import Column, Integer, String
from core.database import Base

class SavedRecommendation(Base):
    __tablename__ = "saved_recommendations"

    id = Column(Integer, primary_key=True, index=True)

    user = Column(String, index=True)

    gender = Column(String)
    season = Column(String)
    occasion = Column(String)
    dress_type = Column(String)
    budget = Column(Integer)

    product = Column(String)
    shoes = Column(String)
    accessory = Column(String)
    color = Column(String)