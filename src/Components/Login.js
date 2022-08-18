import React, { useState } from 'react'
import '../css/Login.css'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    //Create a new user using the given information on Firebase then redirect to the home page
    const handleRegister = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            navigate('/')
        })
            .catch(error => console.log(error.message))
    }

    //Login the user using the given information, if they are an admin, send them to the admin dashboard, otherwise the home page
    const handleLogin = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email, password).then(user => {
            if (email == 'admin@admin.com') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        })
            .catch(error => console.log(error.message))
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <form action="">
                <h5>Email</h5>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className='login_button' type='submit' onClick={handleLogin}>Login</button>
                <button className='register_button' type='submit' onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default Login