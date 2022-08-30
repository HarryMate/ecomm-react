import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context'
import '../css/Orders.css'
import { db } from '../Firebase'
import Order from './Order'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const { userState, cartState } = useContext(Context)
    const [user, setUser] = userState

    //Get all of the user's orders when the page loads
    useEffect(() => {
        const getOrders = () => {
            //Initializing an empty array to push each order onto, strangely the .concat function does not work properly so this workaround is used
            const arr = []
            //Get the orders for the logged in user
            const getOrders = db.collection('orders')
                .where('user', '==', user?.uid)
                .orderBy('created', 'desc')
                .get()
                .then(value => {
                    //For each document returned, push the data and id into the array
                    value.forEach(doc => {
                        arr.push({
                            data: doc.data(),
                            id: doc.id
                        })
                    })
                    //Set the state to contain the array created
                    setOrders(arr)
                })
        }
        //If there is a currently logged in user
        if (user) {
            getOrders()
        } else {
            setOrders([])
        }
    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className="orders_order">
                {orders?.map((orders, index) => (
                    <Order order={orders.data} id={orders.id} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Orders