import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link } from 'react-router-dom'

export default function ForgotPassword(){
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState()

async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Success! Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password") // if we do not have record of the email, send this message.
        }

        setLoading(false)
    }

    return (
        <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-3">Password Reset</h2>
            {/* If there is an error with handleSubmit show it as a red alert */}
            {error && <Alert variant="danger">{error}</Alert>}
            {/* If there is an account associated with the email show a successful message*/}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="you@email.com" required />
                </Form.Group>

                <Button disabled={loading} className="w-100" type="submit" variant="success">Reset Password</Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to="/login">Or, Login instead</Link>
            </div>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Don't have an account? What are you waiting for? <Link to="/signup" >Sign up!</Link>
    </div>
        </>
    )
}