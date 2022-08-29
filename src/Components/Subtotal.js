import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router-dom'
import '../css/Subtotal.css'
import { getCartTotal } from '../Context'

const Subtotal = (basket) => {
    const navigate = useNavigate()
    //Converting it from an object to an array
    const cart = Object.values(basket.basket)

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