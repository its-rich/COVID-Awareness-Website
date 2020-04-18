import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">Diseases Over Time</Link>
            </div>
            <ul className="right">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/coronavirus-avoider'>Coronavirus Avoider</Link></li>
                <li><Link to='/coronavirus-simulator'>Coronavirus Simulator</Link></li>
                <li><Link to='/infected'>I'm Infected</Link></li>
                <li><Link to='/register'>Registration</Link></li>
            </ul>
        </nav>

    );
}
export default Nav;

// <li><Link to='/diseases'>Diseases</Link></li>
// <li><Link to='/continents'>Continents</Link></li>
// <li><Link to='/reports'>WHO Reports</Link></li>
// <li><Link to='/latestnews'>Latest News</Link></li>
// <li><Link to='/risk'>Check Yourself</Link></li>
