import React, { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState(null)

    return (
        <Context.Provider value={{userState: [user, setUser], cartState: [cart, setCart]}}>
            {props.children}
        </Context.Provider>
    )
}
