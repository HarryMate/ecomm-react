import React from 'react'
import '../css/Home.css'
import Product from './Product'

const Home = () => {
    return (
        <div className='home'>
            <div className='row'>
                <Product />
                <Product />
                <Product />
            </div>
            <div className='row'>
                <Product />
                <Product />
            </div>
        </div>
    )
}

export default Home