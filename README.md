# Medicine Availability Tracker

A professional MERN stack application for tracking medicine availability across pharmacies.

## Features

### Client Features
- Search medicines by name
- View pharmacies where medicine is available
- See quantity, price, and pharmacy details
- Filter by location and medicine category

### Pharmacy Owner Features
- Create and manage pharmacy profile
- Add new medicines to inventory
- Update medicine quantity and price
- Delete medicines
- View all medicines in pharmacy

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **State Management**: React Context API

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

4. Start server:
```bash
npm run dev
```

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
npm run dev
```

## Project Structure

```
backend/
  ├── models/          # MongoDB models
  ├── routes/          # API routes
  ├── controllers/     # Route controllers
  ├── middleware/      # Auth & validation middleware
  ├── config/          # Database configuration
  └── server.js        # Express server

frontend/
  ├── src/
  │   ├── components/  # Reusable components
  │   ├── pages/       # Page components
  │   ├── context/     # Auth context
  │   ├── services/    # API services
  │   └── layouts/     # Layout components
  └── public/
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/me` - Get current user

### Pharmacy (Owner only)
- POST `/api/pharmacy` - Create pharmacy
- GET `/api/pharmacy/my-pharmacy` - Get owner's pharmacy
- PUT `/api/pharmacy/:id` - Update pharmacy

### Medicine
- GET `/api/medicine/search` - Search medicines (public)
- POST `/api/medicine` - Add medicine (owner only)
- PUT `/api/medicine/:id` - Update medicine (owner only)
- DELETE `/api/medicine/:id` - Delete medicine (owner only)
- GET `/api/medicine/my-medicines` - Get pharmacy medicines (owner only)

## User Roles

- **CLIENT**: Can search and view medicine availability
- **PHARMACY_OWNER**: Can manage pharmacy and medicine inventory

## License

ISC
