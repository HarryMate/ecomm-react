import React, { useContext, useEffect } from 'react'
import { Context } from '../Context';
import { db } from '../Firebase';
import Cart from './Cart';

//Routing straight to the cart page breaks because the content is not yet loaded, and passing the information that the useEffect gets here as a prop doesn't work either

const CartWait = () => {
  const { userState, cartState } = useContext(Context)
  const [cart, setCart] = cartState
  const [user, setUser] = userState

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
          console.log(arr)
        })
    }
    handleCart()
  }, [])
  return (
    <div>{cart && <Cart />}</div>
  )
}

export default CartWait