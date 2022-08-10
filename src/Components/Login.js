import React from 'react'
import '../css/Login.css'

const Login = () => {
    return (
        <div className='login'>
            <h1>Login</h1>
            <form action="">
                <h5>Email</h5>
                <input type="email" />
                <h5>Password</h5>
                <input type="password" name="" id="" />
                <button className='login_button' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login