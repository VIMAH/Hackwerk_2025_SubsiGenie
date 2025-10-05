import json
import os
from typing import Dict, List, Any
from pathlib import Path

class WalletService:
    def __init__(self):
        self.data_dir = Path("data/wallet")
        self.credentials_cache = {}

    async def get_all_credentials(self) -> List[Dict[str, Any]]:
        """Get all available wallet credentials"""
        try:
            if self.credentials_cache:
                return list(self.credentials_cache.values())
            
            credentials = []
            
            # Load from mock data files
            if self.data_dir.exists():
                for file_path in self.data_dir.glob("*.json"):
                    try:
                        with open(file_path, 'r') as f:
                            cred_data = json.load(f)
                            credentials.append(cred_data)
                            self.credentials_cache[cred_data.get("id", file_path.stem)] = cred_data
                    except Exception as e:
                        print(f"Error loading credential {file_path}: {e}")
            
            # If no files exist, create demo credentials
            if not credentials:
                credentials = self._create_demo_credentials()
                for cred in credentials:
                    self.credentials_cache[cred["id"]] = cred
            
            return credentials
            
        except Exception as e:
            # Return demo credentials as fallback
            return self._create_demo_credentials()

    async def get_available_credentials(self, requested_types: List[str]) -> List[Dict[str, Any]]:
        """Get credentials that match the requested types"""
        try:
            all_credentials = await self.get_all_credentials()
            available = []
            
            for cred in all_credentials:
                cred_type = cred.get("type", "")
                if cred_type in requested_types or any(req_type in cred.get("credentialSubject", {}) for req_type in requested_types):
                    available.append(cred)
            
            return available
            
        except Exception as e:
            return []

    async def get_missing_credentials(self) -> List[str]:
        """Get list of missing credential types"""
        try:
            all_credentials = await self.get_all_credentials()
            available_types = set()
            
            for cred in all_credentials:
                available_types.add(cred.get("type", ""))
                # Also check credential subject keys
                subject = cred.get("credentialSubject", {})
                available_types.update(subject.keys())
            
            # Standard credential types that should be available
            required_types = {
                "authentication", "kvkNumber", "statutoryName", "rsin",
                "establishmentNumber", "tradeName", "businessAddress", "email",
                "sbiCode", "legalForm", "employeeCount", "iban", "contactPerson",
                "mkbDeclaration", "previousExporterApplications", "deMinimisRoom"
            }
            
            missing = required_types - available_types
            return list(missing)
            
        except Exception as e:
            return ["authentication", "kvkNumber", "statutoryName"]

    async def get_missing_credentials_for_requirements(self, requested_types: List[str]) -> List[str]:
        """Get missing credentials for specific requirements"""
        try:
            available_credentials = await self.get_available_credentials(requested_types)
            available_types = set()
            
            for cred in available_credentials:
                available_types.add(cred.get("type", ""))
                subject = cred.get("credentialSubject", {})
                available_types.update(subject.keys())
            
            missing = set(requested_types) - available_types
            return list(missing)
            
        except Exception as e:
            return requested_types

    def _create_demo_credentials(self) -> List[Dict[str, Any]]:
        """Create demo credentials for testing"""
        return [
            {
                "id": "auth_001",
                "type": "AuthenticationCredential",
                "issuer": "GovernmentID",
                "issuedAt": "2024-01-01T00:00:00Z",
                "credentialSubject": {
                    "authentication": "verified"
                }
            },
            {
                "id": "business_001", 
                "type": "BusinessCredential",
                "issuer": "KVK",
                "issuedAt": "2024-01-01T00:00:00Z",
                "credentialSubject": {
                    "kvkNumber": "12345678",
                    "statutoryName": "Demo Company BV",
                    "rsin": "123456789",
                    "establishmentNumber": "00001234567890",
                    "tradeName": "Demo Company",
                    "businessAddress": {
                        "street": "Demo Street 123",
                        "city": "Amsterdam",
                        "postalCode": "1000AB",
                        "country": "Netherlands"
                    },
                    "email": "contact@democompany.nl",
                    "sbiCode": "62010",
                    "legalForm": "BV",
                    "employeeCount": 25,
                    "iban": "NL91ABNA0417164300",
                    "contactPerson": {
                        "name": "John Doe",
                        "email": "john@democompany.nl",
                        "phone": "+31612345678"
                    }
                }
            },
            {
                "id": "mkb_001",
                "type": "MkbDeclarationCredential", 
                "issuer": "MKB",
                "issuedAt": "2024-01-01T00:00:00Z",
                "credentialSubject": {
                    "mkbDeclaration": True
                }
            },
            {
                "id": "exporter_001",
                "type": "PreviousExporterCredential",
                "issuer": "RVO",
                "issuedAt": "2024-01-01T00:00:00Z", 
                "credentialSubject": {
                    "previousExporterApplications": ["RVO-2023-001", "RVO-2023-002"]
                }
            },
            {
                "id": "deminimis_001",
                "type": "DeMinimisCredential",
                "issuer": "EU",
                "issuedAt": "2024-01-01T00:00:00Z",
                "credentialSubject": {
                    "deMinimisRoom": 150000
                }
            }
        ]

