#!/bin/bash

# Entrepreneur AI Agent Development Startup Script
echo "🚀 Starting Entrepreneur AI Agent Development Environment"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file and add your OPENAI_API_KEY"
    echo "   You can get an API key from: https://platform.openai.com/api-keys"
    echo ""
fi

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Starting with Docker Compose..."
    echo "   This will start both backend and frontend services"
    echo ""
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
    echo ""
    echo "   Press Ctrl+C to stop all services"
    echo ""
    
    docker-compose up --build
else
    echo "📦 Docker not available, starting services manually..."
    echo ""
    echo "1. Start Backend (in terminal 1):"
    echo "   cd apps/backend"
    echo "   pip install -r requirements.txt"
    echo "   python -m uvicorn main:app --reload --port 8000"
    echo ""
    echo "2. Start Frontend (in terminal 2):"
    echo "   cd apps/web"
    echo "   npm install"
    echo "   npm run dev"
    echo ""
    echo "3. Test the workflow:"
    echo "   python test_backend.py"
    echo ""
fi


