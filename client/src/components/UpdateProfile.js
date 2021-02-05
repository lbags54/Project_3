import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

// function for handling the submit form event in our render().
function handleSubmit(e){
        // prevent the form fields from emptying on submit.
        e.preventDefault()

        // determine if the password value matches the password confirm value.
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match!")
        }


        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })

    }

    return (
        <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-3">Update Profile</h2>
            {/* If there is an error with handleSubmit show it as a red alert */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to leave the same password" />
                </Form.Group>

                <Form.Group id="password-confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to leave the same password"  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit" variant="success">Update!</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Cancel</Link>
    </div>
        </>
    )
}