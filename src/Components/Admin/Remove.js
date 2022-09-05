import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/Admin/Remove.css'
import { auth, db } from '../../Firebase'
import Product from '../Product'

//This page is almost the same as the home page, the only difference is not passing a prop to the products so that code uses the remove code instead

const Remove = () => {
  const [product, setProduct] = useState([])
  const navigate = useNavigate()

  //Check if the current user is an admin
  auth.onAuthStateChanged((currentUser) => {
    if (currentUser.email != 'admin@admin.com') {
        navigate('/')
    }
})

  useEffect(() => {
    //Grabbing 5 records from the products table and putting each into an array in a useState
    const getProducts = db.collection('products').limit(5).onSnapshot(snapshot => {
      setProduct(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  return (
    <div className='remove'>
      <div className='row'>
        {/* One product component is rendered per item in the useState array and its data is passed to the component as a prop*/}
        {product?.map(product => (
          <Product key={product.id} product={product} remove={true} />
        ))}
      </div>
    </div>
  )
}

export default Remove