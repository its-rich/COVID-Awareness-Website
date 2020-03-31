import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/diseases">
                <li>Diseases</li>
                </Link>
                <Link to="/continents">
                <li>Continents</li>
                </Link>
            </ul>
        </nav>
    );
}
export default Nav;
