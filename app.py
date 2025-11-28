"""
FastAPI Application Entry Point for Railway
This file is detected by Railpack and starts the FastAPI server automatically.
"""
import os
import uvicorn

# Import the FastAPI app from our package
from job_board_aggregator.server.app import app

if __name__ == "__main__":
    # Railway sets the PORT environment variable
    port = int(os.getenv('PORT', 8080))

    print(f"Starting FastAPI server on port {port}...")

    # Start uvicorn server
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info"
    )
