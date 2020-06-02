import React from 'react';

import dashboard from '../../assets/dashboard/dashboard.svg';
import assets from '../../assets/dashboard/assets.svg';

const Navbar = () => {
    return (
        <nav className="navbar">
        <ul className="navbar-nav">
            <li className="nav-item">
                <div className="logo">
                    <span>Kubera</span>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <div className="nav-img">
                        <img src={dashboard} alt="Dashboard" />
                    </div>
                    <span>Dashboard</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <div className="nav-img">
                        <img src={assets} alt="Assets" />
                    </div>
                    <span>Assets</span>
                </a>
            </li>
        </ul>
    </nav>
    )
}

export default Navbar;