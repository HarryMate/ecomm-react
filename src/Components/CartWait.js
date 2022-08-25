import React, { useContext, useEffect } from 'react'
import { Context } from '../Context';
import { db } from '../Firebase';
import Cart from './Cart';

const CartWait = () => {
  const { userState, cartState } = useContext(Context)
  const [cart, setCart] = cartState
  const [user, setUser] = userState

  //useLocation gets the parameters given by the previous page
  //if the 
  useEffect(() => {
    const handleCart = async () => {
      const getBasket = await db.collection('users').doc(user?.uid).collection('basket').get()
      const basket = getBasket.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      setCart(basket)
    }
    handleCart()

  }, [])
  return (
    <div>{cart && <Cart cart={cart} />}</div>
  )
}

export default CartWait