#!/usr/bin/env python3
"""
Test script to verify services are running
"""

import requests
import time
import webbrowser

def test_backend():
    """Test if backend is running"""
    try:
        response = requests.get("http://localhost:8000", timeout=5)
        if response.status_code == 200:
            print("✅ Backend API is running!")
            print(f"   Response: {response.json()}")
            return True
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Backend API is not running on port 8000")
        return False
    except Exception as e:
        print(f"❌ Error testing backend: {e}")
        return False

def test_frontend():
    """Test if frontend is running"""
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running!")
            return True
        else:
            print(f"❌ Frontend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Frontend is not running on port 3000")
        return False
    except Exception as e:
        print(f"❌ Error testing frontend: {e}")
        return False

def main():
    print("🚀 Testing Entrepreneur AI Agent Services")
    print("=" * 50)
    
    # Test backend
    print("\n1. Testing Backend API...")
    backend_running = test_backend()
    
    # Test frontend
    print("\n2. Testing Frontend...")
    frontend_running = test_frontend()
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 SERVICE STATUS")
    print("=" * 50)
    print(f"Backend API: {'✅ RUNNING' if backend_running else '❌ NOT RUNNING'}")
    print(f"Frontend: {'✅ RUNNING' if frontend_running else '❌ NOT RUNNING'}")
    
    if backend_running and frontend_running:
        print("\n🎉 All services are running!")
        print("\n🌐 Access URLs:")
        print("   Frontend: http://localhost:3000")
        print("   Backend API: http://localhost:8000")
        print("   Swagger UI: http://localhost:8000/docs")
        print("   ReDoc: http://localhost:8000/redoc")
        
        print("\n📋 Next steps:")
        print("1. Open http://localhost:3000 in your browser")
        print("2. Click 'Start Application' to begin the workflow")
        print("3. Check http://localhost:8000/docs for API documentation")
        
        # Try to open the URLs
        try:
            print("\n🔗 Opening URLs in browser...")
            webbrowser.open("http://localhost:3000")
            webbrowser.open("http://localhost:8000/docs")
        except:
            print("   (Could not auto-open browser - please open manually)")
            
    else:
        print("\n❌ Some services are not running.")
        print("\n🔧 To start services manually:")
        print("1. Backend: cd apps/backend && python -m uvicorn main:app --reload --port 8000")
        print("2. Frontend: cd apps/web && npm run dev")

if __name__ == "__main__":
    main()
