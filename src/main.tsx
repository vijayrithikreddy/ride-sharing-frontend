import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RideContextProvider from './context/RideContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <RideContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </RideContextProvider>
);
