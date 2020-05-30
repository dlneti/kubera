import React from 'react';

import profile from '../../../assets/dashboard/profile.svg'
import logout from '../../../assets/dashboard/logout.svg'

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="dashboard-heading">Dashboard</div>
            <ul className="controls">
                <li>
                    <span className="date"></span>
                </li>
                <li>
                    <a href="#" className="profile">
                        <img src={profile} alt="Profile" />
                    </a>
                </li>
                <li>
                    <a href="#" className="logout">
                        <img src={logout} alt="Logout" />
                    </a>
                </li>
            </ul>
        </div>
    )
};

export default TopBar;