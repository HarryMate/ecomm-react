import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../Context';
import { auth, db } from '../../Firebase'

const Editing = () => {
    const { editState } = useContext(Context)
    const [edit, setEdit] = editState
    const [Name, setName] = useState('')
    const [Cost, setCost] = useState('')
    const [Rated, setRated] = useState('')
    const [Image, setImage] = useState('')
    //navigate is used to redirect the user once editing is completed
    const navigate = useNavigate()

    //Check if the current user is an admin
    auth.onAuthStateChanged((currentUser) => {
        if (currentUser.email != 'admin@admin.com') {
            navigate('/')
        }
    })

    useEffect(() => {
        if (edit == null) {
            navigate('/admin/edit')
        } else {
            //Setting the initial state values to those given by the previous page from the context state
            setName(edit.data.Name)
            setCost(edit.data.Price)
            setRated(edit.data.Rating)
            setImage(edit.data.Image)
        }
    }, [edit])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        //Converting the rating to a number so it can be displayed properly
        const Rating = Number(Rated)
        const Price = Number(Cost)

        const product = {
            Name,
            Price,
            Rating,
            Image
        }
        //Replace the existing product with the new edited one
        const docRef = await db.collection("products").doc(edit.id).set(product)
        setEdit(null)
        navigate('/admin')
    }

    return (
        <>
            {edit != null ?
                <div className='add'>
                    <form onSubmit={handleSubmit}>
                        <h5>Name</h5>
                        <input type="text" required onChange={e => setName(e.target.value)} value={Name} />
                        <h5>Price</h5>
                        <input type="number" step="any" min={0.01} required onChange={e => setCost(e.target.value)} value={Cost} />
                        <h5>Rating</h5>
                        <input type="number" min={1} max={5} required onChange={e => setRated(e.target.value)} value={Rated} />
                        <h5>Image Link</h5>
                        <input type="text" required onChange={e => setImage(e.target.value)} value={Image} />
                        <button type='submit'>Add Product</button>
                    </form>
                </div>
                :
                <div>Loading...</div>
        }

        </>
    )
}

export default Editing