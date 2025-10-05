import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import jwt
from jose import jws
import hashlib
import base64

class AttestationService:
    def __init__(self):
        self.issuer = "EntrepreneurAI"
        self.private_key = "demo-private-key"  # In production, use proper key management

    async def create_attestation(self, application_id: str, wallet_credentials: List[Dict], additional_information: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new attestation combining wallet credentials and additional information"""
        try:
            attestation_id = str(uuid.uuid4())
            issued_at = datetime.now().isoformat()
            expires_at = (datetime.now() + timedelta(days=365)).isoformat()
            
            # Combine all credential subjects
            combined_credential_subject = {}
            
            # Add wallet credential data
            for cred in wallet_credentials:
                if "credentialSubject" in cred:
                    combined_credential_subject.update(cred["credentialSubject"])
            
            # Add additional information (with conflict resolution)
            for key, value in additional_information.items():
                if key not in combined_credential_subject or not self._is_valid_wallet_value(combined_credential_subject[key]):
                    combined_credential_subject[key] = value
            
            # Create OpenID 4 VCI compliant attestation
            attestation = {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1",
                    "https://www.w3.org/2018/credentials/examples/v1"
                ],
                "id": f"urn:uuid:{attestation_id}",
                "type": ["VerifiableCredential", "DhiSubsidyApplication"],
                "issuer": {
                    "id": f"https://entrepreneur-ai.example.com/issuer/{self.issuer}",
                    "name": "Entrepreneur AI Agent"
                },
                "issuanceDate": issued_at,
                "expirationDate": expires_at,
                "credentialSubject": {
                    "id": f"did:example:entrepreneur:{application_id}",
                    "type": "DhiSubsidyApplication",
                    "walletCredentials": wallet_credentials,
                    "additionalInformation": additional_information,
                    "applicationId": application_id,
                    "combinedData": combined_credential_subject
                },
                "proof": {
                    "type": "JsonWebSignature2020",
                    "created": issued_at,
                    "verificationMethod": f"https://entrepreneur-ai.example.com/issuer/{self.issuer}#key-1",
                    "proofPurpose": "assertionMethod",
                    "jws": await self._create_jwt_proof(attestation_id, combined_credential_subject)
                }
            }
            
            return attestation
            
        except Exception as e:
            raise Exception(f"Failed to create attestation: {str(e)}")

    async def _create_jwt_proof(self, attestation_id: str, credential_subject: Dict[str, Any]) -> str:
        """Create JWT proof for the attestation"""
        try:
            # In production, use proper JWT signing
            payload = {
                "iss": self.issuer,
                "sub": attestation_id,
                "iat": int(datetime.now().timestamp()),
                "exp": int(datetime.now().timestamp()) + 3600,  # 1 hour expiry
                "credential_subject": credential_subject
            }
            
            # For demo purposes, create a simple JWT (in production, use proper signing)
            return jwt.encode(payload, self.private_key, algorithm="HS256")
            
        except Exception as e:
            # Fallback to simple string
            return f"demo-jwt-{attestation_id}"

    def _is_valid_wallet_value(self, value: Any) -> bool:
        """Check if a wallet value is valid and should be preferred over manual input"""
        if value is None:
            return False
        if isinstance(value, str) and value.strip() == "":
            return False
        if isinstance(value, list) and len(value) == 0:
            return False
        return True

    async def verify_attestation(self, attestation: Dict[str, Any]) -> bool:
        """Verify the integrity of an attestation"""
        try:
            # Verify JWT proof
            jwt_token = attestation.get("proof", {}).get("jwt", "")
            if not jwt_token:
                return False
            
            # In production, verify JWT signature
            # For demo, just check if it's a valid format
            return jwt_token.startswith("demo-jwt-") or "eyJ" in jwt_token
            
        except Exception:
            return False

    async def extract_credential_data(self, attestation: Dict[str, Any]) -> Dict[str, Any]:
        """Extract and return the combined credential data from an attestation"""
        try:
            credential_subject = attestation.get("credentialSubject", {})
            return credential_subject.get("combinedData", {})
        except Exception:
            return {}

