import { StrictMode } from 'react'
import { BrowserRouter } from "react-router"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let root = document.getElementById('root');

if (root != null) {
    createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

