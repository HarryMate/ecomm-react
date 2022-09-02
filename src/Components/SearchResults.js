import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Context'
import '../css/Home.css'
import { db } from '../Firebase'
import Product from './Product'

const SearchResults = () => {
  const [product, setProduct] = useState([])
  const { searchState } = useContext(Context)
  const [search, setSearch] = searchState
  const navigate = useNavigate()

  //If the user searches from this page, it won't work, as they're already on this route, so it can't load it
  useEffect(() => {
    //Grabbing the products table and putting each into a dummy array
    const getProducts = db.collection('products').onSnapshot(snapshot => {
      const arr = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      //Filter out any products that do not match the user's search
      setProduct(arr.filter(e => e.data.Name.toLowerCase().indexOf(search.toLowerCase()) >= 0))
    })
  }, [])

  return (
    <div className='home'>
      <div className="row">
        {/* One product component is rendered per item in the useState array */}
        {product?.map(product => (
          <Product key={product.id} product={product} home={true} />
        ))}
      </div>
    </div>
  )
}

export default SearchResults