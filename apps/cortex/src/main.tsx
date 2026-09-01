import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { IvaProvider } from "@sharpnr/iva";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IvaProvider>
      <App />
    </IvaProvider>
  </StrictMode>,
)
