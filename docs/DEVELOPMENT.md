# Development Guide

## Project Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git
- Docker (optional)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
- **Windows:**
```bash
venv\Scripts\activate
```
- **macOS/Linux:**
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file:
```bash
cp .env.example .env
```

6. Run development server:
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Docker Setup

### Build and Run with Docker Compose

```bash
docker-compose up -d
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- Database: `localhost:5432`

### Build Individual Images

**Backend:**
```bash
docker build -t audit-backend ./backend
docker run -p 5000:5000 audit-backend
```

**Frontend:**
```bash
docker build -t audit-frontend ./frontend
docker run -p 3000:3000 audit-frontend
```

## Project Structure

```
projet1/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── core/               # Core analysis modules
│   │   ├── analyzer.py     # File analysis
│   │   ├── watermark_detector.py
│   │   ├── c2pa_verifier.py
│   │   └── trust_scorer.py
│   ├── tests/              # Unit tests
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/         # CSS modules
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── tsconfig.json
├── docs/                   # Documentation
├── docker-compose.yml
└── .gitignore
```

## Running Tests

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Code Style

### Python (Backend)
- Follow PEP 8
- Use meaningful variable names
- Document functions with docstrings

### TypeScript/React (Frontend)
- Use functional components
- Use TypeScript for type safety
- Follow React best practices

## Environment Variables

### Backend (.env)
```
FLASK_ENV=development
DEBUG=False
UPLOAD_FOLDER=./uploads
MAX_FILE_SIZE=52428800
DATABASE_URL=sqlite:///audit.db
SECRET_KEY=your_secret_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Troubleshooting

### Backend Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill process (get PID from above)
kill -9 <PID>
```

### Frontend Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Python Module Not Found
Ensure virtual environment is activated and dependencies are installed:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### React App Not Compiling
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Push to branch
5. Create pull request

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [C2PA Specification](https://c2pa.org/)
