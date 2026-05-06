import React from 'react'
import { Link } from 'react-router-dom'
function Navbar(){
  return ( 
        <nav style={{ background: '#6DDE86', color: 'white', display: 'flex' , justifyContent: 'space-between', padding: '10px 20px' }}>
          <div className="logo">MyBookTracker</div>
          <div className="links" style={{ display:'flex', gap: '15px'}}></div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold'}}> Начало </Link>
          <Link to="/profile" style={{ color: 'white', textDecoration: 'none'}}>Моят профил</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none'}}>Вход</Link>
          <Link to="/register" style={{ color: 'white', textDecoration: 'none'}}>Регистрация</Link>
        </div>
        </nav>
        )}
        export default Navbar