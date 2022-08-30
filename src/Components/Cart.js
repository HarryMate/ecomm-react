import React, { useContext, useEffect } from 'react'
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

    const removeFromBasket = async (index) => {
        setCart(cart.filter((e, i) => index !== i))
        console.log(cart)
        //await db.collection('users').doc(user?.uid).collection('basket').doc(product.id).delete()
    }

    return (
        <div className="cart">
            <div className="cartItems">
                <h2>Your Cart</h2>
                {/* Mapping through each element in the cart and adding a 'remove a basket' button for each */}
                {cart?.map((item, index) => (
                    <div className='singleProduct' key={index}>
                        <CartProduct
                            product={item}
                        />
                        <button className='cartButton' onClick={() => removeFromBasket(index)}>Remove from Basket</button>
                    </div>
                ))}
            </div>
            <div className="subtotalRight">
                <h2>Subtotal</h2>
                <Subtotal basket={cart} />
            </div>
        </div>
    )
}

export default Cart