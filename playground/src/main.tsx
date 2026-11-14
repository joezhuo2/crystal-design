import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { smoothScroll } from './smoothScroll'
import './app.css'

smoothScroll()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
