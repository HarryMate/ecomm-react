import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom'
import { StyledMenu } from './Menu.styled';
import { Context } from '../../Context';
import '../../css/Menu.css'

const Menu = ({ open, admin }) => {
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
        <>
            {admin ?
                <StyledMenu open={open}>
                    <Link className='menu_option menu_main' to={'/admin'}>
                        <div>Ecomm-React</div>
                    </Link>
                    {/* If there is a user logged in show the orders option */}
                    <Link className='menu_option' to={'/admin/add'}>
                        <div>Add a Product</div>
                    </Link>
                    <Link className='menu_option' to={'/admin/remove'}>
                        <div>Remove a Product</div>
                    </Link>
                    <Link className='menu_option' to={'/admin/edit'}>
                        <div>Edit a Product</div>
                    </Link>
                    <div className='menu_option menu_logout' onClick={logout}>Logout</div>
                </StyledMenu>
                :
                <StyledMenu open={open}>
                    <Link className='menu_option menu_main' to={'/'}>
                        <div>Ecomm-React</div>
                    </Link>
                    {/* If there is a user logged in show the orders option */}
                    {user &&
                        <Link className='menu_option' to={'/orders'}>
                            <div>Orders</div>
                        </Link>
                    }
                    <div className='menu_search'>
                        <input type="text" className='menu_search_input' />
                        <SearchIcon className='menu_search_icon' />
                    </div>
                    {/* If there is a user logged in, show the logout button, otherwise show the login button */}
                    <Link className='menu_option' to={!user && '/login'}>
                        <div onClick={logout}>{user ? 'Logout' : 'Login'}</div>
                    </Link>
                    {/* If there is a user logged in, show the cart button */}
                    {user &&
                        <div className="menu_option">
                            <div className='menu_cartOption' onClick={handleCart}>
                                <ShoppingCartIcon />
                                <div>Cart</div>
                            </div>
                        </div>
                    }
                </StyledMenu>
            }

        </>
    )
}
export default Menu;