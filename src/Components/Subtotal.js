import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import '../css/Subtotal.css'

const Subtotal = (basket) => {
    const navigate = useNavigate()
    const cart = Object.values(basket.basket)

    const getCartTotal = (total) => total?.reduce(function (amount, item) { return amount + item.data.product.data.Price }, 0)

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <p>
                        Subtotal ({cart?.length} items): <strong>{`${value}`}</strong>
                    </p>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal