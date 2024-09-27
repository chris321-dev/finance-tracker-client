import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { Auth } from './pages/auth'
import { FinancialRecordsProvider } from './contexts/financial-record-context'
import { SignedIn, UserButton, useAuth } from "@clerk/clerk-react"
import { dark } from '@clerk/themes'
import imageLogo from './assets/chrisDev-logo.png'

function App() {
  const { isLoaded, isSignedIn } = useAuth() // To handle loading and auth state

  if (!isLoaded) {
    return <div>Loading...</div> // Show a loader until Clerk has checked the user's auth state
  }


  return (
    <Router>
      <div className='app-container'>
        {/* Navbar */}
        <div className='navbar'>
          <div className='nav-content'>
            <div className='logoDiv'>
              <a href='https://chris321-dev.github.io/Chris.Dev-Portfolio/' target='_blank' rel='noopener noreferrer'>
                <img src={imageLogo} alt='logo' className='logo1' />
              </a>
            </div>
            <div className='userLogo1'>
              <SignedIn>
                <UserButton appearance={{ baseTheme: dark }} />
              </SignedIn>
            </div>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          {/* Auth Route - Available only when SignedOut */}
          <Route
            path='/auth'
            element={
              isSignedIn ? <Navigate to="/" /> : <Auth />
            }
          />

          {/* Dashboard Route - Available only when SignedIn */}
          <Route
            path='/'
            element={
              isSignedIn ? (
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />

          {/* Redirect all other routes */}
          <Route
            path="*"
            element={<Navigate to={isSignedIn ? "/" : "/auth"} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App

