// import './App.css'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import { Dashboard } from './pages/dashboard'
// import { Auth } from './pages/auth'
// import { FinancialRecordsProvider } from './contexts/financial-record-context'
// import { SignedIn, UserButton } from "@clerk/clerk-react"
// import { dark } from '@clerk/themes'

// function App() {

//   return (
//     <Router>
//       <div className='app-container'>
//         <div className='navbar'>
//           <Link to="/">Dashboard</Link>
//           <SignedIn>
//               {/* <UserButton /> */}
//               <UserButton showName appearance={{baseTheme: dark}}/>
//               {/* IF u WANT UR NAME TO SHOW, and want to chnage the appearnce for the signin,out dorpdown.. */}
//           </SignedIn>
//         </div>
//         <Routes>
//           <Route path='/' element={<FinancialRecordsProvider>
//               <Dashboard />
//             </FinancialRecordsProvider>} />
//           <Route path='/auth' element={<Auth />} />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App



// import './App.css'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import { Dashboard } from './pages/dashboard'
// import { Auth } from './pages/auth'
// import { FinancialRecordsProvider } from './contexts/financial-record-context'
// import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
// import { dark } from '@clerk/themes'

// function App() {

//   return (
//     <Router>
//       <div className='app-container'>
//         {/* Navbar */}
//         <div className='navbar'>
//           <SignedIn>
//             <UserButton showName appearance={{ baseTheme: dark }} />
//           </SignedIn>
//         </div>

//         {/* Routes */}
//         <Routes>
//           {/* Auth Route - Available only when SignedOut */}
//           <Route
//             path='/auth'
//             element={
//               <SignedOut>
//                 <Auth />
//               </SignedOut>
//             }
//           />

//           {/* Dashboard Route - Available only when SignedIn */}
//           <Route
//             path='/'
//             element={
//               <SignedIn>
//                 <FinancialRecordsProvider>
//                   <Dashboard />
//                 </FinancialRecordsProvider>
//               </SignedIn>
//             }
//           />

//           {/* Redirect to /auth if user is not signed in */}
//           <Route
//             path="*"
//             element={
//               <SignedOut>
//                 <Navigate to="/auth" />
//               </SignedOut>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App



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
                <UserButton showName appearance={{ baseTheme: dark }} />
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

