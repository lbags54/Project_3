import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'

export default function Signup(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

// aysnchronous function for handling the submit form event in our render().
async function handleSubmit(e){
        // prevent the form fields from emptying on submit.
        e.preventDefault()

        // determine if the password value matches the password confirm value.
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match!")
        }

        // try to signup and catch the error.
        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value) //pass email and password to our signup function
            history.push("/") // "push" our user to the root page if signup is successful.
        } catch {
            setError("Failed to create an account, check password length & complexity.")
        }

        setLoading(false)
    }

    return (
        <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-3">Sign Up</h2>
            {/* If there is an error with handleSubmit show it as a red alert */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} placeholder="you@email.com" required />
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="********" required />
                </Form.Group>

                <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} placeholder="********" required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit" variant="success">Sign Up!</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
    </div>
        </>
    )
}