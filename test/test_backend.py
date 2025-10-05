#!/usr/bin/env python3
"""
Test script for the Entrepreneur AI Agent backend
This script tests the complete 13-step workflow
"""

import requests
import json
import time

# Configuration
BASE_URL = "http://localhost:8000"
ENTREPRENEUR_ID = "demo-entrepreneur-001"

def test_api_endpoint(endpoint, method="GET", data=None):
    """Test an API endpoint and return the response"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        
        print(f"✅ {method} {endpoint} - Status: {response.status_code}")
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Error: {response.text}")
            return None
    except requests.exceptions.ConnectionError:
        print(f"❌ Connection failed: {endpoint}")
        return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_complete_workflow():
    """Test the complete 13-step workflow"""
    print("🚀 Testing Entrepreneur AI Agent Backend")
    print("=" * 50)
    
    # Step 1: Test dashboard
    print("\n1. Testing Dashboard...")
    dashboard = test_api_endpoint("/api/dashboard")
    if not dashboard:
        print("❌ Dashboard test failed")
        return False
    
    print(f"   Available credentials: {len(dashboard.get('availableCredentials', []))}")
    print(f"   Missing credentials: {len(dashboard.get('missingCredentials', []))}")
    print(f"   Can start application: {dashboard.get('canStartApplication', False)}")
    
    # Step 2-3: Start application
    print("\n2-3. Starting Application...")
    start_data = {"entrepreneurId": ENTREPRENEUR_ID}
    start_response = test_api_endpoint("/api/application/start", "POST", start_data)
    if not start_response:
        print("❌ Start application test failed")
        return False
    
    application_id = start_response.get("applicationId")
    print(f"   Application ID: {application_id}")
    print(f"   Available credentials: {start_response.get('availableCredentials', [])}")
    print(f"   Missing credentials: {start_response.get('missingCredentials', [])}")
    
    # Step 4-7: Create draft
    print("\n4-7. Creating Draft...")
    draft_data = {
        "applicationId": application_id,
        "availableCredentials": []
    }
    draft_response = test_api_endpoint("/api/agent/draft", "POST", draft_data)
    if not draft_response:
        print("❌ Draft creation test failed")
        return False
    
    print(f"   Draft ID: {draft_response.get('draft', {}).get('id', 'N/A')}")
    print(f"   Missing fields: {draft_response.get('missingFields', [])}")
    
    # Step 8-10: Complete application
    print("\n8-10. Completing Application...")
    complete_data = {
        "applicationId": application_id,
        "additionalInformation": {
            "projectLocationDHI": "Amsterdam",
            "applicantRole": "primary",
            "applicationTypeOrConsortium": "individual",
            "demonstration": "Innovative AI solution for export optimization",
            "feasibility": "High - proven technology with market demand",
            "investmentPreparation": "Business plan and financial projections completed",
            "projectDetails": "Development of AI-powered export platform",
            "targetSector": "Technology",
            "greeningCheck": True,
            "startDate": "2024-06-01",
            "endDate": "2025-05-31",
            "financialTurnoverMin100kLast3Years": True,
            "exportMultiplierStatement": "Platform will enable 10x export growth",
            "onHostLocation": True,
            "exportedBefore": True,
            "performedQuickScan": True
        }
    }
    complete_response = test_api_endpoint("/api/entrepreneur/complete", "POST", complete_data)
    if not complete_response:
        print("❌ Complete application test failed")
        return False
    
    print(f"   Draft status: {complete_response.get('draft', {}).get('status', 'N/A')}")
    print(f"   Attestation ID: {complete_response.get('attestation', {}).get('id', 'N/A')}")
    
    # Step 11: Confirm attestation
    print("\n11. Confirming Attestation...")
    confirm_data = {
        "applicationId": application_id,
        "pin": "1234"
    }
    confirm_response = test_api_endpoint("/api/attestation/confirm", "POST", confirm_data)
    if not confirm_response:
        print("❌ Confirm attestation test failed")
        return False
    
    print(f"   Confirmation success: {confirm_response.get('success', False)}")
    
    # Step 12-13: Submit to RVO
    print("\n12-13. Submitting to RVO...")
    submit_data = {
        "applicationId": application_id,
        "attestation": complete_response.get('attestation', {})
    }
    submit_response = test_api_endpoint("/api/rvo/submit", "POST", submit_data)
    if not submit_response:
        print("❌ Submit to RVO test failed")
        return False
    
    print(f"   Submission success: {submit_response.get('success', False)}")
    print(f"   RVO Reference: {submit_response.get('submission', {}).get('rvoReference', 'N/A')}")
    
    # Final status check
    print("\nFinal Status Check...")
    status_response = test_api_endpoint(f"/api/application/{application_id}")
    if status_response:
        print(f"   Final status: {status_response.get('status', 'N/A')}")
        print(f"   Submitted at: {status_response.get('submittedAt', 'N/A')}")
    
    print("\n✅ Complete workflow test completed successfully!")
    return True

if __name__ == "__main__":
    print("🧪 Entrepreneur AI Agent Backend Test")
    print("Make sure the backend is running on http://localhost:8000")
    print("You can start it with: cd apps/backend && python -m uvicorn main:app --reload")
    print()
    
    # Wait a moment for user to start the backend
    time.sleep(2)
    
    success = test_complete_workflow()
    
    if success:
        print("\n🎉 All tests passed! The backend is working correctly.")
        print("\nNext steps:")
        print("1. Start the frontend: cd apps/web && npm run dev")
        print("2. Open http://localhost:3000 in your browser")
        print("3. Follow the complete workflow in the UI")
    else:
        print("\n❌ Some tests failed. Please check the backend logs.")


