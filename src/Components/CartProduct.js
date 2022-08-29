import React from 'react'
import '../css/CartProduct.css'

const CartProduct = ({ product }) => {
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