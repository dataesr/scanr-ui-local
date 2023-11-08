
import os
from app.routers import publications_routes
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi import FastAPI, status as statuscode


app = FastAPI(
    title="scanR API",
    description="API de scanR",
    version="1.0.0",
)

# Configure CORS for non-production modes
deployment_mode = os.environ.get("MODE", "production")
if deployment_mode != "production":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(publications_routes)
