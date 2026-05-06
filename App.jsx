import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
function App(){
  const [user, setUser]= useState(localStorage.getItem('userName'));
  useEffect(()=>{
  const loggedUser=localStorage.getItem('userName');
setUser(loggedUser);},[]);
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif'}}>
        <nav style={{background: '#6DDE86', color: 'white', display: 'flex' , justifyContent: 'space-between', padding: '10px 20px' }}>
          <div className="logo">MyBookTracker</div>
          <div className="links" style={{ display:'flex', gap: '15px'}}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold'}}> Начало </Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none'}}>Моят профил</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none'}}>Вход</Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none'}}>Регистрация</Link>
        </div></nav>
        <div style={{ padding: '20px'}}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </div> 
    </Router>
  )
}
export default App