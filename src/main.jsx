import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ChatProvider } from './context/ChatContext.jsx'
export const server = 'https://chatbotserver-91ed.onrender.com/api/v1'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </UserProvider>
  </StrictMode>,
)
