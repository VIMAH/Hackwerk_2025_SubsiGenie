# Entrepreneur AI Agent

A complete, production-ready AI-powered system for DHI subsidy applications with OpenID 4 VCI compliant verifiable credentials and LangChain-powered intelligent automation.

**Built for Hackwerk 2025 - AI Agent voor DHI Subsidie aanvraag** 🚀

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Architecture](#️-architecture)
- [13-Step Workflow](#-13-step-workflow)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Security](#-security)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)

---

## 🚀 Features

### Core Capabilities
- **AI-Powered Draft Generation**: LangChain with OpenAI GPT-4 creates intelligent application drafts
- **Smart Missing Field Detection**: AI identifies and guides users through incomplete information
- **OpenID 4 VCI Compliance**: W3C-compliant verifiable credentials for secure data exchange
- **Complete 13-Step Workflow**: End-to-end automation from dashboard to RVO submission
- **PIN/Fingerprint Confirmation**: Secure attestation approval process

### Tech Stack
**Frontend:**
- Next.js 14 with App Router
- TypeScript for type safety
- TailwindCSS for modern UI
- TanStack Query for API state management
- Lucide React for icons

**Backend:**
- Python 3.11 with FastAPI
- LangChain for AI orchestration
- OpenAI GPT-4 integration
- Pydantic for data validation
- JWT for attestation proofs

**Development:**
- Docker Compose for containerized development
- Monorepo structure with shared schemas
- Hot reload for both frontend and backend
- Comprehensive test suite

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose (optional but recommended)
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Hackwerk_2025_SubsiGenie
```

### 2. Configure Environment
```bash
# Copy environment template
cp env.example .env

# Edit .env file and add your OpenAI API key
# OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Start the Application

#### Option A: Docker Compose (Recommended)
```bash
# Start all services
docker-compose up --build

# Access the application:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

#### Option B: Local Development
```bash
# Install and start backend
cd apps/backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000

# In a new terminal, install and start frontend
cd apps/web
npm install
npm run dev
```

#### Option C: Quick Start Scripts
**Windows:**
```bash
start_dev.bat
```

**Linux/Mac:**
```bash
./start_dev.sh
```

### 4. Test the System
```bash
# Simple service check
python test/simple_check.py

# Backend API test
python test/test_backend_simple.py

# Complete workflow test (requires OpenAI API key)
python test/test_complete_system.py
```

---

## 🏗️ Architecture

```
entrepreneur-ai-agent/
├── apps/
│   ├── backend/              # Python FastAPI + LangChain
│   │   ├── main.py          # FastAPI application
│   │   ├── models.py        # Pydantic schemas
│   │   └── services/        # Business logic
│   │       ├── agent_service.py      # LangChain AI agent
│   │       ├── attestation_service.py # OpenID 4 VCI compliant
│   │       ├── rvo_service.py        # RVO integration
│   │       └── wallet_service.py     # Wallet credentials
│   └── web/                 # Next.js + TypeScript + TailwindCSS
│       ├── app/             # Next.js app directory
│       ├── components/      # React components
│       ├── lib/             # API client
│       └── types/           # TypeScript types
├── packages/
│   └── schemas/             # Shared TypeScript schemas
├── data/
│   ├── wallet/              # Mock wallet credentials (OpenID 4 VCI)
│   ├── rvo/                 # RVO requirement examples
│   └── attestations/        # Example attestations
├── test/                    # Comprehensive test suite
├── docker-compose.yml       # Development environment
└── env.example             # Environment variables template
```

---

## 📋 13-Step Workflow

The system implements a complete end-to-end workflow for DHI subsidy applications:

1. ✅ **Entrepreneur** clicks "Apply for DHI Subsidy scheme" on dashboard
2. ✅ **Entrepreneur AI Agent** sends subsidy application request to RVO AI Agent
3. ✅ **RVO AI Agent** responds with list of requested credentials
4. ✅ **Entrepreneur AI Agent** checks wallet for available credentials
5. ✅ **Entrepreneur AI Agent** informs RVO AI Agent about available credentials
6. ✅ **RVO AI Agent** responds with additional required information/documents
7. ✅ **Entrepreneur AI Agent** inspects requirements, collects data, drafts preliminary document
8. ✅ **Entrepreneur AI Agent** shows draft to entrepreneur with missing fields highlighted
9. ✅ **Entrepreneur** completes missing fields via intuitive form interface
10. ✅ **Entrepreneur AI Agent** creates new attestation combining wallet data and manual inputs
11. ✅ **Entrepreneur** reviews complete attestation and confirms with PIN/fingerprint (demo: 1234)
12. ✅ **Entrepreneur AI Agent** sends attestation + documents to RVO AI Agent
13. ✅ **Entrepreneur** receives confirmation of successful submission

### Demo Flow
1. **Dashboard**: View available credentials and start application
2. **Draft Creation**: AI generates draft with available data, identifies missing fields
3. **Form Completion**: Entrepreneur fills in missing information
4. **Review & Confirm**: Review complete attestation and confirm with PIN
5. **RVO Submission**: Final submission to RVO with confirmation

---

## 📚 API Documentation

### Swagger UI (Interactive Testing)
**http://localhost:8000/docs**
- View all API endpoints
- Test each endpoint interactively
- See request/response examples
- Execute the complete workflow

### ReDoc (Alternative Documentation)
**http://localhost:8000/redoc**

### Core Endpoints

#### Dashboard & Status
- `GET /` - API root and status
- `GET /api/dashboard` - Dashboard data with available credentials

#### 13-Step Workflow Endpoints
- `POST /api/application/start` - **Steps 1-3**: Start application, get RVO requirements
- `POST /api/agent/draft` - **Steps 4-7**: Create AI-generated draft
- `POST /api/entrepreneur/complete` - **Steps 8-10**: Complete application with user input
- `POST /api/attestation/confirm` - **Step 11**: Confirm attestation with PIN
- `POST /api/rvo/submit` - **Steps 12-13**: Submit to RVO and get confirmation

#### Application Management
- `GET /api/application/{id}` - Get application details and status

### Testing the Workflow in Swagger

1. Open http://localhost:8000/docs
2. **Start Application**: Use `POST /api/application/start` with `{"entrepreneurId": "demo-001"}`
3. **Create Draft**: Use the returned `applicationId` in `POST /api/agent/draft`
4. **Complete Application**: Fill additional information in `POST /api/entrepreneur/complete`
5. **Confirm**: Use PIN "1234" in `POST /api/attestation/confirm`
6. **Submit**: Use `POST /api/rvo/submit` to complete submission

---

## 🧪 Testing

### Test Suite Organization

All tests are in the `test/` directory:

**Backend API Tests:**
- `test_backend.py` - Basic backend API testing
- `test_backend_simple.py` - Simple backend testing with detailed output

**System Integration Tests:**
- `test_complete_system.py` - Complete 13-step workflow with OpenAI integration
- `test_simple.py` - Simplified testing without external dependencies

**Service Status Tests:**
- `check_services.py` - Service status with Unicode support
- `simple_check.py` - Simple service status checking
- `test_services.py` - Service testing with browser functionality

### Running Tests

```bash
# Quick service check
python test/simple_check.py

# Test backend API
python test/test_backend_simple.py

# Test complete system (requires OpenAI API key)
python test/test_complete_system.py
```

---

## 🔒 Security

### OpenID 4 VCI Compliance

The system is fully compliant with the [OpenID 4 VCI specification](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html):

- ✅ **@context** includes W3C Verifiable Credentials
- ✅ **VerifiableCredential** type in all credentials
- ✅ **Issuer** with proper ID and name
- ✅ **JsonWebSignature2020** proof type
- ✅ **Credential subject** with proper ID
- ✅ **JWT-based proofs** for cryptographic verification

### Security Features

- **PIN/Fingerprint Simulation**: Secure confirmation process for attestations
- **JWT Attestation Proofs**: Cryptographic verification of all credentials
- **Input Validation**: Pydantic schemas validate all API inputs
- **CORS Protection**: Configured for secure production deployment
- **Environment Variables**: No hardcoded secrets (all in `.env` file)
- **API Key Protection**: OpenAI keys loaded from environment only

---

## 📁 Project Structure

### Data Scope

**Wallet Credentials (OpenID 4 VCI Compliant JSONs):**
- Authentication, KVK number, statutory name, RSIN
- Business address, email, SBI code, legal form
- Employee count, IBAN, contact person
- MKB declaration, previous exporter applications, de minimis room

**Additional Information (Manual User Inputs):**
- Project location, applicant role, application type
- Demonstration, feasibility, investment preparation
- Project details, target sector, greening check
- Start/end dates, financial turnover requirements
- Export multiplier statement, location requirements

### Key Files

- `apps/backend/main.py` - FastAPI application with all endpoints
- `apps/backend/services/agent_service.py` - LangChain AI agent
- `apps/backend/services/attestation_service.py` - OpenID 4 VCI attestation creation
- `apps/web/app/page.tsx` - Dashboard UI
- `data/wallet/*.json` - Mock wallet credentials
- `docker-compose.yml` - Development environment configuration
- `env.example` - Environment variables template

---

## 🚀 Deployment

### Environment Variables

Required:
```bash
OPENAI_API_KEY=your_openai_api_key
```

Optional:
```bash
RVO_API_URL=https://api.rvo.nl
RVO_API_KEY=your_rvo_api_key
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Docker Production

```bash
# Build and run production images
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Production Setup

**Backend:**
```bash
cd apps/backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd apps/web
npm install
npm run build
npm start
```

---

## 🎯 Success Criteria

- ✅ **Complete monorepo** with backend and frontend
- ✅ **Typed schemas** (Pydantic + TypeScript)
- ✅ **Mock JSON data** for wallet credentials and attestations
- ✅ **Comprehensive README** with setup and usage instructions
- ✅ **Docker Compose** for easy development
- ✅ **OpenID 4 VCI compliance** for verifiable credentials
- ✅ **LangChain integration** with OpenAI GPT-4
- ✅ **Complete 13-step workflow** implementation
- ✅ **Interactive Swagger documentation**
- ✅ **Comprehensive test suite**

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 🆘 Support

For questions or issues:
1. Check the API documentation at http://localhost:8000/docs
2. Review the demo flow in the frontend
3. Check the logs in Docker Compose (`docker-compose logs -f`)
4. Run the test suite to verify functionality
5. Open an issue in the repository

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for Hackwerk 2025**

🚀 **The Entrepreneur AI Agent system is ready for production!**
