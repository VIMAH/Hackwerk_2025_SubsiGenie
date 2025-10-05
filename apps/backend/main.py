from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
from typing import Dict, List, Any
import json
import uuid
from datetime import datetime
import asyncio

from models import (
    StartApplicationRequest, StartApplicationResponse,
    DraftRequest, DraftResponse,
    CompleteApplicationRequest, CompleteApplicationResponse,
    ConfirmAttestationRequest, ConfirmAttestationResponse,
    SubmitToRvoRequest, SubmitToRvoResponse,
    DashboardData, ApiError
)
# from services.agent_service import AgentService
# from services.attestation_service import AttestationService
# from services.rvo_service import RvoService
# from services.wallet_service import WalletService

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Entrepreneur AI Agent API",
    description="AI Agent for DHI subsidy applications",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services (commented out for demo)
# agent_service = AgentService()
# attestation_service = AttestationService()
# rvo_service = RvoService()
# wallet_service = WalletService()

# In-memory storage for demo purposes
applications: Dict[str, Any] = {}

@app.get("/")
async def root():
    return {"message": "Entrepreneur AI Agent API", "version": "1.0.0"}

@app.get("/api/dashboard", response_model=DashboardData)
async def get_dashboard():
    """Get dashboard data showing available credentials and recent applications"""
    try:
        # Demo data for testing
        available_credentials = [
            {
                "id": "auth_001",
                "type": "AuthenticationCredential",
                "credentialSubject": {"authentication": "verified"}
            },
            {
                "id": "business_001", 
                "type": "BusinessCredential",
                "credentialSubject": {
                    "kvkNumber": "12345678",
                    "statutoryName": "Demo Company BV"
                }
            }
        ]
        missing_credentials = []
        recent_applications = list(applications.values())[-5:]  # Last 5 applications
        
        return DashboardData(
            availableCredentials=available_credentials,
            missingCredentials=missing_credentials,
            recentApplications=recent_applications,
            canStartApplication=len(missing_credentials) == 0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/application/start", response_model=StartApplicationResponse)
async def start_application(request: StartApplicationRequest):
    """Step 1-3: Start application and get RVO requirements"""
    try:
        application_id = str(uuid.uuid4())
        
        # Step 2: Send request to RVO AI Agent
        rvo_response = await rvo_service.get_requirements()
        
        # Step 3: Check available credentials
        available_credentials = await wallet_service.get_available_credentials(rvo_response["requirements"]["requestedCredentials"])
        missing_credentials = await wallet_service.get_missing_credentials_for_requirements(rvo_response["requirements"]["requestedCredentials"])
        
        # Store application
        applications[application_id] = {
            "id": application_id,
            "entrepreneurId": request.entrepreneurId,
            "status": "started",
            "requirements": rvo_response["requirements"],
            "availableCredentials": available_credentials,
            "missingCredentials": missing_credentials,
            "createdAt": datetime.now().isoformat()
        }
        
        return StartApplicationResponse(
            applicationId=application_id,
            requirements=rvo_response["requirements"],
            availableCredentials=[cred["type"] for cred in available_credentials],
            missingCredentials=missing_credentials
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/agent/draft", response_model=DraftResponse)
async def create_draft(request: DraftRequest):
    """Step 4-7: Create AI-generated draft with available data"""
    try:
        if request.applicationId not in applications:
            raise HTTPException(status_code=404, detail="Application not found")
        
        application = applications[request.applicationId]
        
        # Step 4-5: Check credentials and inform RVO
        rvo_additional_info = await rvo_service.get_additional_requirements(application["requirements"])
        
        # Step 6-7: Create draft with available data
        draft = await agent_service.create_draft(
            application_id=request.applicationId,
            available_credentials=request.availableCredentials,
            additional_requirements=rvo_additional_info["additionalInformation"]
        )
        
        # Update application
        applications[request.applicationId]["draft"] = draft
        applications[request.applicationId]["status"] = "draft_created"
        
        return DraftResponse(
            draft=draft,
            missingFields=draft["missingFields"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/entrepreneur/complete", response_model=CompleteApplicationResponse)
async def complete_application(request: CompleteApplicationRequest):
    """Step 8-10: Complete application with entrepreneur input"""
    try:
        if request.applicationId not in applications:
            raise HTTPException(status_code=404, detail="Application not found")
        
        application = applications[request.applicationId]
        
        # Update draft with entrepreneur input
        updated_draft = await agent_service.update_draft(
            application_id=request.applicationId,
            additional_information=request.additionalInformation
        )
        
        # Step 10: Create new attestation
        attestation = await attestation_service.create_attestation(
            application_id=request.applicationId,
            wallet_credentials=application["availableCredentials"],
            additional_information=request.additionalInformation
        )
        
        # Update application
        applications[request.applicationId]["draft"] = updated_draft
        applications[request.applicationId]["attestation"] = attestation
        applications[request.applicationId]["status"] = "ready_for_confirmation"
        
        return CompleteApplicationResponse(
            draft=updated_draft,
            attestation=attestation
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/attestation/confirm", response_model=ConfirmAttestationResponse)
async def confirm_attestation(request: ConfirmAttestationRequest):
    """Step 11: Confirm attestation with PIN/fingerprint simulation"""
    try:
        if request.applicationId not in applications:
            raise HTTPException(status_code=404, detail="Application not found")
        
        application = applications[request.applicationId]
        
        # Simulate PIN verification (in production, this would be real biometric verification)
        if request.pin != "1234":  # Demo PIN
            raise HTTPException(status_code=401, detail="Invalid PIN")
        
        # Update application status
        applications[request.applicationId]["status"] = "confirmed"
        applications[request.applicationId]["confirmedAt"] = datetime.now().isoformat()
        
        return ConfirmAttestationResponse(
            success=True,
            attestation=application["attestation"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/rvo/submit", response_model=SubmitToRvoResponse)
async def submit_to_rvo(request: SubmitToRvoRequest):
    """Step 12-13: Submit to RVO and get confirmation"""
    try:
        if request.applicationId not in applications:
            raise HTTPException(status_code=404, detail="Application not found")
        
        application = applications[request.applicationId]
        
        # Step 12: Submit to RVO
        submission = await rvo_service.submit_application(
            application_id=request.applicationId,
            attestation=request.attestation
        )
        
        # Step 13: Update application status
        applications[request.applicationId]["submission"] = submission
        applications[request.applicationId]["status"] = "submitted"
        applications[request.applicationId]["submittedAt"] = datetime.now().isoformat()
        
        return SubmitToRvoResponse(
            success=True,
            submission=submission
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/application/{application_id}")
async def get_application(application_id: str):
    """Get application status and details"""
    if application_id not in applications:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return applications[application_id]

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content=ApiError(
            error="Internal Server Error",
            message=str(exc),
            statusCode=500
        ).dict()
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

