from sqlalchemy import Column, Integer, String
from core.database import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)

    user = Column(String, index=True, nullable=False)

    gender = Column(String)
    season = Column(String)
    occasion = Column(String)
    dress_type = Column(String)
    budget = Column(Integer)

    product = Column(String)
    shoes = Column(String)
    accessory = Column(String)
    color = Column(String)