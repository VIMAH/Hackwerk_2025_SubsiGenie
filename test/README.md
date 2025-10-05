# Test Files Directory

This directory contains all test files for the Entrepreneur AI Agent system.

## Test Files Overview

### **Backend API Tests**
- `test_backend.py` - Basic backend API testing
- `test_backend_simple.py` - Simple backend API testing with detailed output
- `test_services.py` - Service testing with browser opening functionality

### **System Integration Tests**
- `test_complete_system.py` - Complete 13-step workflow testing with OpenAI integration
- `test_simple.py` - Simplified system testing without external dependencies

### **Service Status Tests**
- `check_services.py` - Service status checking with Unicode support
- `simple_check.py` - Simple service status checking without Unicode characters

## How to Run Tests

### **Quick Service Check**
```bash
python test/simple_check.py
```

### **Backend API Test**
```bash
python test/test_backend_simple.py
```

### **Complete System Test (with OpenAI)**
```bash
python test/test_complete_system.py
```

### **Service Status Check**
```bash
python test/check_services.py
```

## Test Requirements

### **Basic Tests**
- No external dependencies required
- Tests basic API functionality
- Works with demo data

### **Complete System Tests**
- Requires OpenAI API key
- Tests full AI integration
- Requires LangChain dependencies

## Test Results

All tests provide:
- ✅ **Service status** (running/not running)
- ✅ **API endpoint testing**
- ✅ **Response validation**
- ✅ **Error reporting**
- ✅ **Browser URL opening** (where applicable)

## Notes

- Tests are designed to work with the backend running on `http://localhost:8000`
- Tests are designed to work with the frontend running on `http://localhost:3000`
- Some tests require specific dependencies to be installed
- All tests include comprehensive error handling and reporting
