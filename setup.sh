#!/bin/bash
set -e

echo "Setting up AgriLink project..."

# Backend setup
echo "Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Frontend setup
echo "Setting up frontend..."
cd frontend
npm install
cd ..

echo "Setup complete!"
echo ""
echo "To run the backend:"
echo "  cd backend && source venv/bin/activate && python app.py"
echo ""
echo "To run the frontend:"
echo "  cd frontend && npm start"