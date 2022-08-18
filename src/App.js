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

function App() {
  const [user, setUser] = useContext(Context)

  //Check if the state has a user, if not then check if there is one logged in on firebase, if there is then change the state
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
