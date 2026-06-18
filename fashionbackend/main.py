from fastapi import FastAPI
from core.database import Base, engine
from api.recommend import router as recommend_router
from api.saved import router as saved_router   
from api.savedRecommendation import router as savedrecommendation_router  
from api.auth import router as auth  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create DB tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth, prefix="/api", tags=["Auth"]) 
app.include_router(recommend_router, prefix="/api", tags=["Recommendation"])
app.include_router(saved_router, prefix="/api", tags=["Saved"]) 
app.include_router(savedrecommendation_router , prefix="/api",tags=["SavedRecommendation"])
