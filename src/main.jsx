import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bootstrap 5: CSS global y JS para componentes interactivos (dropdown, modal, tooltip, etc.)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
