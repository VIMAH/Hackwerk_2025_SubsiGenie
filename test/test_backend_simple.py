#!/usr/bin/env python3
"""
Test the simple backend API
"""

import urllib.request
import urllib.error
import json
import time

def test_backend():
    """Test if backend is running"""
    try:
        with urllib.request.urlopen("http://localhost:8000", timeout=5) as response:
            if response.status == 200:
                data = response.read().decode()
                print("Backend API is running!")
                print(f"Response: {data}")
                return True
            else:
                print(f"Backend returned status {response.status}")
                return False
    except urllib.error.URLError as e:
        print(f"Backend API is not running: {e}")
        return False
    except Exception as e:
        print(f"Error testing backend: {e}")
        return False

def test_swagger():
    """Test if Swagger UI is accessible"""
    try:
        with urllib.request.urlopen("http://localhost:8000/docs", timeout=5) as response:
            if response.status == 200:
                print("Swagger UI is accessible!")
                return True
            else:
                print(f"Swagger UI returned status {response.status}")
                return False
    except urllib.error.URLError as e:
        print(f"Swagger UI is not accessible: {e}")
        return False
    except Exception as e:
        print(f"Error testing Swagger: {e}")
        return False

def test_api_endpoints():
    """Test specific API endpoints"""
    endpoints = [
        ("/", "Root endpoint"),
        ("/api/dashboard", "Dashboard endpoint"),
        ("/openapi.json", "OpenAPI schema")
    ]
    
    for endpoint, description in endpoints:
        try:
            with urllib.request.urlopen(f"http://localhost:8000{endpoint}", timeout=5) as response:
                if response.status == 200:
                    print(f"✓ {description}: OK")
                else:
                    print(f"✗ {description}: Status {response.status}")
        except Exception as e:
            print(f"✗ {description}: Error - {e}")

def main():
    print("Testing Simple Backend API")
    print("=" * 40)
    
    # Wait a moment for backend to start
    print("Waiting 3 seconds for backend to start...")
    time.sleep(3)
    
    # Test backend
    print("\n1. Testing Backend API...")
    backend_running = test_backend()
    
    # Test Swagger
    print("\n2. Testing Swagger UI...")
    swagger_running = test_swagger()
    
    # Test endpoints
    print("\n3. Testing API Endpoints...")
    test_api_endpoints()
    
    # Summary
    print("\n" + "=" * 40)
    print("BACKEND STATUS")
    print("=" * 40)
    print(f"Backend API: {'RUNNING' if backend_running else 'NOT RUNNING'}")
    print(f"Swagger UI: {'ACCESSIBLE' if swagger_running else 'NOT ACCESSIBLE'}")
    
    if backend_running:
        print("\n🎉 Backend is running!")
        print("\n🌐 Access URLs:")
        print("   Backend API: http://localhost:8000")
        print("   Swagger UI: http://localhost:8000/docs")
        print("   ReDoc: http://localhost:8000/redoc")
        print("   OpenAPI Schema: http://localhost:8000/openapi.json")
        
        print("\n📋 Available API Endpoints:")
        print("   GET  /                    - API root")
        print("   GET  /api/dashboard       - Dashboard data")
        print("   POST /api/application/start - Start application")
        print("   POST /api/agent/draft     - Create AI draft")
        print("   POST /api/entrepreneur/complete - Complete application")
        print("   POST /api/attestation/confirm - Confirm attestation")
        print("   POST /api/rvo/submit      - Submit to RVO")
        print("   GET  /api/application/{id} - Get application details")
        print("   GET  /api/applications    - List all applications")
        
        print("\n🔧 Next steps:")
        print("1. Open http://localhost:8000/docs in your browser")
        print("2. Test the API endpoints using the Swagger UI")
        print("3. Try the complete 13-step workflow")
    else:
        print("\n❌ Backend is not running.")
        print("\n🔧 To start the backend:")
        print("   python simple_backend.py")

if __name__ == "__main__":
    main()
