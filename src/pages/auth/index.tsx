import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export const Auth = () => {
    return  (
        <div className="sign-in-container">
            <div className="auth-content">
            <p>Track your finances with ease.</p>
            <h2>Welcome to the Personal Expense Tracker</h2>
            
            </div>
            <SignedOut>
                <SignUpButton mode="modal" />
                <SignInButton mode="modal" />
            </SignedOut> 
            <SignedIn>
                <Navigate to="/" />
            </SignedIn>           
        </div>
    )
}