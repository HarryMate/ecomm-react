import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Firebase'
import '../../css/Admin/Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate()
    auth.onAuthStateChanged((currentUser) => {
        if (currentUser.email != 'admin@admin.com') {
            navigate('/')
        }
    })

    return (
        <div className='dashboard'>
            Dashboard
        </div>
    )
}

export default Dashboard