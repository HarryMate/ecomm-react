import './App.css';
import Header from './Components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import { auth } from './Firebase'
import { Context } from './Context';
import React, { useContext, useEffect, useState } from 'react'
import Dashboard from './Components/Admin/Dashboard';
import Add from './Components/Admin/Add';
import Remove from './Components/Admin/Remove';
import Edit from './Components/Admin/Edit';
import AdminHeader from './Components/Admin/Header'
import Editing from './Components/Admin/Editing';
import Payment from './Components/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Orders';
import Burger from './Components/BurgerMenu/Burger';
import Menu from './Components/BurgerMenu/Menu';
import Search from './Components/SearchResults';
import Cart from './Components/Cart';

const promise = loadStripe('pk_test_51LSM75CYMVfwFlDLED9OUCiKG7yRY4zh3HfgzL14UW2qxvbHdftggyAaazyJjvXaHljA12L5i9hIDPluB7XYySB500zriQs3pM')

function App() {
  const { userState } = useContext(Context)
  const [user, setUser] = userState
  const [open, setOpen] = useState(true)

  //Code from https://thewebdev.info/2021/11/20/how-to-conditionally-render-items-based-on-viewport-size-in-react/
  const [size, setSize] = useState(window.innerWidth < 650)

  const updateMedia = () => {
    setSize(window.innerWidth < 650)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => {
      window.removeEventListener("resize", updateMedia)
    }
  }, [])
  //End Code

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
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={false} />
                </>
                :
                <Header />
              }
              <Home />
            </>
          }>
          </Route>
          <Route path='/login' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={false} />
                </>
                :
                <Header />
              }
              <Login />
            </>
          }>
          </Route>
          <Route path='/cart' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={false} />
                </>
                :
                <Header />
              }
              <Cart />
            </>
          }>
          </Route>
          <Route path='/payment' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={false} />
                </>
                :
                <Header />
              }
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </>
          }>
          </Route>
          <Route path='/orders' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={false} />
                </>
                :
                <Header />
              }
              <Orders />
            </>
          }>
          </Route>
          <Route path='/search' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={false} />
                </>
                :
                <Header />
              }
              <Search />
            </>
          }></Route>
          <Route path='/admin' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={true} />
                </>
                :
                <AdminHeader />
              }
              <Dashboard />
            </>
          }>
          </Route>
          <Route path='/admin/add' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={true} />
                </>
                :
                <AdminHeader />
              }
              <Add />
            </>
          }>
          </Route>
          <Route path='/admin/remove' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={true} />
                </>
                :
                <AdminHeader />
              }
              <Remove />
            </>
          }>
          </Route>
          <Route path='/admin/edit' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={true} />
                </>
                :
                <AdminHeader />
              }
              <Edit />
            </>
          }>
          </Route>
          <Route path='/admin/editing' element={
            <>
              {size ?
                <>
                  <Burger open={open} setOpen={setOpen} />
                  <Menu open={open} setOpen={setOpen} admin={true} />
                </>
                :
                <AdminHeader />
              }
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
