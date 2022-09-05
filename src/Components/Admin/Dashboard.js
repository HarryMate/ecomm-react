import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../Firebase'
import '../../css/Admin/Dashboard.css'
import CurrencyFormat from 'react-currency-format'

const Dashboard = () => {
    const [rev, setRev] = useState([])
    const navigate = useNavigate()

    //Code from https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/
    const [size, setSize] = useState(window.innerWidth < 840)

    const updateMedia = () => {
        setSize(window.innerWidth < 840)
    }

    useEffect(() => {
        window.addEventListener("resize", updateMedia)
        return () => {
            window.removeEventListener("resize", updateMedia)
        }
    }, [])
    //End Code

    //Check if the current user is an admin
    auth.onAuthStateChanged((currentUser) => {
        if (currentUser.email != 'admin@admin.com') {
            navigate('/')
        }
    })

    //Get the total revenue from the all of the orders
    const getTotal = (total) => total?.reduce((amount, item) => amount + item, 0)

    //Retrieving all the orders from the DB
    useEffect(() => {
        const getRevenue = () => {
            const arr = []
            const getRevenue = db.collection('orders').get().then(value => {
                value.forEach(doc => {
                    const current = doc.data()
                    arr.push(current.amount / 100)
                })
                setRev(arr)
            })
        }
        getRevenue()
    }, [])

    return (
        <div className='dashboard'>
            {rev.length != 0 &&
                <div className={size ? 'dash_small' : 'dash'}>
                    <CurrencyFormat
                        renderText={(value) => (
                            <div className={size ? 'dash_revenue_small' : 'dash_revenue'}>Total Revenue: {`${value}`}</div>
                        )}
                        decimalScale={2}
                        value={getTotal(rev)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    <div className={size ? 'dash_numOrders_small' : 'dash_numOrders'}>
                        Total Orders: {rev.length}
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard