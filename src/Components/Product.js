import React from 'react'
import '../css/Product.css'

const Product = () => {
    return (
        <div className='product'>
            <div className='info'>
                <p>Title</p>
                <strong className='price'>$price</strong>
                <div className="rating">🌟</div>
            </div>
            <img className='img' src="" alt="" />
            <button className='button'>Add to Basket</button>
        </div>

    )
}

export default Product