import './App.css';
import Header from './Components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';

function App() {
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
