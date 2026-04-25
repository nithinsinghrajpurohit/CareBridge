# CareBridge

Full Stack Application leveraging **React (Vite), Django REST Framework, MongoDB (via Djongo), and Scikit-learn** for intelligent community task routing and priority prediction.

## Folder Overview
- `/backend`: Python Django server providing REST endpoints and the ML Urgency Predictor.
- `/frontend`: React application for Requesters and Volunteers.

---

## Backend Setup (Django + MongoDB)

### Prerequisites
- Python 3.10+
- A running instance of MongoDB (Default is `localhost:27017`).

### Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Virtual Environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Setup the database tables via Djongo migrations:
   ```bash
   python manage.py makemigrations api
   python manage.py migrate
   ```
5. Run the Server:
   ```bash
   python manage.py runserver
   ```
The ML logic will automatically initialize and predict priorities when new `Issues` are POSTed to the API.

---

## Frontend Setup (React)

### Prerequisites
- Node.js (v18+)

### Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install standard dependencies:
   ```bash
   npm install
   ```
3. Install new required packages for full-stack integration:
   ```bash
   npm install axios react-router-dom react-leaflet leaflet jwt-decode
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

You can now hit the Django REST API from your React app using `axios` located at `http://localhost:8000/api/`!
