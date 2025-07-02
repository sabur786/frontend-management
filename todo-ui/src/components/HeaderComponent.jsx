import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
        <header>
               <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                  <div>
                            <a href='http://localhost:3000' className='navbar-brand'>
                                    Todo Management Aplication    
                            </a>
                  </div>
                  <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                              <NavLink to="/todos" clasName="nav-link" >Todo</NavLink>
                        </li>
                        </ul>
                        </div>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                              <li className='nav-item'>
                                  <NavLink to="/login" clasName="nav-link" >Login</NavLink>
                              </li>
                            </ul>
                        </div> 
                        <ul className='navbar-nav'>
                        <li className='nav-item'>
                              <NavLink to="/register" clasName="nav-link" >Register</NavLink>
                        </li>
                        </ul>
                        
               </nav>
        </header>
    </div>
  )
}

export default HeaderComponent