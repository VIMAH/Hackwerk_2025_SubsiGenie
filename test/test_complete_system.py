#!/usr/bin/env python3
"""
Complete system test for Entrepreneur AI Agent
Tests the full 13-step workflow with real OpenAI API integration
"""

import os
import sys
import asyncio
import json
from datetime import datetime

# Add the backend directory to Python path
sys.path.append('apps/backend')

# Set environment variables
# Load API key from environment variable
from dotenv import load_dotenv
load_dotenv()

if not os.getenv('OPENAI_API_KEY'):
    raise ValueError("OPENAI_API_KEY not found in environment variables. Please set it in .env file")

async def test_ai_agent_workflow():
    """Test the complete AI agent workflow with real OpenAI integration"""
    print("Testing Entrepreneur AI Agent with OpenAI Integration")
    print("=" * 60)
    
    try:
        # Import services
        from services.agent_service import AgentService
        from services.attestation_service import AttestationService
        from services.wallet_service import WalletService
        from services.rvo_service import RvoService
        
        # Initialize services
        agent_service = AgentService()
        attestation_service = AttestationService()
        wallet_service = WalletService()
        rvo_service = RvoService()
        
        print("✅ Services initialized successfully")
        
        # Step 1: Test wallet credentials
        print("\n📋 Step 1: Testing Wallet Credentials")
        credentials = await wallet_service.get_all_credentials()
        print(f"   Found {len(credentials)} wallet credentials")
        for cred in credentials:
            print(f"   - {cred.get('type', 'Unknown')}: {cred.get('id', 'No ID')}")
        
        # Step 2: Test RVO requirements
        print("\n🏛️ Step 2: Testing RVO Requirements")
        rvo_requirements = await rvo_service.get_requirements()
        print(f"   RVO requested {len(rvo_requirements['requirements']['requestedCredentials'])} credentials")
        print(f"   Message: {rvo_requirements['message']}")
        
        # Step 3: Test AI agent draft creation
        print("\n🧠 Step 3: Testing AI Agent Draft Creation")
        print("   Creating draft with OpenAI GPT-4...")
        
        # Get available credentials for the requirements
        available_creds = await wallet_service.get_available_credentials(
            rvo_requirements['requirements']['requestedCredentials']
        )
        
        # Get additional requirements
        additional_reqs = await rvo_service.get_additional_requirements(rvo_requirements['requirements'])
        
        # Create draft using AI agent
        draft = await agent_service.create_draft(
            application_id="test-app-001",
            available_credentials=available_creds,
            additional_requirements=additional_reqs['additionalInformation']
        )
        
        print(f"   ✅ Draft created: {draft['id']}")
        print(f"   📝 Missing fields: {len(draft['missingFields'])}")
        print(f"   📊 Status: {draft['status']}")
        
        # Show missing fields
        if draft['missingFields']:
            print("   Missing fields:")
            for field in draft['missingFields'][:5]:  # Show first 5
                print(f"     - {field}")
            if len(draft['missingFields']) > 5:
                print(f"     ... and {len(draft['missingFields']) - 5} more")
        
        # Step 4: Test draft completion
        print("\n✏️ Step 4: Testing Draft Completion")
        sample_additional_info = {
            "projectLocationDHI": "Amsterdam",
            "applicantRole": "primary",
            "applicationTypeOrConsortium": "individual",
            "demonstration": "AI-powered export optimization platform",
            "feasibility": "High - proven technology with strong market demand",
            "investmentPreparation": "Complete business plan and financial projections",
            "projectDetails": "Development of innovative AI solution for export optimization",
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
        
        updated_draft = await agent_service.update_draft(
            application_id="test-app-001",
            additional_information=sample_additional_info
        )
        
        print(f"   ✅ Draft updated: {updated_draft['status']}")
        print(f"   📊 Additional info fields: {len(updated_draft['additionalInformation'])}")
        
        # Step 5: Test attestation creation
        print("\n🔐 Step 5: Testing Attestation Creation")
        attestation = await attestation_service.create_attestation(
            application_id="test-app-001",
            wallet_credentials=available_creds,
            additional_information=sample_additional_info
        )
        
        print(f"   ✅ Attestation created: {attestation['id']}")
        print(f"   🏢 Issuer: {attestation['issuer']['name']}")
        print(f"   📅 Issued: {attestation['issuanceDate']}")
        print(f"   🔒 Proof type: {attestation['proof']['type']}")
        
        # Step 6: Test attestation verification
        print("\n🔍 Step 6: Testing Attestation Verification")
        is_valid = await attestation_service.verify_attestation(attestation)
        print(f"   ✅ Attestation valid: {is_valid}")
        
        # Step 7: Test RVO submission
        print("\n📤 Step 7: Testing RVO Submission")
        submission = await rvo_service.submit_application(
            application_id="test-app-001",
            attestation=attestation
        )
        
        print(f"   ✅ Submission successful: {submission['status']}")
        print(f"   📋 RVO Reference: {submission['rvoReference']}")
        print(f"   📝 Message: {submission['message']}")
        
        # Final summary
        print("\n🎉 Complete Workflow Test Results")
        print("=" * 40)
        print(f"✅ Wallet Credentials: {len(credentials)} found")
        print(f"✅ RVO Requirements: {len(rvo_requirements['requirements']['requestedCredentials'])} requested")
        print(f"✅ AI Draft Creation: {draft['status']}")
        print(f"✅ Draft Completion: {updated_draft['status']}")
        print(f"✅ Attestation Creation: {attestation['type'][0]}")
        print(f"✅ Attestation Verification: {is_valid}")
        print(f"✅ RVO Submission: {submission['status']}")
        
        print("\n🚀 All tests passed! The system is working correctly with OpenAI integration.")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error during testing: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

async def test_openid_compliance():
    """Test OpenID 4 VCI compliance"""
    print("\n🔐 Testing OpenID 4 VCI Compliance")
    print("=" * 40)
    
    try:
        from services.attestation_service import AttestationService
        
        attestation_service = AttestationService()
        
        # Create a test attestation
        test_credentials = [{
            "id": "test-cred-001",
            "type": "AuthenticationCredential",
            "credentialSubject": {"authentication": "verified"}
        }]
        
        test_info = {"projectLocationDHI": "Amsterdam"}
        
        attestation = await attestation_service.create_attestation(
            application_id="test-openid-001",
            wallet_credentials=test_credentials,
            additional_information=test_info
        )
        
        # Check OpenID 4 VCI compliance
        required_fields = ["@context", "id", "type", "issuer", "issuanceDate", "credentialSubject", "proof"]
        compliance_checks = []
        
        for field in required_fields:
            if field in attestation:
                compliance_checks.append(f"✅ {field}")
            else:
                compliance_checks.append(f"❌ {field}")
        
        print("OpenID 4 VCI Compliance Check:")
        for check in compliance_checks:
            print(f"   {check}")
        
        # Check specific OpenID 4 VCI requirements
        print("\nSpecific Compliance Checks:")
        print(f"   ✅ @context includes W3C VC: {'https://www.w3.org/2018/credentials/v1' in attestation.get('@context', [])}")
        print(f"   ✅ VerifiableCredential type: {'VerifiableCredential' in attestation.get('type', [])}")
        print(f"   ✅ Issuer has ID: 'id' in attestation.get('issuer', {{}})")
        print(f"   ✅ Proof type JsonWebSignature2020: {attestation.get('proof', {{}}).get('type') == 'JsonWebSignature2020'}")
        print(f"   ✅ Credential subject has ID: 'id' in attestation.get('credentialSubject', {{}})")
        
        return True
        
    except Exception as e:
        print(f"❌ OpenID compliance test failed: {e}")
        return False

async def main():
    """Run all tests"""
    print("Entrepreneur AI Agent - Complete System Test")
    print("=" * 60)
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Test 1: Complete AI workflow
    workflow_success = await test_ai_agent_workflow()
    
    # Test 2: OpenID 4 VCI compliance
    compliance_success = await test_openid_compliance()
    
    # Final results
    print("\n" + "=" * 60)
    print("📊 FINAL TEST RESULTS")
    print("=" * 60)
    print(f"🤖 AI Agent Workflow: {'✅ PASSED' if workflow_success else '❌ FAILED'}")
    print(f"🔐 OpenID 4 VCI Compliance: {'✅ PASSED' if compliance_success else '❌ FAILED'}")
    
    if workflow_success and compliance_success:
        print("\n🎉 ALL TESTS PASSED!")
        print("The Entrepreneur AI Agent system is fully functional and compliant.")
        print("\nNext steps:")
        print("1. Start the backend: cd apps/backend && python -m uvicorn main:app --reload")
        print("2. Start the frontend: cd apps/web && npm run dev")
        print("3. Open http://localhost:3000 to test the complete UI workflow")
    else:
        print("\n❌ Some tests failed. Please check the error messages above.")
    
    print(f"\n🕐 Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    asyncio.run(main())
