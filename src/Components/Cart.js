import React, { useContext, useEffect, useState } from 'react'
import { Context, getCartTotal } from '../Context';
import CartProduct from './CartProduct';
import '../css/Cart.css'
import { db } from '../Firebase';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { userState, cartState } = useContext(Context)
    const [cart, setCart] = cartState
    const [user, setUser] = userState
    const navigate = useNavigate()

    //Code from https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/
    const [size, setSize] = useState(window.innerWidth < 650)

    const updateMedia = () => {
        setSize(window.innerWidth < 650)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => {
            window.removeEventListener("resize", updateMedia)
        }
    }, [])
    //End Code

    //Get the cart from the database when the page loads
    useEffect(() => {
        const handleCart = () => {
            //Dummy array to ensure it sets correctly
            const arr = []
            //Get all items in the user's cart from the DB
            const getBasket = db.collection('users')
                .doc(user?.uid)
                .collection('basket')
                .get()
                .then(value => {
                    //For each document returned, add to the array
                    value.forEach(doc => {
                        arr.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    //Set the useState to be equal to the array
                    setCart(arr)
                })
        }
        handleCart()
    }, [cart])

    const removeFromBasket = async (index, id) => {
        //Remove the item from the context state by filtering it out based on its ID
        setCart(cart.filter((e, i) => index !== i))
        //Remove the item from the user's card in the DB
        await db.collection('users').doc(user?.uid).collection('basket').doc(id).delete()
    }

    return (
        <div className={size ? 'cart_small' : 'cart_large'}>
            <div className={size ? 'cartItems_small' : "cartItems_large"}>
                <h2>Your Cart</h2>
                {/* Mapping through each element in the cart and adding a 'remove a basket' button for each */}
                {cart?.map((item, index) => (
                    <div className='singleProduct' key={index}>
                        <CartProduct
                            product={item.data.product.data}
                        />
                        <button className='cartButton' onClick={() => removeFromBasket(index, item.id)}>Remove from Basket</button>
                    </div>
                ))}
            </div>
            <div className={size ? 'subtotalRight_small' : "subtotalRight_large"}>
                <h2>Subtotal</h2>
                {/* Checking if the cart has been returned by the DB */}
                {cart != null ?
                    //Checking if the cart has any items inside before doing work on it
                    cart.length > 0 ?
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
                                fixedDecimalScale={true}
                            />
                            <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
                        </div>
                        :
                        <div className="">Basket Is Empty</div>
                    : <div className="">Basket Is Empty</div>
                }
            </div>
        </div>
    )
}

export default Cart