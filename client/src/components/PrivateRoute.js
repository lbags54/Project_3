import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <div>
            <Route {...rest}
            render={props => {
                // if we have a current user render our props inside of Dashboard.js, else push user to the login page.
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}>

            </Route>
        </div>
    )
}
