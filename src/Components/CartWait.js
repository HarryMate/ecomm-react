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
    <div>{cart && <Cart cart={cart} />}</div>
  )
}

export default CartWait