import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import { Context } from '../Context';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [user, setUser] = useContext(Context)
    const navigate = useNavigate()

    const logout = async () => {
        await auth.signOut()
        setUser(null)
        navigate('/login')
    }

    return (
        <div className='header'>
            <Link className='option main' to={'/'}>
                <div>Ecomm-React</div>
            </Link>
            <Link className='option' to={'/orders'}>
                <div>Orders</div>
            </Link>
            <div className='search'>
                <input type="text" className='search_input' />
                <SearchIcon className='search_icon' />
            </div>
            <Link className='option' to={!user && '/login'}>
                <div onClick={logout}>{user ? 'Logout' : 'Login'}</div>
            </Link>
            <Link className='option' to={'/cart'}>
                <div>Cart</div>
            </Link>
        </div>
    )
}

export default Header