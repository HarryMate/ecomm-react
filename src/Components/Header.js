import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import { Context } from '../Context';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'
import { db } from '../Firebase'

const Header = () => {
    const { userState, cartState } = useContext(Context)
    const [cart, setCart] = cartState
    const [user, setUser] = userState
    const navigate = useNavigate()

    //Sign out the user and set the current user to NULL, then redirect to the login page
    const logout = async () => {
        await auth.signOut()
        setUser(null)
        navigate('/login')
    }

    const handleCart = async () => {
        navigate('/cart', { replace: true })
    }

    return (
        <div className='header'>
            <Link className='option main' to={'/'}>
                <div>Ecomm-React</div>
            </Link>
            {/* If there is a user logged in show the orders option */}
            {user &&
                <Link className='option' to={'/orders'}>
                    <div>Orders</div>
                </Link>
            }
            <div className='search'>
                <input type="text" className='search_input' />
                <SearchIcon className='search_icon' />
            </div>
            {/* If there is a user logged in, show the logout button, otherwise show the login button */}
            <Link className='option' to={!user && '/login'}>
                <div onClick={logout}>{user ? 'Logout' : 'Login'}</div>
            </Link>
            {/* If there is a user logged in, show the cart button */}
            {user &&
                <div className="option">
                    <div className='cartOption' onClick={handleCart}>
                        <ShoppingCartIcon />
                        <div>Cart</div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Header