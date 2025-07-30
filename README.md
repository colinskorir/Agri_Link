# Digi-shamba

Digi-shamba is a digital platform for agricultural produce management, connecting farmers and buyers. It allows farmers to list their produce, buyers to search and purchase, and integrates with Safaricom's Daraja (M-Pesa) API for seamless mobile payments.

## Features
- User authentication (farmer and buyer roles)
- Farmers can add, update, and manage produce listings
- Buyers can search, view, and purchase produce
- M-Pesa (Daraja) payment integration for secure transactions
- Order management for both farmers and buyers

## Project Structure
```
Digi-shamba/
  backend/      # Node.js/Express backend API
  frontend/     # React frontend
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm
- [ngrok](https://ngrok.com/) (for local Daraja callback testing)

### Backend Setup
1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```
2. **Set up ngrok for callback URL:**
   - In a new terminal, run:
     ```bash
     ngrok http 5000
     ```
   - Copy the HTTPS URL (e.g., `https://abc12345.ngrok.io`).
   - Update the `callbackURL` in `server.js` to:
     ```js
     const callbackURL = 'https://abc12345.ngrok.io/api/daraja-callback';
     ```
3. **Start the backend server:**
   ```bash
   npm start
   ```

### Frontend Setup
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the frontend:**
   ```bash
   npm start
   ```
   The app will run on [http://localhost:3000](http://localhost:3000).

## Daraja (M-Pesa) Payment Integration
- When a buyer initiates a purchase, the backend sends an STK Push to the provided phone number using the Daraja API.
- The phone number must be in the format `2547XXXXXXXX`.
- The backend listens for payment results on `/api/daraja-callback`.


## License
This project is for educational purposes. Adapt and use as needed.
