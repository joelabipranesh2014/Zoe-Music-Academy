import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Development helper - makes setTestAdmin available in console
if (import.meta.env.DEV) {
  import('./utils/testAdmin').then(({ setTestAdmin, removeTestAdmin }) => {
    (window as any).setTestAdmin = setTestAdmin;
    (window as any).removeTestAdmin = removeTestAdmin;
    console.log('💡 Dev helper: Use setTestAdmin() in console to quickly get admin access');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
