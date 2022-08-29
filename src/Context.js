import React, { useState, createContext } from 'react'

export const Context = createContext()

//Reduce function that gets each item's price and adds them together for the total price
export const getCartTotal = (total) => total?.reduce(function (amount, item) { return amount + item.data.product.data.Price }, 0)

export const ContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(null)

    return (
        <Context.Provider value={{userState: [user, setUser], cartState: [cart, setCart]}}>
            {props.children}
        </Context.Provider>
    )
}
