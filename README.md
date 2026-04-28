# CareBridge

CareBridge is a modern, intelligent community task routing and priority prediction platform. It bridges the gap between requesters and volunteers, ensuring that community needs are met efficiently and securely.

## 🚀 Features

- **Intelligent Task Routing**: Connects volunteers with the right tasks based on location and priority.
- **Priority Prediction**: Utilizes an AI-driven engine to assess and prioritize task urgency.
- **Role-based Dashboards**: Tailored and dynamic interfaces for both Requesters and Volunteers.
- **Interactive Maps**: Real-time geolocation visualization using Leaflet.
- **Secure Authentication**: Integrated Google OAuth and robust session management.
- **Modern Aesthetics**: A premium, visually stunning UI featuring dynamic themes and cinematic interactions.

## 💻 Tech Stack

### Frontend
- **Core**: React 19 powered by Vite
- **Routing**: React Router DOM
- **Maps**: Leaflet & React-Leaflet
- **Authentication**: `@react-oauth/google` & JWT Decode
- **API Client**: Axios

## 🛠️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (Node Package Manager)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install standard dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will typically be available at `http://localhost:5173` (check your console output for the exact local URL).

## 📂 Project Structure

- `/frontend` - Contains the React single-page application.
  - `/src/components` - Reusable UI components.
  - `/src/pages` - Main application views.
  - `/src/hooks` - Custom React hooks.
  - `/src/assets` - Static assets and styles.
  - `/src/data` - Mock data for development and testing.

---

*Built for intelligent community support.*
