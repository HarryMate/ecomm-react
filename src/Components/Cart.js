import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context';
import CartProduct from './CartProduct';
import '../css/Cart.css'
import Subtotal from './Subtotal';
import { db } from '../Firebase';

const Cart = () => {
    const { userState, cartState } = useContext(Context)
    const [cart, setCart] = cartState
    const [user, setUser] = userState

    //Get the cart from the database when the page loads
    useEffect(() => {
        const handleCart = () => {
            const arr = []
            const getBasket = db.collection('users')
                .doc(user?.uid)
                .collection('basket')
                .get()
                .then(value => {
                    value.forEach(doc => {
                        arr.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    setCart(arr)
                })
        }
        handleCart()
    }, [])

    const removeFromBasket = async (index, id) => {
        setCart(cart.filter((e, i) => index !== i))
        console.log(cart)
        await db.collection('users').doc(user?.uid).collection('basket').doc(id).delete()
    }

    //Code from https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/
    const [size, setSize] = useState(window.innerWidth > 650)

    const updateMedia = () => {
        setSize(window.innerWidth < 650)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => {
            window.removeEventListener("resize", updateMedia)
        }
    }, [])

    return (
        <>
            {size ?
                <div className="cart_small">
                    <div className="cartItems_small">
                        <h2>Your Cart</h2>
                        {/* Mapping through each element in the cart and adding a 'remove a basket' button for each */}
                        {cart?.map((item, index) => (
                            <div className='singleProduct' key={index}>
                                <CartProduct
                                    product={item}
                                />
                                <button className='cartButton' onClick={() => removeFromBasket(index, item.id)}>Remove from Basket</button>
                            </div>
                        ))}
                    </div>
                    <h2 className='cart_subtotal_small'>Subtotal</h2>
                    <Subtotal basket={cart} />
                </div>
                :
                <div className='cart_large'>
                    <div className="cartItems_large">
                        <h2>Your Cart</h2>
                        {/* Mapping through each element in the cart and adding a 'remove a basket' button for each */}
                        {cart?.map((item, index) => (
                            <div className='singleProduct' key={index}>
                                <CartProduct
                                    product={item}
                                />
                                <button className='cartButton' onClick={() => removeFromBasket(index, item.id)}>Remove from Basket</button>
                            </div>
                        ))}
                    </div>
                    <div className="subtotalRight">
                        <h2>Subtotal</h2>
                        <Subtotal basket={cart} />
                    </div>
                </div>
            }
        </>
    )
}

export default Cart