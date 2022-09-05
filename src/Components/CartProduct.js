import React from 'react'
import CurrencyFormat from 'react-currency-format'
import '../css/CartProduct.css'

const CartProduct = ({ product }) => {
    return (
        <div className='cartProduct'>
            <img className='cart_image' src={product.Image} />
            <div className='cart_info'>
                <p>{product.Name}</p>
                <div className="cart_rating">
                    {Array(product.Rating).fill().map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}
                </div>
                <CurrencyFormat
                    renderText={(value) => (
                        <strong className='cart_price'>
                            {value}
                        </strong>
                    )}
                    decimalScale={2}
                    value={product.Price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    fixedDecimalScale={true}
                />
            </div>
        </div>
    )
}

export default CartProduct