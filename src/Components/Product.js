import React from 'react'
import '../css/Product.css'

const Product = ({ product }) => {
    return (
        <div className='product'>
            <div className='info'>
                <p>{product.data.Name}</p>
                <strong className='price'>${product.data.Price}</strong>
                <div className="rating">
                    {Array(product.data.Rating).fill().map((_, i) => (
                        <p key={i}>🌟</p>
                    ))}</div>
            </div>
            <img className='img' src={product.data.Image} alt={product.data.Title} />
            <button className='button'>Add to Basket</button>
        </div>
    )
}

export default Product