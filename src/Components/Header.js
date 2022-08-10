import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Header.css'
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
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
            <Link className='option' to={'/login'}>
                <div>Login</div>
            </Link>
            <Link className='option' to={'/cart'}>
                <div>Cart</div>
            </Link>
        </div>
    )
}

export default Header