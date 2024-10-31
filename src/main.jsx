import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'
import { WatchlistContextProvider } from './context/WatchlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserAuthContextProvider>
            <WatchlistContextProvider>
                <App />
            </WatchlistContextProvider>
        </UserAuthContextProvider>
    </React.StrictMode>,
)
