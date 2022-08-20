import { QuerySnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import { db } from '../Firebase'
import Product from './Product'

const Home = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
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
                {product?.map(product => (
                    <Product key={product.id} product={product}/>
                ))}
            </div>
            <div className='row'>
                
            </div>
        </div>
    )
}

export default Home