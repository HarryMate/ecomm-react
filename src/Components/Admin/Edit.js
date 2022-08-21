import React, { useEffect, useState } from 'react'
import '../../css/Admin/Edit.css'
import { db } from '../../Firebase'
import Product from '../Product'

//This page is almost the same as the home page, the only difference is not passing a prop to the products so that code uses the edit code instead

const Edit = () => {
  const [product, setProduct] = useState([])

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
    <div className='edit'>
      <div className='row'>
        {/* One product component is rendered per item in the useState array and its data is passed to the component as a prop*/}
        {product?.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Edit