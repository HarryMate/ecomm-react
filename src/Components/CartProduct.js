import React, { useContext } from 'react'
import { Context } from '../Context'
import '../css/CartProduct.css'
import { db } from '../Firebase'
import Cart from './Cart'

const CartProduct = ({ product, index }) => {
    const { userState, cartState } = useContext(Context)
    const [cart, setCart] = cartState
    const [user, setUser] = userState

    return (
        <div className='cartProduct'>
            <img className='cart_image' src={product.data.product.data.Image} />
            <div className='cart_info'>
                <p>{product.data.product.data.Name}</p>
                <div className="cart_rating">
                    {Array(product.data.product.data.Rating).fill().map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                </div>
                <div className='cart_price'>${product.data.product.data.Price}</div>
            </div>
        </div>
    )
}

export default CartProduct