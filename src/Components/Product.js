import React, { useState } from 'react'
import { db } from '../Firebase'
import '../css/Product.css'

const Product = ({ product, home }) => {
    const [disable, setDisable] = useState(true)

    //Access the product with its ID then delete it from the database
    const handleDelete = async () => {
        db.collection('products').doc(product.id).delete()
    }

    //Disable the button if the box is not checked
    //Done to ensure a product is not deleted by mistake
    const setChecked = () => {
        setDisable(!disable)
    }

    return (
        <>
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
                {/* If one the home page, show the add to basket button, if on the admin page, show the delete item button */}
                {home
                    ?
                    <button className='button'>Add to Basket</button>
                    :
                    <div className='admin'>
                        <p>Remove?</p>
                        <input type="checkbox" className='removeBox' onClick={setChecked} />
                        <button className='button' onClick={handleDelete} disabled={disable} >Delete Item</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Product