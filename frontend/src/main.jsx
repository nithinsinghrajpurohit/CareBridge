import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LocationProvider } from './hooks/useLocationContext'
import { ThemeProvider } from './hooks/useThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="344205393686-s8j7bkm2jcq79ukapsl9hplapuhntfl1.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
