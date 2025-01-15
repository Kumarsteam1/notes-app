import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import NotesAppContext from './ContextApi/NotesAppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesAppContext>
    <App />
    </NotesAppContext>
  </StrictMode>,
)
