import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RideContextProvider from './context/RideContextProvider.tsx'
import AuthContextProvider from './context/AuthContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
  <RideContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </RideContextProvider>
  </AuthContextProvider>
);
