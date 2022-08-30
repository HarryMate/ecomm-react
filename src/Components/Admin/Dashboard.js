import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../Firebase'
import '../../css/Admin/Dashboard.css'
import CurrencyFormat from 'react-currency-format'

const Dashboard = () => {
    const [rev, setRev] = useState([])
    const navigate = useNavigate()

    auth.onAuthStateChanged((currentUser) => {
        if (currentUser.email != 'admin@admin.com') {
            navigate('/')
        }
    })

    const getTotal = (total) => total?.reduce((amount, item) => amount + item, 0)

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
                <div className='dash'>
                    <CurrencyFormat
                        renderText={(value) => (
                            <div className='dash_revenue'>Total Revenue: {`${value}`}</div>
                        )}
                        decimalScale={2}
                        value={getTotal(rev)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    <div className='dash_numOrders'>
                        Total Orders: {rev.length}
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard