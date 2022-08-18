import './App.css';
import Header from './Components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import { auth } from './Firebase'
import { Context } from './Context';
import React, { useState, useContext } from 'react'

function App() {
  const [user, setUser] = useContext(Context)

  if (!user) {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        //console.log('user is logged')
        setUser(currentUser)
        //console.log(user)
      }
    })
  }


  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path='/' element={
            <>
              <Header />
              <Home />
            </>
          }>
          </Route>
          {/* Login */}
          <Route path='/login' element={
            <>
              <Header />
              <Login />
            </>
          }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
