"""
FastAPI Application Entry Point for Railway
This file exposes the FastAPI app for Railpack auto-detection.
Railway will run: uvicorn app:app
"""
# Import the FastAPI app instance from our package
# This makes it available as: app:app for uvicorn
from job_board_aggregator.server.app import app

# Railpack will automatically run: uvicorn app:app --host 0.0.0.0 --port $PORT
