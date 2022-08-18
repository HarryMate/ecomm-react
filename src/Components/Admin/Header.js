import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../../css/Admin/Header.css'
import { Context } from '../../Context';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const [user, setUser] = useContext(Context)

    const logout = async () => {
        await auth.signOut()
        setUser(null)
        navigate('/login')
    }

    return (
        <div className='header'>
            <Link className='option main' to={'/admin'}>
                <div>Ecomm-React</div>
            </Link>
            <Link className='option' to={'/admin/add'}>
                <div>Add a Product</div>
            </Link>
            <Link className='option' to={'/admin/remove'}>
                <div>Remove a Product</div>
            </Link>
            <Link className='option' to={'/admin/edit'}>
                <div>Edit a Product</div>
            </Link>
            <div className='option right' onClick={logout}>Logout</div>
        </div>
    )
}

export default Header