import './App.css';
import Header from './Components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import { auth } from './Firebase'
import { Context } from './Context';
import React, { useContext } from 'react'
import Dashboard from './Components/Admin/Dashboard';
import Add from './Components/Admin/Add';
import Remove from './Components/Admin/Remove';
import Edit from './Components/Admin/Edit';
import AdminHeader from './Components/Admin/Header'
import Editing from './Components/Admin/Editing';
import Cart from './Components/Cart';
import CartWait from './Components/CartWait';
import Payment from './Components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Orders';

const promise = loadStripe('pk_test_51LSM75CYMVfwFlDLED9OUCiKG7yRY4zh3HfgzL14UW2qxvbHdftggyAaazyJjvXaHljA12L5i9hIDPluB7XYySB500zriQs3pM')

function App() {
  const { userState } = useContext(Context)
  const [user, setUser] = userState

  //Check if the state has a user, if not then check if there is one logged in on firebase, if there is then change the state
  if (!user) {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        //console.log('user is logged')
        setUser(currentUser._delegate)
        //console.log(user)
      }
    })
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Home />
            </>
          }>
          </Route>
          <Route path='/login' element={
            <>
              <Header />
              <Login />
            </>
          }>
          </Route>
          <Route path='/cart' element={
            <>
              <Header />
              <CartWait />
            </>
          }>
          </Route>
          <Route path='/payment' element={
            <>
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }>
          </Route>
          <Route path='/orders' element={
            <>
              <Header />
              <Orders />
            </>
          }>
          </Route>
          <Route path='/admin' element={
            <>
              <AdminHeader />
              <Dashboard />
            </>
          }>
          </Route>
          <Route path='/admin/add' element={
            <>
              <AdminHeader />
              <Add />
            </>
          }>
          </Route>
          <Route path='/admin/remove' element={
            <>
              <AdminHeader />
              <Remove />
            </>
          }>
          </Route>
          <Route path='/admin/edit' element={
            <>
              <AdminHeader />
              <Edit />
            </>
          }>
          </Route>
          <Route path='/admin/editing' element={
            <>
              <AdminHeader />
              <Editing />
            </>
          }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
