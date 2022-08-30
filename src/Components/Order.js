import moment from 'moment'
import React from 'react'
import '../css/Order.css'
import CartProduct from './CartProduct'

const Order = ({ order, id }) => {
    return (
        <div className='order'>
            <div className='order_info'>
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