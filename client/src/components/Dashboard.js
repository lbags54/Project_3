import React, { useState } from "react"
import { Card, Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory  } from "react-router-dom"

export default function Dashboard(){
const [error, setError] = useState("")
const { currentUser, logout } = useAuth();
const history = useHistory()

async function handleLogout(){

    // Set our error to an empty string on load.
    setError("")

    try{
        await logout()
        history.push("/login") // "push" the user to the login screen if requested.
    } catch {
        setError("Unable to logout, please refresh and try again.")
    }

}

    return(
        <>
        <Container>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">User Dashboard</h2>
                    {/* If there is an error with handleLogout, show it as a red alert */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Logged in: </strong>{currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                </Card.Body>

                <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>

            </Card>
        </Container>
        </>
    )
}