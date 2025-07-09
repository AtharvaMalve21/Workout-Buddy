import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { WorkoutContextProvider } from "./context/WorkoutContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <WorkoutContextProvider>
        <App />
        <Toaster />
      </WorkoutContextProvider>
    </UserContextProvider>
  </BrowserRouter>
)
