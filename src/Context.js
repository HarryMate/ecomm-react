import React, { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = (props) => {
    const [user, setUser] = useState(null)

    return (
        <Context.Provider value={[user, setUser]}>
            {props.children}
        </Context.Provider>
    )
}
