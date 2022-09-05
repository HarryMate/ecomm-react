import React, { useState, useContext } from 'react'
import { Context } from '../Context';
import { db } from '../Firebase'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom'

const Product = ({ product, home, remove }) => {
    const navigate = useNavigate()
    const [disable, setDisable] = useState(true)
    const { userState, cartState } = useContext(Context)
    const [user, setUser] = userState

    //Add the item selected to the basket
    const handleBasket = () => {
        db.collection('users').doc(user?.uid).collection('basket').add({ product })
    }

    //Access the product with its ID then delete it from the database
    const handleDelete = async () => {
        db.collection('products').doc(product.id).delete()
    }

    //Disable the button if the box is not checked
    //Done to ensure a product is not deleted by mistake
    const setChecked = () => {
        setDisable(!disable)
    }

    //When the Edit Product button is clicked it will take them to a form page and pass in the values of the product
    const handleEdit = () => {
        navigate('/admin/editing', { state: { product: product } })
    }

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
            {/* If on the home page show the Add to Basket Button*/}
            {home
                ?
                <button className='button' onClick={handleBasket}>Add to Basket</button>
                :
                //If on the remove page, show the remove delete item button and checkbox
                remove ?
                    <div className='remove'>
                        <p>Remove?</p>
                        <input type="checkbox" className='removeBox' onClick={setChecked} />
                        <button className='button' onClick={handleDelete} disabled={disable} >Delete Item</button>
                    </div>
                    //If on the edit page, show the edit product button
                    :
                    <div className="edit">
                        <button className='button' onClick={handleEdit}>Edit Product</button>
                    </div>
            }
        </div>
    )
}

export default Product