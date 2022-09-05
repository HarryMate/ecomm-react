import moment from 'moment'
import React, { useEffect, useState } from 'react'
import '../css/Order.css'
import CartProduct from './CartProduct'

const Order = ({ order, id }) => {
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

    return (
        <div className='order'>
            <div className={size ? 'order_info_small' : 'order_info_large'}>
                <p className='order_time'>{moment.unix(order.created).format('MMMM Do YYYY, h:mma')}</p>
                <p className='order_address'>Dispatch To: {order.addressOne}, {order.addressTwo}, {order.postCode}</p>
                <p className='order_id'>ORDER # {id}</p>
            </div>
            {order.cart?.map((item, index) => (
                <CartProduct product={item} key={index} />
            ))}
        </div>
    )
}

export default Order