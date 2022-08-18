import React, { useState } from 'react'
import '../css/Login.css'
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    

    const handleRegister = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            navigate('/')
        })
            .catch(error => console.log(error.message))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(email, password).then(user => {
            navigate('/')
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