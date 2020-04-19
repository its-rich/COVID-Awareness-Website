import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase/config.js';

const NavIn = ({currentUser}) => (
    <nav className="nav-wrapper grey darken-3">
        <div className="container">
            <Link to='/' className="brand-logo">Diseases Over Time</Link>
        </div>
        <ul className="right">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/coronavirus-avoider'>Coronavirus Avoider</Link></li>
            <li><Link to='/coronavirus-simulator'>Coronavirus Simulator</Link></li>
            <li><Link to='/infected'>I'm Infected</Link></li>
            <li><Link className="option" onClick={() => auth.signOut()}>SIGN OUT</Link></li>      
        </ul>
    </nav>
)

export default NavIn;