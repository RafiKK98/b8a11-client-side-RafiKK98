import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import AuthProvider from './Providers/AuthProvider'
import { AnimatePresence } from 'framer-motion'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
          <AnimatePresence>
            <RouterProvider router={router}>
            
            </RouterProvider>
          </AnimatePresence>
        </AuthProvider>
    </React.StrictMode>,
)
