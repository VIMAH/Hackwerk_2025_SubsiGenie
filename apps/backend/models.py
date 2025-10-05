from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

# Request/Response Models
class StartApplicationRequest(BaseModel):
    entrepreneurId: str

class StartApplicationResponse(BaseModel):
    applicationId: str
    requirements: Dict[str, Any]
    availableCredentials: List[str]
    missingCredentials: List[str]

class DraftRequest(BaseModel):
    applicationId: str
    availableCredentials: List[Dict[str, Any]]

class DraftResponse(BaseModel):
    draft: Dict[str, Any]
    missingFields: List[str]

class CompleteApplicationRequest(BaseModel):
    applicationId: str
    additionalInformation: Dict[str, Any]

class CompleteApplicationResponse(BaseModel):
    draft: Dict[str, Any]
    attestation: Dict[str, Any]

class ConfirmAttestationRequest(BaseModel):
    applicationId: str
    pin: str

class ConfirmAttestationResponse(BaseModel):
    success: bool
    attestation: Dict[str, Any]

class SubmitToRvoRequest(BaseModel):
    applicationId: str
    attestation: Dict[str, Any]

class SubmitToRvoResponse(BaseModel):
    success: bool
    submission: Dict[str, Any]

class DashboardData(BaseModel):
    availableCredentials: List[Dict[str, Any]]
    missingCredentials: List[str]
    recentApplications: List[Dict[str, Any]]
    canStartApplication: bool

class ApiError(BaseModel):
    error: str
    message: str
    statusCode: int

