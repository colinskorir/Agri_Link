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
2. **Configure Daraja Credentials:**
   - Open `backend/server.js`.
   - Replace the placeholder values for `consumerKey` and `consumerSecret` with your own from the [Safaricom Developer Portal](https://developer.safaricom.co.ke/).
   - Ensure `businessShortCode` and `passkey` are set to the sandbox values for testing.
3. **Set up ngrok for callback URL:**
   - In a new terminal, run:
     ```bash
     ngrok http 5000
     ```
   - Copy the HTTPS URL (e.g., `https://abc12345.ngrok.io`).
   - Update the `callbackURL` in `server.js` to:
     ```js
     const callbackURL = 'https://abc12345.ngrok.io/api/daraja-callback';
     ```
4. **Start the backend server:**
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
- The backend listens for payment results on `/api/daraja-callback` (ensure this is accessible via ngrok for testing).

## Troubleshooting
- **Port 5000 already in use:**
  - Run `lsof -i :5000` and `kill -9 <PID>` to free the port.
- **Daraja error: Wrong credentials:**
  - Double-check your `consumerKey` and `consumerSecret` in `server.js`.
- **No M-Pesa prompt received:**
  - Ensure the phone number is correct and in the right format.
  - Make sure your callback URL is a public ngrok URL and your backend is running.
- **Frontend/backend connection issues:**
  - Ensure the proxy in `frontend/package.json` matches your backend port.

## License
This project is for educational purposes. Adapt and use as needed.
