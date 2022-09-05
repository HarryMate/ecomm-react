import React, { useState } from 'react'
import '../../css/Admin/Add.css'
import { auth, db } from '../../Firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  //States for each part of the product info
  const [Name, setName] = useState('')
  const [Cost, setCost] = useState('')
  const [Rated, setRated] = useState()
  const [Image, setImage] = useState('')
  const navigate = useNavigate()

  //Check if the current user is an admin
  auth.onAuthStateChanged((currentUser) => {
    if (currentUser.email != 'admin@admin.com') {
        navigate('/')
    }
})

  //Grab all of the information from the states and place it into an object
  const handleSubmit = async (e) => {
    e.preventDefault()

    const Rating = Number(Rated)
    const Price = Number(Cost)

    const product = {
      Name,
      Price,
      Rating,
      Image
    }
    //Add the object to the database
    db.collection("products").add(product)
    navigate('/admin')
  }

  return (
    <div className='add'>
      <form onSubmit={handleSubmit}>
        <h5>Name</h5>
        <input type="text" required onChange={e => setName(e.target.value)} />
        <h5>Price</h5>
        <input type="number" step="any" min={0.01} required onChange={e => setCost(e.target.value)} />
        <h5>Rating</h5>
        <input type="number" min={1} max={5} required onChange={e => setRated(e.target.value)} />
        <h5>Image Link</h5>
        <input type="text" required onChange={e => setImage(e.target.value)} />
        <button type='submit'>Add Product</button>
      </form>
    </div>
  )
}

export default Add