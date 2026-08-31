# CataractAI - AI-Powered Cataract Detection

A web-based deep learning framework for automated cataract detection and severity grading using digital eye images. Built with ResNet50 transfer learning for accurate classification into Normal, Immature Cataract, and Mature Cataract grades.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (state management)
- React Router v6
- Axios
- Recharts (data visualization)
- Lucide React (icons)

### Backend
- FastAPI (Python)
- MongoDB (with Motor async driver)
- JWT authentication
- TensorFlow/Keras (mocked inference)

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB (or use Docker)

### Frontend Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run the server
uvicorn app.main:app --reload --port 8000
```

The API will be available at http://localhost:8000
API Documentation: http://localhost:8000/docs

### Docker Setup (Full Stack)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Features

### Public Pages
- **Landing Page**: Hero section, features, how-it-works, statistics
- **Login/Register**: Authentication with JWT, password strength meter

### User Pages (Protected)
- **Upload Page**: Drag-and-drop image upload, patient details form, preprocessing visualization
- **Results Page**: Prediction display with animated probability bars, clinical recommendations
- **History Page**: Paginated prediction history with filters and search
- **Profile Page**: User settings, password change

### Admin Pages (Admin Role Required)
- **User Management**: View, edit, activate/deactivate users
- **Model Performance**: ROC curve, accuracy metrics, model versions
- **Analytics**: Usage statistics, demographics, activity logs

## Demo Credentials

- **Admin**: admin@cataractai.com / Admin1234!
- Or register a new account

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/change-password` - Change password

### Images
- `POST /api/v1/images/upload` - Upload eye image

### Predictions
- `POST /api/v1/predict` - Run cataract detection
- `GET /api/v1/predictions/history` - Get prediction history
- `GET /api/v1/predictions/{id}` - Get specific prediction
- `DELETE /api/v1/predictions/{id}` - Delete prediction

### Users
- `GET /api/v1/users/me` - Get profile
- `PATCH /api/v1/users/me` - Update profile
- `GET /api/v1/users/me/stats` - Get user stats

### Admin
- `GET /api/v1/admin/users` - List all users
- `PATCH /api/v1/admin/users/{id}` - Update user

## Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #185FA5 | Brand, buttons, links |
| Success | #0F6E56 | Normal grade, success states |
| Warning | #BA7517 | Immature Cataract grade |
| Danger | #A32D2D | Mature Cataract grade |

## Model Information

- **Architecture**: ResNet50 (Transfer Learning)
- **Input Size**: 224 x 224 pixels
- **Classes**: Normal, Immature Cataract, Mature Cataract
- **Preprocessing**: CLAHE contrast enhancement, normalization
- **Current Version Accuracy**: 91.2%

## Project Structure

```
/
├── src/
│   ├── api/              # API client and mock service
│   ├── components/       # React components
│   │   ├── layout/       # Navbar, Sidebar
│   │   └── shared/        # Badge, Modal, etc.
│   ├── pages/
│   │   ├── auth/         # Login, Register
│   │   ├── user/          # Upload, Results, Profile
│   │   └── admin/        # UserManagement, Analytics
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── backend/
│   └── app/
│       ├── routers/      # API endpoints
│       ├── models/       # Pydantic models
│       ├── services/     # Business logic
│       └── main.py       # FastAPI app
└── docker-compose.yml
```

## Disclaimer

This application is for educational and research purposes only. It is not intended for clinical use. The AI predictions are simulated and should not be considered medical advice. Always consult qualified ophthalmologists for proper diagnosis.

## Research Project

**CataractAI** - Final Year Research Project
Sabaragamuwa University of Sri Lanka
