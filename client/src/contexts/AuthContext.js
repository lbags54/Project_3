import React, { useContext, useState, useEffect } from 'react'
import {auth} from "../firebase"


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

// Setup our Authentication Provider methods with firebase.
export function AuthProvider( {children} ){
    // current user states and loading states
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // Use firebase functionality to allow users to sign up for accounts.
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    // Use firebase functionality to allow users to log in to their accounts.
    function login(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    // Use firebase functionality to allow users to log out of their accounts.
    function logout(){
        return auth.signOut()
    }

    // Use firebase functionality to allow users to reset their passwords.
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    // Use firebase functionality to allow users to update their emails.
    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    // Use firebase functionality to allow users to update their passwords.
    function updatePassword(password){
        return currentUser.updatePassword(password);
    }

    // Set our loading state and currentUser states using firebase auth state functionality.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            
        })
        return unsubscribe
    }, [])

    // values to export
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}