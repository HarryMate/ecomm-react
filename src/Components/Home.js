import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import { db } from '../Firebase'
import Product from './Product'

const Home = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        //Grabbing 5 records from the products table and putting each into an array in a state
        const getProducts = db.collection('products').limit(5).onSnapshot(snapshot => {
            setProduct(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return (
        <div className='home'>
            <div className='row'>
                {/* One product component is rendered per item in the useState array */}
                {product?.map(product => (
                    <Product key={product.id} product={product} home={true} />
                ))}
            </div>
        </div>
    )
}

export default Home