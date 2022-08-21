import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../Firebase'

const Editing = () => {
    //useLocation gets the parameters given by the previous page
    const location = useLocation()
    //navigate is used to redirect the user once editing is completed
    const navigate = useNavigate()

    //Setting the initial state values to those given by the previous page
    const [Name, setName] = useState(location.state.product.data.Name)
    const [Price, setPrice] = useState(location.state.product.data.Price)
    const [Rated, setRated] = useState(location.state.product.data.Rating)
    const [Image, setImage] = useState(location.state.product.data.Image)

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Converting the rating to a number so it can be displayed properly
        const Rating = Number(Rated)

        const product = {
            Name,
            Price,
            Rating,
            Image
        }
        //Replace the existing product with the new edited one
        const docRef = await db.collection("products").doc(location.state.product.id).set(product)
        navigate('/admin')
    }

    return (
        <>
            <div className='add'>
                <form onSubmit={handleSubmit}>
                    <h5>Name</h5>
                    <input type="text" required onChange={e => setName(e.target.value)} value={Name} />
                    <h5>Price</h5>
                    <input type="number" step="any" min={0.01} required onChange={e => setPrice(e.target.value)} value={Price} />
                    <h5>Rating</h5>
                    <input type="number" min={1} max={5} required onChange={e => setRated(e.target.value)} value={Rated} />
                    <h5>Image Link</h5>
                    <input type="text" required onChange={e => setImage(e.target.value)} value={Image} />
                    <button type='submit'>Add Product</button>
                </form>
            </div>
        </>
    )
}

export default Editing