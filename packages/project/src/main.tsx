import { StrictMode } from 'react'
import { BrowserRouter } from "react-router"
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'

const queryClient = new QueryClient();
let root = document.getElementById('root');

if (root != null) {
    createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>,
  )
}

