import React, { useContext, useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import CartProduct from './CartProduct'
import { Context, getCartTotal } from '../Context'
import CurrencyFormat from 'react-currency-format'
import { db } from '../Firebase'
import axios from '../Axios'
import '../css/Payment.css'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
    //Context States Needed to access user and cart data
    const { userState, cartState } = useContext(Context)
    const [cart, setCart] = cartState
    const [user, setUser] = userState

    //Checks for enabling or disabling the buy now button
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true)
    //Error message for the card element
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState(true);

    //States for the address
    const [lineOne, setLineOne] = useState('')
    const [lineTwo, setLineTwo] = useState('')
    const [postCode, setPostCode] = useState('')

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    //Need a client secret from Stripe for a payment to be successful, sending the order total to verify that the payment sent is correct
    useEffect(() => {
        const getClientSecret = async () => {
            const res = await axios({
                method: 'post',
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            })
            setClientSecret(res.data.clientSecret)
        }
        getClientSecret()
    }, [cart])

    const emptyBasket = async () => {
        //Empty the basket from the context state
        setCart(null)

        //Delete all documents in the user's basket in the DB
        //Batch operations are much faster with larger sets of data
        const batch = db.batch()
        //Get all of the items in the user's basket
        const empty = await db.collection('users').doc(user?.uid).collection('basket').get()
            .then(value => {
                //For each item in the basket, delete it
                value.forEach(doc => {
                    batch.delete(doc.ref)
                })
                //Commit the changes
                batch.commit()
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Disabling the buy now button
        setProcessing(true)

        //Sending the payment to Stripe
        const res = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //Adding the order to the database
            db.collection('orders')
                .doc(paymentIntent.id)
                .set({
                    user: user?.uid,
                    cart: cart,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                    addressOne: lineOne,
                    addressTwo: lineTwo,
                    postCode: postCode
                })
            //Keeping the buy now button disabled
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            emptyBasket()

            navigate('/orders')
        })
    }

    const handleChange = (e) => {
        //If there is an error with the user's input then it must be displayed
        setError(e.error ? e.error.message : "")
        //If there is data in the card element then enable the button
        setDisabled(e.empty)
    }

    //Code from https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/
    const [size, setSize] = useState(window.innerWidth < 1000)

    const updateMedia = () => {
        setSize(window.innerWidth < 1100)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => {
            window.removeEventListener("resize", updateMedia)
        }
    }, [])
    //End Code

    return (
        <div className='payment'>
            <div className={size ? "payment_container_small" : "payment_container"}>
                <div className="payment_left">
                    <h1>Checkout</h1>
                    <div className="payment_section">
                        <div className="payment_title">
                            <h2>Review Cart and Delivery</h2>
                        </div>
                        <div className="payment_cart">
                            {/* Mapping through each item in the cart to get them to add correctly */}
                            {cart?.map((item, index) => (
                                <CartProduct
                                    key={index}
                                    product={item}
                                    id={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={size ? "payment_right_small" : "payment_right"}>
                    <form onSubmit={handleSubmit}>
                        <div className="payment_address">
                            <h3 className='payment_right_text'>Address</h3>
                            <h4 className='payment_right_text'>Address Line 1: </h4>
                            <input type="text" onChange={e => setLineOne(e.target.value)} required />
                            <h4 className='payment_right_text'>Address Line 2: </h4>
                            <input type="text" onChange={e => setLineTwo(e.target.value)} required />
                            <h4 className='payment_right_text'>Post Code:</h4>
                            <input type="text" onChange={e => setPostCode(e.target.value)} required />
                        </div>
                        <hr className='divider' />
                        <div className="payment_section">
                            <div className="payment_title">
                                <h3 className='payment_right_text'>Payment Method</h3>
                            </div>
                            <div className="payment_details">
                                <CardElement className='card' onChange={handleChange} />
                                <div className="payment_price">
                                    {/* Format the total properly */}
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3 className='payment_right_text'>Order Total: {` ${value} `}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getCartTotal(cart)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    {/* If the payment is processing, or has succeeded, or the card element is empty,
                                     then disable the button to prevent a double order */}
                                    <button className='button' disabled={processing || disabled || succeeded}>
                                        <span>Buy Now</span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment